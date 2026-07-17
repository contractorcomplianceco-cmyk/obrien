import { Router, type IRouter } from "express";
import {
  NotifyPaymentSelectedBody,
  SubmitRemittanceBody,
} from "@workspace/api-zod";
import { sendNotificationEmail } from "../lib/mailer";
import { rateLimit } from "../lib/rateLimit";
import { ObjectStorageService } from "../lib/objectStorage";

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();

// Public microsite endpoints — keep abuse contained.
const notifyLimiter = rateLimit({ windowMs: 60_000, max: 10 });
const remitLimiter = rateLimit({ windowMs: 60_000, max: 5 });

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20 MB
const ALLOWED_CONTENT_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/heic",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
]);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const PROJECT_LABEL =
  "O'Brien Construction, Inc. — Nevada Classification B General Proposal";

router.post("/notifications/payment", notifyLimiter, async (req, res) => {
  const parsed = NotifyPaymentSelectedBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const { method } = parsed.data;
  const label = method === "card" ? "Card Payment (Authorize.net)" : "Wire Transfer";

  try {
    await sendNotificationEmail(
      `Payment Option Selected: ${label} — O'Brien Construction Proposal`,
      `<p>A payment option was selected on the proposal site.</p>
       <p><strong>Project:</strong> ${PROJECT_LABEL}<br/>
       <strong>Payment method:</strong> ${label}<br/>
       <strong>Time:</strong> ${new Date().toUTCString()}</p>`,
    );
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send payment notification");
    res.status(500).json({ error: "Failed to send notification" });
  }
});

router.post("/remittance", remitLimiter, async (req, res) => {
  const parsed = SubmitRemittanceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const { objectPath, fileName, note } = parsed.data;
  if (!objectPath.startsWith("/objects/")) {
    res.status(400).json({ error: "Invalid object path" });
    return;
  }

  // Verify the uploaded object actually exists and complies with the
  // declared size/type limits (the presigned URL itself cannot enforce them).
  try {
    const file = await objectStorageService.getObjectEntityFile(objectPath);
    const [metadata] = await file.getMetadata();
    const size = Number(metadata.size ?? 0);
    const contentType = String(metadata.contentType ?? "");
    if (size <= 0 || size > MAX_UPLOAD_BYTES || !ALLOWED_CONTENT_TYPES.has(contentType)) {
      await file.delete().catch(() => undefined);
      res.status(400).json({ error: "Unsupported file type or size" });
      return;
    }
  } catch (err) {
    req.log.warn({ err }, "Remittance object missing or unreadable");
    res.status(400).json({ error: "Uploaded file not found" });
    return;
  }

  const host = process.env["REPLIT_DOMAINS"]?.split(",")[0];
  const fileUrl = host
    ? `https://${host}/api/storage${objectPath}`
    : `/api/storage${objectPath}`;

  try {
    await sendNotificationEmail(
      "Wire Remittance Submitted — O'Brien Construction Proposal",
      `<p>A wire remittance document was submitted on the proposal site.</p>
       <p><strong>Project:</strong> ${PROJECT_LABEL}<br/>
       <strong>File:</strong> ${escapeHtml(fileName)}<br/>
       ${note ? `<strong>Note:</strong> ${escapeHtml(note)}<br/>` : ""}
       <strong>Time:</strong> ${new Date().toUTCString()}</p>
       <p><a href="${fileUrl}">Download the remittance document</a></p>`,
    );
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to process remittance submission");
    res.status(500).json({ error: "Failed to process remittance" });
  }
});

export default router;

import { ReplitConnectors } from "@replit/connectors-sdk";

const NOTIFY_EMAIL = "rose@ccacontact.com";

function buildRawEmail(subject: string, htmlBody: string): string {
  const message = [
    `To: ${NOTIFY_EMAIL}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "",
    htmlBody,
  ].join("\r\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendNotificationEmail(
  subject: string,
  htmlBody: string,
): Promise<void> {
  const connectors = new ReplitConnectors();
  const response = await connectors.proxy(
    "google-mail",
    "/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raw: buildRawEmail(subject, htmlBody) }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gmail send failed (${response.status}): ${text}`);
  }
}

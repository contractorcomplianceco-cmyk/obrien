---
name: Presigned upload limits
description: Presigned GCS PUT URLs don't enforce declared size/content-type; enforce server-side after upload.
---

Rule: validating `size`/`contentType` when minting a presigned upload URL is advisory only — the signed PUT URL does not bind those constraints, so clients can upload anything.

**Why:** Code review of the public remittance-upload flow flagged this as a storage-abuse risk.

**How to apply:** After the client reports the upload, fetch the object's GCS metadata server-side, check actual size/content-type against the allowlist, and delete noncompliant objects before acting on them. Also rate-limit public URL-minting endpoints, and use `navigator.sendBeacon` for notifications fired during page navigation (plain fetch gets cancelled on unload).

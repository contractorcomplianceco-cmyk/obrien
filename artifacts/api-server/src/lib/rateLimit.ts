import type { NextFunction, Request, Response } from "express";

/**
 * Minimal in-memory per-IP rate limiter for the public proposal endpoints.
 * Suitable for this single-instance microsite; not shared across replicas.
 */
export function rateLimit(options: { windowMs: number; max: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const key = req.ip ?? "unknown";
    const entry = hits.get(key);

    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + options.windowMs });
      // Opportunistic cleanup to bound memory.
      if (hits.size > 10_000) {
        for (const [k, v] of hits) {
          if (v.resetAt <= now) hits.delete(k);
        }
      }
      next();
      return;
    }

    entry.count += 1;
    if (entry.count > options.max) {
      res.status(429).json({ error: "Too many requests" });
      return;
    }
    next();
  };
}

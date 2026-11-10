// Upstream service modules remain in the source fork for reference. They are
// unreachable in the read-only entry point; no such resources are deployed.
import type { Presence } from "./server";

declare global {
  namespace Cloudflare {
    interface Env {
      DB: D1Database;
      UPLOADS: R2Bucket;
      CONTACT_LIMITER: RateLimit;
      UPLOAD_LIMITER: RateLimit;
      PRESENCE: DurableObjectNamespace<Presence>;
    }
  }
}

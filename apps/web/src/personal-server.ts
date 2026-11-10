import handler from "@tanstack/react-start/server-entry";
import { env } from "cloudflare:workers";

import { isUnavailableForkPath } from "@/constants/personal-fork";

/** Read-only entry point: no auth, payments, writes, database, R2 or presence. */
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (!["GET", "HEAD"].includes(request.method)) {
      return Response.json(
        { error: "This personal fork is read-only." },
        { status: 405, headers: { Allow: "GET, HEAD" } }
      );
    }
    if (url.pathname === "/api/auth/get-session") {
      return Response.json(null, { headers: { "Cache-Control": "no-store" } });
    }
    if (
      url.pathname.startsWith("/api/") ||
      url.pathname.startsWith("/.well-known/") ||
      url.pathname.startsWith("/uploads/") ||
      url.pathname.startsWith("/brand/") ||
      url.pathname.startsWith("/fonts/timeless/")
    ) {
      return Response.json(
        { error: "Unavailable in this personal reference fork." },
        { status: 404 }
      );
    }
    const pagePath =
      url.pathname.replace(/^\/(?:en|zh|ja|ko|es|fr|de|pt|ru)(?=\/|$)/u, "") ||
      "/";
    if (
      isUnavailableForkPath(pagePath) ||
      /^\/(?:docs|pricing|skill)\.md(?:\/|$)/u.test(pagePath) ||
      /^\/(?:openapi\.json|llms(?:-full)?\.txt|sitemap\.xml)$/u.test(pagePath)
    ) {
      return Response.redirect(
        new URL("/zh/fork-info", url.origin).toString(),
        302
      );
    }
    const asset = await env.ASSETS.fetch(request);
    const response =
      asset.status === 404 ? await handler.fetch(request) : asset;
    const secured = new Response(response.body, response);
    secured.headers.set("X-Content-Type-Options", "nosniff");
    secured.headers.set("X-Frame-Options", "DENY");
    secured.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    secured.headers.set("X-Robots-Tag", "noindex, nofollow");
    return secured;
  },
};

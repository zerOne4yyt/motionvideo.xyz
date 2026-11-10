import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { fumadocsMdx } from "fumadocs-mdx/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

import { LOCALES, localizedPath } from "./src/constants/locales.ts";
import { STATIC_PAGES } from "./src/constants/routes.ts";

// Every content page is prerendered once per locale, at the same URL the
// router renders: `/about`, `/fr/about`, and so on.
const STATIC_ROUTES = LOCALES.flatMap((locale) =>
  STATIC_PAGES.map((page) => localizedPath(page, locale))
);

// Retain the full upstream source and route types, while omitting service-only
// implementations from this no-credentials deployment bundle.
const personalForkRoutes = () => ({
  name: "personal-fork-routes",
  enforce: "pre" as const,
  transform(code: string, id: string) {
    const [path] = id.split("?");
    if (path.endsWith("/src/server/auth.tsx")) {
      return {
        code: `export const getAuth = () => { throw new Error("Authentication is disabled in this personal fork."); }; export const getCurrentSession = () => Promise.resolve(null);`,
        map: null,
      };
    }
    if (!path.includes("/src/routes/") || path.endsWith(".content.ts")) {
      return;
    }
    const inactive =
      /(?:\/api\/|\/(?:docs|blog|changelog|about|brand|contact|privacy|refunds|terms|pro|sponsor|sponsorships|sign-in|consent|dashboard|admin|checkout|welcome|submit|settings|bookmarks|featured|listings|motionvideo-skill|motionvideo-mcp|customize|film|showcase)(?:\/|\.|\[)|\/(?:llms|llms-full|openapi|skill|pricing|sitemap)\[)/u.test(
        path
      );
    if (!inactive) {
      return;
    }
    const route = code.match(
      /createFileRoute\(\s*(?<route>"[^"\n]+"|'[^'\n]+')/u
    )?.groups?.route;
    if (!route) {
      return;
    }
    return {
      code: `import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute(${route})({
  beforeLoad: () => { throw redirect({ href: "/zh/fork-info" }); },
  server: { handlers: { GET: () => new Response("Unavailable in this personal fork.", { status: 404 }), POST: () => new Response("Read-only", { status: 405 }) } }
});`,
      map: null,
    };
  },
});

const config = defineConfig(() => ({
  resolve: { tsconfigPaths: true },
  // vite-intlayer keeps its generated dictionary entries out of the client's
  // dependency prebundle, but not the Workers (ssr) environment's: there they
  // got baked into node_modules/.vite/deps_ssr, so the server kept rendering
  // stale strings that the client then replaced on hydration (a visible
  // flash). Excluded, they resolve to the live .intlayer files.
  environments: {
    ssr: {
      optimizeDeps: {
        exclude: [
          "@intlayer/dictionaries-entry",
          "@intlayer/dictionaries-entry/unmerged",
          "@intlayer/dictionaries-entry/remote",
          "@intlayer/dictionaries-entry/dynamic",
          "@intlayer/dictionaries-entry/fetch",
          "@intlayer/config/built",
        ],
      },
    },
  },
  plugins: [
    personalForkRoutes(),
    devtools(),
    // One instance for every MDX source: content/docs (source.config.ts) is
    // compiled into `.source/` at build time, and the macro compiles the
    // changelog and blog collections. Only those two modules use the macro,
    // so its transform skips every other module.
    fumadocsMdx({
      macro: { include: ["src/lib/changelog.ts", "src/lib/blog.ts"] },
    }),
    intlayer(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    tanstackStart({
      router: { routeFileIgnorePattern: String.raw`\.content\.` },
      pages: STATIC_ROUTES.map((path) => ({ path })),
      prerender: {
        autoStaticPathsDiscovery: false,
        // `/fr/about.html` rather than `/fr/about/index.html`: Workers assets
        // serve it at `/fr/about` without a trailing-slash redirect.
        autoSubfolderIndex: false,
        crawlLinks: false,
        enabled: false,
        filter: ({ path }) => STATIC_ROUTES.includes(path),
      },
    }),
    viteReact(),
  ],
}));

export default config;

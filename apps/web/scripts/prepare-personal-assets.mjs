import { rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../dist/client");
// Keep excluded proprietary assets in upstream Git history, not the deployment.
await Promise.all(
  [
    "brand",
    "fonts/timeless",
    "og.jpg",
    "favicon.ico",
    "apple-touch-icon.png",
    "logo192.png",
    "logo512.png",
  ].map((file) => rm(path.join(root, file), { recursive: true, force: true }))
);
await writeFile(
  path.join(root, "favicon.svg"),
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#f6cf45"/><path d="M9 6l9 6-9 6Z" fill="#111"/></svg>'
);
await writeFile(
  path.join(root, "manifest.json"),
  JSON.stringify({
    name: "MotionLibrary Personal Fork",
    short_name: "MotionLibrary",
    start_url: "/zh",
    display: "standalone",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  })
);
await writeFile(path.join(root, "robots.txt"), "User-agent: *\nDisallow: /\n");
console.log(
  "Prepared independent personal-fork assets; excluded upstream branding and commercial font."
);

# Personal Cloudflare deployment

This is a source-preserving fork of [motionvideohq/motionvideo.xyz](https://github.com/motionvideohq/motionvideo.xyz), based on commit `71d7897`. Website code copyright (c) 2026 Aniket Pawar, under the [MIT license](LICENSE).

## What runs

The original React/TanStack browsing experience, public video catalogue, category/model/color filters, search, localized public prompts, tools and resource directories remain available. This is a public **read-only personal reference fork**, not the official MotionVideo service.

## Deliberate deployment boundaries

- No accounts, authentication, cloud bookmarks, submissions, uploads, contact forms, checkout, subscriptions or Pro-skill access. No gated prompts are unlocked.
- The Worker has no D1, R2, Durable Object, custom-domain, cron, payment, email or analytics binding. No new credentials are needed.
- Original commercial/identity/legal pages point visitors to a local explanation. Their source is retained in Git history; the fork does not claim the original operator's legal identity.
- The upstream brand mark, commercial Timeless font and branded social images are excluded from the published build. A separate geometric icon and system fonts are used.
- Public video/poster URLs still reference `assets.motionvideo.xyz`. No media is mirrored. External availability and each author's content rights remain separate from the website MIT license. This is not an offline library or permission to redistribute videos.
- `server/data/*-prompts.json` remains gated as upstream. The separately sold skill pack has not been installed or purchased.
- Search engines are asked not to index this personal fork.

## Build and deploy

Use Node 22.12+ and the pinned pnpm version. `pnpm install --frozen-lockfile`, copy `apps/web/.env.example` to `apps/web/.env` with all optional secrets empty, then `pnpm typecheck`, `pnpm check`, and `pnpm build`. Deploy from an existing authorized Cloudflare session with `pnpm --filter @motionvideo/web exec wrangler deploy`.

The deployment build replaces upstream account, commerce, legal, blog/changelog and product-documentation routes with read-only explanations. Full original source remains available in the repository and upstream history.

The fork uses `apps/web/src/personal-server.ts` and a dedicated clean `wrangler.jsonc`. Do not restore the upstream deploy configuration: it contains the original operator's domains and service bindings. GitHub CI checks source but does not auto-deploy; re-deploy through an authorized local session.

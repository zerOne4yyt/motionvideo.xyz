/** This deployment is a public, read-only personal source-code fork. */
export const PERSONAL_FORK = true;
export const FORK_REPOSITORY = "https://github.com/zerOne4yyt/motionvideo.xyz";
export const UPSTREAM_REPOSITORY =
  "https://github.com/motionvideohq/motionvideo.xyz";
export const UPSTREAM_SITE = "https://motionvideo.xyz";

// These pages describe the original operator, sell products, or collect data.
// Keep their source in the fork without presenting them as our own service.
export const isUnavailableForkPath = (path: string) =>
  /^\/(?:docs|blog|changelog|film|showcase|about|brand|contact|privacy|refunds|terms|pro|sponsor|sponsorships|sign-in|consent|dashboard|admin|checkout|welcome|submit|settings|bookmarks|featured|listings|motionvideo-skill|motionvideo-mcp|customize)(?:\/|$)/u.test(
    path
  ) ||
  /^\/jobs\/post(?:\/|$)/u.test(path) ||
  /\/customize(?:\/|$)/u.test(path);

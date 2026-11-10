import { SITE } from "@/constants/site";

interface CreateMetadataOptions {
  /** Page title; the site name is appended. Omit on the home page. */
  title?: string;
  description?: string;
}

// Per-route head tags, returned from a route's `head()`. Tags here override
// the defaults from `baseMetadata` (TanStack dedupes by name/property). Pass
// strings already translated for the page's locale.
export const createMetadata = ({
  title,
  description = SITE.DESCRIPTION.SHORT,
}: CreateMetadataOptions = {}) => {
  const fullTitle = title
    ? `${title} | ${SITE.NAME}`
    : `${SITE.NAME}: ${SITE.TAGLINE}`;

  // Canonical, hreflang, og:locale, og:url and robots are set on the locale
  // layout (src/routes/{-$locale}/route.tsx), where the current pathname, prefix
  // and the routes' `staticData.noIndex` are known for every page.
  return {
    meta: [
      { title: fullTitle },
      { content: description, name: "description" },
      { content: fullTitle, property: "og:title" },
      { content: description, property: "og:description" },
      { content: fullTitle, name: "twitter:title" },
      { content: description, name: "twitter:description" },
    ],
  };
};

// Site-wide head tags, set once on the root route.
export const baseMetadata = {
  links: [{ href: "/favicon.svg", rel: "icon", type: "image/svg+xml" }],
  meta: [
    { charSet: "utf-8" },
    { content: "width=device-width, initial-scale=1", name: "viewport" },
    { content: "light dark", name: "color-scheme" },
    { content: SITE.NAME, name: "application-name" },
    { content: "noindex, nofollow", name: "robots" },
  ],
};

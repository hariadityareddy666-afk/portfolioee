/** Published origin — used for canonical URLs, og:url and structured data. */
export const SITE_URL = "https://portfolioee.lovable.app";

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

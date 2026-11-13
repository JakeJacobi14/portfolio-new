// A small sitemap for search engines, without a dependency: the home page, after hours and
// one URL per project. URLs have no trailing slash, matching the canonical links (Base.astro).
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const work = await getCollection("work");
  const paths = ["/", "/after-hours", ...work.map((p) => `/work/${p.data.slug}`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};

// The after hours photos in order, with their labels and the counter (ADR 0018).
// Shared by the home page strip and the /after-hours page.
import { getCollection } from "astro:content";

export async function getPhotos() {
  const entries = (await getCollection("after-hours")).sort((a, b) => a.data.order - b.data.order);
  const countries = new Set(entries.map((e) => e.data.country.trim().toLowerCase())).size;
  const count = `${entries.length} ${entries.length === 1 ? "frame" : "frames"} · ${countries} ${countries === 1 ? "country" : "countries"}`;
  const photos = entries.map(({ data }) => {
    const caption = data.caption.trim().toLowerCase();
    const country = data.country.trim().toLowerCase();
    const place = caption.includes(country) ? caption : `${caption}, ${country}`;
    // e.g. "№ 012 · lima, peru"
    const label = `№ ${String(data.order).padStart(3, "0")} · ${place}`;
    return { ...data, label };
  });
  return { photos, count };
}

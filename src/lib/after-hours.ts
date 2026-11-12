// The after hours photos in order, with their labels and the counter (ADR 0018).
// Shared by the home page strip and the /after-hours page.
import { getCollection } from "astro:content";

/** Rough coordinates for each caption, shown under it like a star chart's (°N/°S, °E/°W).
 *  City-level for cities; for a state, region or country caption, a point that stands for it
 *  (where most of those photos were taken, or its middle). */
const COORDS: Record<string, [number, number]> = {
  "ulaanbaatar": [47.9, 106.9],
  "terelj": [48.0, 107.5],
  "tokyo": [35.7, 139.7],
  "kyoto": [35.0, 135.8],
  "seoul": [37.6, 127.0],
  "kathmandu": [27.7, 85.3],
  "nepal": [28.4, 84.1],
  "machu picchu": [-13.2, -72.5],
  "lima": [-12.0, -77.0],
  "iquitos": [-3.7, -73.3],
  "porto": [41.2, -8.6],
  "lisbon": [38.7, -9.1],
  "madrid": [40.4, -3.7],
  "valencia": [39.5, -0.4],
  "toronto": [43.7, -79.4],
  "indiana": [40.4, -86.9],
  "michigan": [44.3, -85.6],
  "new york": [40.7, -74.0],
  "oregon": [44.0, -121.7],
  "hawaii": [20.8, -156.3],
};
const deg = (v: number, pos: string, neg: string) => `${Math.abs(v).toFixed(1)}°${v < 0 ? neg : pos}`;

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
    const c = COORDS[caption];
    // e.g. "12.0°S 77.0°W"
    const coords = c ? `${deg(c[0], "N", "S")} ${deg(c[1], "E", "W")}` : "";
    return { ...data, label, coords };
  });
  return { photos, count };
}

// The link-preview image (public/og.png, 1200×630): the finished hero, name and
// constellation, photographed from a running server. The sky grows with every commit, so
// re-run this now and then. Usage: node scripts/og-image.mjs [url]  (default: the dev server)
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:4321/";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce", // the finished page, no build-in
});
await page.goto(url, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
// Just the name and the sky: no header, caption, skip button, shooting star or dev toolbar.
await page.addStyleTag({ content: "header, [data-bi-skip], .shooting-star, [data-constellation] figcaption, astro-dev-toolbar { display: none !important; }" });
await page.waitForTimeout(500);
await page.screenshot({ path: "public/og.png" });
await browser.close();
console.log("wrote public/og.png");

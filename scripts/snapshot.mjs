// Capture dated screenshots of the running site for the process record.
// Usage: node scripts/snapshot.mjs <label> [url]
// Requires: npm i -D playwright && npx playwright install chromium
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const label = (process.argv[2] || "snapshot").replace(/[^a-z0-9-_]/gi, "-").toLowerCase();
const url = process.argv[3] || "http://localhost:4321";
const date = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local time
const outDir = "docs/screenshots";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
try {
  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500); // let the build-in animation finish
    const file = `${outDir}/${date}-${label}-${vp.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log("saved", file);
    await page.close();
  }
} finally {
  await browser.close();
}

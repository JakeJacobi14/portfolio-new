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
    // Let the build-in finish (its overlay hides itself when done).
    await page
      .waitForFunction(() => document.querySelector("[data-bi-overlay]")?.hidden !== false, null, { timeout: 20000 })
      .catch(() => console.warn("build-in did not finish in 20s; capturing anyway"));
    await page.waitForTimeout(300);
    const file = `${outDir}/${date}-${label}-${vp.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log("saved", file);
    await page.close();
  }
} finally {
  await browser.close();
}

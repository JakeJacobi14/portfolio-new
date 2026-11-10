# 2026-11-10 — Project pages get real, then a polish pass

**Milestone:** polish
**Time:** about 45 minutes of my time.

Covers the evening of Nov 8 through today (the Nov 8 entry stopped at midday).

## What I set out to do
Fill the project pages with images, show Project ECHO as a 3D model like my teammate's
portfolio does, run the physics engine demo in the page, then polish everything before
sharing the site.

## What actually happened
- **Work rows build-in:** I said it was too minimal. Each row now gets a crew of two: one
  draws the hairline, frames the title and types it; the other frames the year and nudges
  the arrow in. Rows that arrive together cascade 90ms apart. About 1s per row (was 0.8s).
- **Photos:** synced the after hours collection from `~/Pictures/after-hours-raw` three
  times (adds and removals), and moved Mongolia, Tokyo and two from Nepal to the front.
  Today every alt text became its caption ("terelj, mongolia").
- **Projects:** removed the Minecraft server. Set the missing years. A drop folder per
  project (`~/Pictures/projects-raw/<slug>/`, images plus a `notes.md` of questions) is
  how I hand over material. The images came in; the notes are still empty, so the
  sections still say TODO.
- **Covers:** one image under the title (go-kart, chess, physics). The chess photo's EXIF
  said to rotate it, but its pixels were already upright. The Jarvis cover had my local
  IP in the URL bar; it was cropped, then I removed it anyway.
- **ECHO 3D model:** Campbell's SolidWorks export, credited and with his OK. 13.7 MB, so
  Claude wrote `scripts/slim-model.mjs` (the usual tool, gltf-transform via npx, was
  blocked here). The first version dropped the CAD's cameras and the model failed to
  load. Claude first restyled it to the palette; I found it colorless and asked for the
  original look, so the script now keeps the materials and shrinks the textures.
- **"I don't see the model":** the code was fine; my dev server predated the new content
  fields, then Astro's dev content cache kept a stale copy of the physics entry. Fixed by
  restarting and clearing `.astro/data-store.json`.
- **Physics demo:** embedded at full page width from 960px up. At the text column's width
  the demo's controls covered the whole simulation, so it breaks out of the column. It
  went from "run the demo" button to loading by itself.
- **Sound:** I heard no sound on localhost. Claude raised the chime's volume; I had it
  reverted, because the Vercel site does play sound, so it's Safari's per-site settings,
  not the code. The demo's own sounds never start (its AudioContext is never resumed);
  that fix belongs in the physics-engine repo and isn't done.
- **Polish pass (today):** greeting tooltip moved out of the line so screen readers read
  "сайн уу, I'm" with the translation as a description; star favicon; Open Graph and
  Twitter cards with a generated 1200×630 image of the hero; canonical links; a link to
  the repo in the footer; three new summaries.
- **Lighthouse** on the production build, first run: ECHO mobile 41, home mobile 87,
  physics desktop 82. Fixes, none visible: self-hosted fonts (the Google stylesheet was
  render blocking), inline CSS, the 3D model now waits for the build-in to finish with
  normals precomputed and shaders compiled asynchronously, the first after hours photo
  loads first. The physics page's 0.30 layout shift turned out to be inside the demo
  iframe; hiding the frame didn't help, so the demo now loads on the first interaction.
- Also found by Lighthouse: links in the work rows had no accessible name until typed,
  because typed characters were hidden with `visibility`. Now `opacity`, same look.
- Another miss along the way: the precomputed normals first pointed `POSITION` at the
  wrong accessor and the model failed to load again; caught in the browser check.

## Decisions made
- [0021](../decisions/0021-three-js-model-viewer.md): three.js for the ECHO model, the
  slim script, amended for the original materials.
- DESIGN.md: covers, the 3D model, the live demo, self-hosted fonts, icon and link
  preview.

## What surprised me / what I learned
- Three "it's broken" reports in a row were environment, not code: a stale dev server, a
  stale content cache, and Safari's per-site sound settings.
- Lighthouse counts layout shifts inside a cross-origin iframe, and its after hours score
  swung between 85 and 99 on the same build. One run isn't a result.
- Restyling someone else's model to my palette sounded right on paper and looked lifeless.

Final Lighthouse (performance / accessibility / best practices / SEO), mobile and desktop:
every page 99 to 100 on performance, accessibility and SEO. Best practices is 96 on home
and after hours (mobile) for the 10px labels, which are a design choice; 100 elsewhere.

## Screenshots
- `../screenshots/2026-11-10-polish-pass-desktop.png`, `-mobile`

## Next
- Fill in the five `notes.md` files so the project sections stop saying TODO.
- Add the AudioContext resume to the physics-engine repo.
- Re-run `scripts/og-image.mjs` as the sky grows.

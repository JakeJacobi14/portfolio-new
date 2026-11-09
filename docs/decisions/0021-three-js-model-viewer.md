# 0021 — three.js for Project ECHO's 3D model

**Date:** 2026-11-09
**Status:** accepted

## Context
I want Project ECHO's page to show the drone as a model you can drag around, like my
teammate Campbell Downs does on his portfolio for the same project. He made the CAD
(SolidWorks) and OK'd me using it, credited. The export is 13.7 MB: 189 parts, textures,
full-precision normals and tangents. The site's JS budget (< 200 KB) is for the home page;
this is one project page.

## Options considered
1. **`<model-viewer>` (Google)** — a drop-in element with orbit, zoom and loading built in.
   Heavier (it bundles three.js and more), harder to restyle to the palette, and its
   default look (PBR, shadows, a UI) reads as embedded rather than part of the site.
2. **three.js directly** — a small viewer of our own: GLTFLoader, OrbitControls, our own
   materials. More code, but every pixel follows DESIGN.md.
3. **A turntable video or image sequence** — no library, but not really draggable, and
   heavy at good quality.

## Decision
three.js (`three@0.181`), loaded only on the ECHO page and only once the model scrolls
near the screen. The model is slimmed by `scripts/slim-model.mjs` (no dependencies): drop
textures, UVs, tangents and normals, store repeated parts once, quantize positions to
16-bit (`KHR_mesh_quantization`). 13.7 MB → 1.1 MB (447 KB gzipped). The original stays
out of the repo, in `~/Pictures/projects-raw/project-echo/`.

## Why
Restyling the model to Night (matte `--fg`/`--muted`, faint `--accent` edges) is what makes
it belong on this site, and that's easiest with our own materials. A general-purpose CLI
for slimming (gltf-transform) wasn't available here, and a 150-line script covers what
we need.

## Consequences
- The ECHO page ships three.js (about 200 KB gzipped with the loader and controls) on demand; the home page is
  unaffected.
- Updating the model means re-running the slim script on a new export.
- Normals are rebuilt in the browser, so very sharp CAD edges may shade slightly soft.

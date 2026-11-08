# 0015 — Full-screen hero, larger sky

**Date:** 2026-11-07
**Status:** accepted

## Context
The hero ended partway down the first screen, with "Selected work" showing below it. I
wanted the hero to fill exactly one screen, centered, with the extra space going to a
larger constellation (about 30 to 40%) and the name at the top of its size range.

Two constraints limit how big the sky can get on desktop: the name is 510px wide at 95px,
and the sky's layer fades out 15% past its stars, which must not sit under the name. Inside
the 1120px page, the old 3fr/2fr columns could only give the sky about 18% more.

## Options considered
Desktop columns:
1. **Keep 3fr / 2fr.** The sky barely grows.
2. **Text column as wide as the name, sky takes the rest, 96px gap, and the sky may reach
   up to 64px into the page's right margin (chosen).** 397px → 514px (+29%) at 1440×900.
   The text stays on the page's left edge.
3. **Widen the whole page.** Changes every section for one element.

Phones, stack order (both were captured for comparison):
1. **Name first, sky below (chosen).** The name is the first thing read.
2. **Sky first.** Pushes the name to the bottom of the screen, and below the fold on a
   667px-tall phone.

## Decision
- The hero is `min-height: 100svh` with the header laid over its top, contents centered.
- Option 2 for columns; the sky is also capped by the screen height.
- Name clamp `7vw + 16px` (was 6vw), so it reaches 95px from about 1130px wide.
- Caption centered directly under the sky, one line where the sky is wide enough.
- A reload always starts at the top (`history.scrollRestoration = "manual"`); links to a
  section (`/#work`) still go there, including on reload.

## Why
Name-first stacking keeps the hierarchy from ADR 0013 on phones. Growing the sky into the
right margin gets close to the size I asked for without moving the text or the page width.

## Consequences
- The sky is +29% at 1440, a bit under the 30 to 40% asked for. More would mean overlapping
  the name or widening the page.
- On phones the sky stays at the column width; there's no room to grow it.
- Between 960 and about 1100px the sky is about the same size as before.
- Found while testing: the sky's edge could scroll a phone sideways by 38px (the body's
  `overflow-x: clip` is handed to the viewport, which scripts can still scroll). `main`
  now clips instead.

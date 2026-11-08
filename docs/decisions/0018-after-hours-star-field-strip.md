# 0018 — After hours: photos as star fields in a strip the agents rearrange

**Date:** 2026-11-08
**Status:** accepted

## Context
A section of photos from outside work. To fit the night sky, each photo is first shown as a
field of points of light sampled from it; the real photo comes in on hover or focus, and a
click opens it. The agents from the build-in keep the strip changing.

## Options considered
Where the points come from:
1. **Sample at build time** (a script with sharp writing point lists). No JS for the
   fields, but a second data pipeline next to the image one, and no scatter animation.
2. **Sample in the browser from a small copy (chosen).** Astro's image pipeline makes a
   128px PNG per photo; a canvas reads its pixels and draws the points. About 3 KB of JS
   gzipped, and the points can scatter in.

Brightness for sampling:
1. **Raw brightness.** On dark night photos only the moon or sun showed.
2. **Stretched to the photo's range plus rank among its pixels (chosen).** Skies,
   horizons and small lights show up.

## Decision
- Cards in three sizes (160 / 192 / 224px, 4:5) with small vertical nudges.
- Each card: points colored with the star tokens by the pixel's warmth, opacity by
  brightness, and a mono caption `№ 001 · placeholder` (number from `order`). Hover or focus
  crossfades to the photo; a click opens a `<dialog>` lightbox.
- Desktop with a mouse: five cards; every 6s an agent drags one down and out and brings a
  new one up into the same slot while its points scatter in and settle (0.8s). Paused on
  hover, focus, offscreen, hidden tab, open lightbox and during the build-in.
- Touch: no cycling; every card in a swipeable strip.
- Reduced motion or no JS: plain photos, no cycling.
- Images are re-encoded to WebP and PNG; EXIF and GPS are dropped, and originals are not
  published (checked on the build output: 24 images, none with EXIF, XMP or IPTC).
- Eight generated placeholder scenes until I add photos; captions say "placeholder", no
  made-up places. Each needs an `alt` (added to the schema: the site needs real alt text).

## Why
Points of light tie the photos to the constellation, and browser-side sampling keeps one
image pipeline.

## Consequences
- The card swap is a second recurring motion besides the sky details (DESIGN.md §7).
- Fields are drawn when the page has loaded (eight small images).

## Amendment (2026-11-08, same day)
Manual controls were added, so the strip now holds every photo and scrolls sideways (no
hidden cards): prev/next buttons with a position (`03 / 08`), trackpad, mouse drag, swipe and
arrow keys, all snapping to cards; the lightbox steps through every photo with buttons and
arrow keys. Cycling swaps a card in view with the next one out of view. Any manual use
pauses the agent for 15s. See DESIGN.md §8.

## Amendment 2 (2026-11-08, same day)
The arrows and position were replaced by scrolling alone (trackpad, shift + wheel, drag,
swipe, arrow keys) with edge fades that show only when there's more that way: a second,
deliberate exception to "no gradients" (DESIGN.md §9). The agent no longer swaps cards; it
pulls the strip along by one card every 6s.


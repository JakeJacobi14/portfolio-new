# 0013 — Hero text: one big element, and a mono greeting for Cyrillic

**Date:** 2026-11-07
**Status:** accepted

## Context
The hero had a 49px name and a 20px paragraph (Purdue, minors, Oregon → Indiana) at
similar visual weight. I wanted a clear hierarchy: one big element, everything else small.
The new greeting starts in Mongolian ("сайн уу, I'm"), and Schibsted Grotesk, our display
and body face, has no Cyrillic (Google serves it only in Latin and Latin-ext). IBM Plex Mono
has Cyrillic.

## Options considered
Greeting typeface:
1. **Whole greeting line in IBM Plex Mono (chosen).** Latin and Cyrillic match, and it
   pairs with the mono tagline.
2. **Only "сайн уу" in Plex Mono.** Two typefaces in one short line.
3. **Let the browser fall back.** The Cyrillic font would vary by device.

Name size (continuing the 1.25 scale: 61 / 76 / 95):
1. **Up to 95px (chosen).** `clamp(49px, 6vw + 16px, 95px)`.
2. **Up to 76px.** Bigger than before but quieter.
3. **Up to 119px.** Would wrap to two lines in the text column.

Tooltip copy: my draft used an em dash, which §9 bans, so "sain uu · hi, in Mongolian",
with the same middle dot as the tagline.

## Decision
- "сайн уу, I'm": small, muted, all in IBM Plex Mono, `lang="mn"` on the Mongolian, with a
  hover/focus tooltip.
- "Jake Jacobi": the only big element, 49px on phones to 95px on a wide desktop.
- "software engineer · building software that sees, thinks & moves": small mono.
- No "currently" line. The minors / Oregon → Indiana paragraph moves to /about later.
- Sky caption: "every star is a commit to this site. oldest at the center."
- New tokens `--text-4xl` 61, `--text-5xl` 76, `--text-6xl` 95 and `--text-display`.

## Why
One big element gives the hero a clear hierarchy. The mono greeting avoids a font swap in the
middle of a word for visitors whose system Cyrillic font doesn't match.

## Consequences
- The name's clamp is tuned so it stays on one line in the 3fr column (at 960px and up the
  column is narrowest at about 500px; the name is about 5.4× its font size wide).
- The tooltip is a hover state on something you can't click, a small exception to §9.

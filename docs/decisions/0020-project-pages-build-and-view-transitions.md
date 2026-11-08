# 0020 — Project pages: their own build-in, and a title that morphs from the home page

**Date:** 2026-11-08
**Status:** accepted

## Context
Project pages appeared all at once, and moving between the home page and a project felt
like two separate sites. I wanted each project page to have a short build-in of its own
(about 1.5s), and the project's title to move smoothly from its row on the home page into
the page header and back, without replaying the home build-in on the way back.

## Options considered
How to animate between pages:
1. **Astro's `<ClientRouter />`** (client-side navigation). Works in every browser, but the
   site becomes a single-page app: every script (the build-in, the sky, the strip) would
   have to re-run on each page swap, and the build-in's rules about loads and refreshes
   would need rethinking.
2. **Native cross-document view transitions, named with Astro's `transition:name`
   (chosen).** Every page still loads normally, so nothing else changes. Astro's directive
   emits a plain `view-transition-name`, and `@view-transition { navigation: auto }` turns
   them on. Browsers without support (Firefox today) simply navigate without the morph.

## Decision
- The title of each project is named `work-<slug>` on its home row and on its page, so it
  morphs both ways (`--dur-ui`, `--ease`); both images scale with it, so it reads as one
  zoom. The rest cross-fades. None for reduced motion.
- A project page's build-in starts once the transition has finished: a frame is drawn
  around the title (only an outline if it morphed in; laid out from nothing on a direct
  visit), then the summary, facts and links, then each section as it comes into view under
  the home page's rules (ADR 0019). Measured: the head is done about 1.0s after the
  transition, the sections already in view by about 1.4s.
- The back link and browser back still return to the work section without the home
  build-in.

## Why
Native transitions give the morph without turning the site into an app; the cost is no
morph in Firefox, which is acceptable for a flourish.

## Consequences
- A `vt-in` class marks a page that arrived with a view transition, so its title stays
  visible for the morph.
- Project links already opened in the same tab; the only `target="_blank"` links left are
  the constellation's commit links to GitHub.

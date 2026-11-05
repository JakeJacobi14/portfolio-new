# 0007 — Build later sections as they scroll into view

**Date:** 2026-11-05
**Status:** accepted

## Context
In v1 (ADR 0006) the agents built only the first screen, and everything below it was
already finished. After watching it, I wanted the agents to keep building the page as I
scroll down. I also asked for slightly faster typing.

ADR 0006 had rejected building on scroll, on the grounds that it repeats the signature
moment down the page (the same reason Blueprint was dropped in ADR 0002).

## Options considered
1. **Keep the first-screen-only build.** One moment, then a static page. Below the fold
   looks like a different site.
2. **Build each section as it scrolls into view.** The whole page is made by the agents.
   It repeats the moment, but each later section is short (1 to 4s) and uses the same four
   agents, so it reads as one continuous build, not a new effect per section.

## Decision
Option 2. Later sections start empty. When one is 15% into the screen (or visible at the very
end of the page), its tasks join a shared queue. Free agents come in from the side, build it,
and leave when there's nothing left to do. Typing is about 20% faster
(70 / 35 / 17ms per character for display / labels / body).

## Why
Seeing it run changed my mind: the concept is "the agents make the site", and that should
hold for the whole page, not only the top of it.

## Consequences
- Skip and Esc end everything, including sections not reached yet. Skip only shows while an
  agent is on screen.
- Jumping with the nav (e.g. straight to Contact) builds only what you land on; sections you
  jump past are built if you scroll back to them.
- Replay rebuilds the whole page from the top.
- Layout is measured once on load; resizing the window's width ends the build.

# 0006 — Build-in v1: the agents make everything on screen

**Date:** 2026-11-05
**Status:** accepted; "only the first screen" superseded by [0007](0007-build-sections-on-scroll.md)

## Context
Build-in v0 (ADR 0002) had four cursors glide to sections that then faded in, in under 2s.
My reaction: a solid start, but too quick, and the cursors didn't really *make* anything.
I want to watch them create the page: text typed, elements dragged into place and resized.
That breaks the "~2s" rule in `DESIGN.md` §9.

## Options considered
1. **Keep it under 2s.** Respects the rule, but you can't see anything being made.
2. **Agents make everything in the first screen, slowly enough to watch, skippable.** Typing,
   drawing, and drag-and-resize, with a Skip button and Esc.
3. **Agents build each section as you scroll to it.** Spreads the build out, but repeats the
   signature moment down the page (the reason Blueprint was rejected in ADR 0002).

## Decision
Option 2. Three kinds of action: type (with a caret), draw (lines grow with the cursor), and
drag and resize (boxes start small and out of place with a selection outline). Only what's
in the first screen is built. Work rows go to whichever agent is free first.
Measured length: about 9.5s at 1440×900, 6.4s on a phone.

## Why
Watching the site get made is the whole point of the concept. Skip, Esc, once per session
and reduced-motion support keep it from getting in the way of someone who just wants to read.

## Consequences
- §9's 2-second rule now has one exception, the build-in, and only because it can be skipped.
- Typing splits text into one span per character during the build; the original text is put
  back when the build ends or is skipped.
- Long for a recruiter skimming. Worth watching how people react to it; the speeds are easy
  to tune.
- Also added: a central element slot in the intro (still TBD), built by the agents as a
  wireframe placeholder.

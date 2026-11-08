# 0014 — Hero build-in: agents lay out the text like a design tool

**Date:** 2026-11-07
**Status:** accepted; revises the first-screen part of [0006](0006-build-in-v1-agents-make-everything.md)

## Context
The first screen took about 10s to build (four agents typing every line, plus guide lines).
With the new hero (ADR 0013) I wanted the agents to lay out the text the way you would in a
design tool, with several agents working in parallel, and the whole first screen done in
about 2.5s, constellation included. The constellation build-in (ADR 0011) was to stay
exactly as it is.

## Options considered
How the text arrives:
1. **Keep typing every line.** Too slow for 2.5s, and doesn't read as layout.
2. **Text frames (chosen).** For each element an agent drags out a selection rectangle with
   corner handles and a size label, then the text sets in.

Fitting the constellation into the budget (with the real data it took about 3.4s on its own:
a 0.5s walk-in, the 2.2s sweep, 0.7s for the one milestone figure):
1. **Drop the walk-in (chosen).** The sky's agent appears on the center and starts the
   sweep at once. The sweep and figures are unchanged.
2. **2.5s for the text only.** Leave the sky at about 3.4s.
3. **Shorten the sky too.** Changes the constellation's timing, which I wanted to keep.

## Decision
- Five agents, each starting near its first job, starts staggered by up to 0.45s: greeting
  then tagline; the name; the header (home link, then nav); the sky's caption; the
  constellation.
- A frame grows from small to full size in 0.45s with a mono "W · H" label that fades. The
  name is typed behind a caret (about 45ms per character); the small lines fade in and rise
  4px. The frame fades once the text lands.
- The guide lines and the first-screen list rows are gone from the hero build; every section
  after the hero, including any already on screen, is built once the hero is done (ADR 0007).
- Plays once per session; Replay always replays it; reduced motion skips it.

## Why
Frames read as "agents laying out a page", which is the concept, and they're quick. Dropping
only the walk-in keeps the constellation build-in as it is.

## Consequences
- Measured: the hero takes 2.9s on a 1440×900 desktop and 2.7s on a phone, from the start
  of the build until the last frame fades. The sky is the last to finish, so the 2.5s target
  is slightly over.
- Name typing went from 70ms to 45ms per character (DESIGN.md §7).
- An agent count was asked to match "the control bar", but there's no control bar any more
  (it was reverted with the grid work). The count lives in `BuildIn.astro` and DESIGN.md §7.

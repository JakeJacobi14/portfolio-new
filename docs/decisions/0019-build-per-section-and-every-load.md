# 0019 — Build-in: a crew per section, and on every load

**Date:** 2026-11-08
**Status:** accepted; replaces the shared task queue of [0007](0007-build-sections-on-scroll.md) and the once-per-session rule

## Context
Later sections were built from one shared queue of tasks by the hero's five agents, typing at
a reading pace. With six work rows, the agents fell behind anyone scrolling at a normal pace,
and a section could sit empty for seconds waiting for the rows above it. I also wanted the
whole build on every load and refresh (it's the point of the site), clean URLs so a refresh
always starts at the top, and no rebuild when coming back from a project page.

## Options considered
For keeping up with scrolling:
1. **Type faster, keep the queue.** Still serial: a section waits for whatever is ahead.
2. **Show sections instantly once scrolled past** (my earlier option (b)). Fixes the empty
   screens, but the section you're looking at still waits.
3. **A crew per section, started the moment it enters the screen, with a one-second budget,
   and instant finishing when scrolling fast or scrolled past (chosen).**

## Decision
- Every part of the page that builds itself (the hero, the work label, each work row, the
  after hours label, the strip, say hola, the footer) is a unit with its own crew. A crew can
  be stopped on its own, and its part put into its finished state at once.
- Units start as soon as their top enters the screen and are done within about 0.8s: titles
  typed at about 12ms per character, longer text fades in, frames take 0.35s + 0.25s, agents
  move in 0.1 to 0.2s. Done means the content has landed; agents step away after.
- Scrolling faster than 2400px/s finishes everything in view and above it instantly, and so
  does scrolling past a unit before it's done.
- The hero is unchanged (about 2.9s).
- The build plays on every fresh load and refresh. It's skipped on back/forward navigation
  (which returns to the saved scroll position) and on arriving at a section from a project
  page (`/#work` via "back to work"). Replay always plays it; reduced motion never does.
- Nav clicks smooth-scroll without adding a hash, and a hash in the URL on arrival is dropped
  once the page has scrolled to it. A refresh therefore always starts at the top.

## Why
A visitor should never wait on a section they're looking at. Per-section crews keep the
"agents build the page" idea at any scroll speed, and finishing instantly on fast scrolls
respects someone who just wants to get somewhere.

## Consequences
- Measured at 1440×900, scrolling 450px every 1.1s: every section starts the moment it
  enters, and is done in 0.23 to 0.73s (the strip, with five cards, about 0.8s). A fling
  from top to bottom during the hero build leaves the whole page finished 150ms after
  stopping.
- More agents can be on screen at once (one per row, one per card), briefly.
- The constellation, when it starts below the first screen on short screens, keeps its own
  timing (ADR 0011): the one exception to the one-second budget.
- Scroll positions on back/forward are saved per page in `sessionStorage`; the browser's
  own restoration is off so that a refresh always starts at the top.

## Amendment (2026-11-08, same day)
The trigger changed after testing. "The moment it enters the screen", plus "fast scrolling
finishes everything in view", still set off sections during an ordinary quick scroll and
then hid the animation of the one I stopped on. Now a section starts once at least 30% of it
has been in view for 120ms while the page is nearly still (under 1200px/s); sections
scrolled past without stopping appear finished, and the section you stop on always
animates. Measured: a 1800px scroll in about 0.4s finished the work label and all six rows
instantly, and the three sections in view started about 230ms after the scroll stopped and
were done 0.4 to 0.8s later.


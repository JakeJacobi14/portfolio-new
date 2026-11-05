# 0004 — Animation library: Motion (mini)

**Date:** 2026-11-05
**Status:** accepted

## Context
The build-in (ADR 0002) sequences 4 cursors, 3 guide lines and 4 section reveals in under
1.8s. `CLAUDE.md` left the choice between GSAP and Motion open. Budget: under 200 KB JS on the
home page.

## Options considered
1. **Motion, `motion/mini`.** A small wrapper around the browser's Web Animations API.
   Handles keyframes, delays, easing and promises. Very small.
2. **GSAP.** Best-in-class timelines and tooling, but roughly 10× the size, and the build-in
   doesn't need its advanced features.
3. **Plain Web Animations API.** No dependency, but more boilerplate for the same code.

## Decision
`motion/mini`.

## Why
It covers everything the build-in needs, and the whole home page ships about 4 KB of JS
gzipped (measured on the first build).

## Consequences
- No timeline object: the sequence is built from delays. If the choreography gets much more
  complex, switching to Motion's full `animate()` (with sequences) is a small change.
- Animations run on the compositor through WAAPI, which keeps them smooth.

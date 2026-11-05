# 0005 — Palette: Night

**Date:** 2026-11-05
**Status:** accepted

## Context
`DESIGN.md` §4 had no palette. Rather than pick in the abstract, Claude built the first page
with four candidates and a temporary switcher so I could compare them on a real screen, with
the build-in running.

## Options considered
1. **Forest.** Warm off-white, muted green accent.
2. **Ember.** Warmer cream, burnt orange accent.
3. **Ink.** Cool grey-white, deep blue accent.
4. **Night.** Dark warm neutral (`#171715`), light text, sage accent (`#8FB8A6`).

All four passed AA contrast.

## Decision
Night.

## Why
Seen side by side on the real page, it was the best of the four. The accent cursors and
guide lines also stand out more on a dark background, which helps the build-in.

## Consequences
- Dark only for now. A light mode would need its own set of tokens; not planned.
- The other three palettes and the switcher were deleted. Screenshots of all four are kept
  in `docs/screenshots/2026-11-05-first-build-*`.

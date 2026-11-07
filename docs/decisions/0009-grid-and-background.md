# 0009 — 12-column grid and a background the agents use

**Date:** 2026-11-07
**Status:** accepted (grain still undecided)

## Context
The page was a single left-aligned column inside a 1120px box. Each section set its own
width, nothing shared columns, and the Skip button was pinned to the viewport edge instead
of the content. The page also had no background at all, and the hero is about to become a
full-width image (the commit constellation, ADR 0008) that needs a grid to sit on.

DESIGN.md §9 banned decorative dot grids and required guides to fade completely.

## Options considered
1. **Keep the single column, fix widths one by one.** Least change, but no shared system
   for the wider hero and the work index to come.
2. **12-column grid, plain background.** Fixes alignment; the page stays flat.
3. **12-column grid plus a background system:** a faint dot grid the agents snap to,
   column guides they draw and leave behind faintly, registration marks at section corners,
   a cursor glow on the dots, optional grain.

## Decision
Option 3. Content max width goes from 1120 to 1128px (gutters now outside it), so at full
width the 72px columns and 24px gaps land exactly on the 24px dot grid. 4 / 8 / 12 columns
at the existing breakpoints. §9 is amended to allow this one dot grid. Grain is built but
off until I compare screenshots with and without it.

## Why
The dot grid only earns its place because the build-in uses it: agents snap to it, and the
column guides they draw are the same grid the content sits on. That keeps it part of the
concept instead of decoration.

## Consequences
- Every section, the header, footer and control bar share one grid utility.
- The cursor glow is a second hover effect beyond links. It's off for touch and reduced
  motion; worth watching whether it pulls attention from the constellation.
- Registration marks and dots are "the paper": they're there before the agents arrive,
  so they aren't built by them.

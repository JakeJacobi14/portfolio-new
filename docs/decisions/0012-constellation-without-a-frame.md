# 0012 — Constellation without a frame

**Date:** 2026-11-07
**Status:** accepted

## Context
The constellation sat in a grey hairline box (the old central-element placeholder's
frame), and the build-in started by dragging that box into place. A night sky in a box
looks like a widget; I wanted it to bleed into the page with no visible edge.

## Options considered
1. **Keep the box, soften its border.** Still a boundary.
2. **No frame, fade the edge (chosen).** Remove the border and the drag step; fade the
   outer stars out with a radial mask so there's no hard boundary.
3. **Full-width sky behind the name.** The bigger hero idea from earlier, out of scope for
   now, and it would need the text-readability work that option 2 avoids.

## Decision
Option 2. The sky's layer reaches 15% past the stars on every side, masked from full at
40% of its radius to nothing at 92%. The build-in no longer drags a box; the agent goes
straight to the center and sweeps (ADR 0011). Milestone labels and the focus ring sit
outside the mask so they stay readable at the edge. The page clips horizontal overflow so
the extra layer never causes sideways scrolling on a phone.

Also from the same review: halos are about 30% smaller and fainter, labels are placed
where they hit no star or line, and the build-in's baseline guide under the name stops at
the text column instead of crossing the sky (it already faded when the first screen was
done; it just ran too far while building).

## Why
The box was the last trace of the placeholder; the sky reads better as part of the page.

## Consequences
- The faded outer ring is still in the right column, so no stars sit under the name or
  text and readability is unchanged.
- DESIGN.md §9's gradient exception now also covers the edge mask (not a visible gradient,
  but a fade).

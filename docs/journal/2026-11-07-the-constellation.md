# 2026-11-07 — The constellation

**Milestone:** build
**Time spent:** ~Xh

## What I set out to do
A big multi-phase update: a 12-column grid and background system, a "commit constellation"
as the hero image, a new hero, new home sections and stubs for every other page, with a
checkpoint after each phase.

## What actually happened
- **Phase 1 (grid and background), then undone.** Claude built a 12-column grid, a dot grid
  the agents snapped to, column guides, registration marks, a cursor glow and optional
  grain. I turned off the grain and asked to remove the dots and lines. The vertical guide
  lines were still showing during the build, and I couldn't see a difference in the rest.
  So I asked to go back to where the day started. One revert commit (`c1e2e43`) undoes all
  8 commits; the history keeps them as a record, and they're hidden from the constellation.
- **Constellation v1.** `npm run commits` writes this repo's history to
  `src/data/commits.json` (type, size, files, tags; merges, excluded hashes and data
  refreshes skipped). The constellation replaced the placeholder box: phyllotaxis layout,
  oldest at the center, dots sized by change and colored by type, tooltip, click through to
  GitHub, arrow keys, and an agent places the dots during the build-in in about 2s. On screen
  it read as polka dots.
- **Constellation v2, a night sky.** Tiny filled stars on a power curve, a few bright ones
  with halos, faint stardust from files changed, constellation lines only around milestones
  (tags), and a slow twinkle on about 1 in 8 stars. Two fixes after the first try: figures
  drew lines across the whole sky (neighbours in time sit 137.5° apart), and a quarter of
  the stars came out bright. Figures now use nearby stars, and brightness is by rank (top 8%).
- **Performance.** Measured at 500 stars and about 1,260 dust specks with the CPU throttled
  4×: hover stays within two frames, idle twinkle costs about nothing. Milestone hover was
  slow at first (up to 90ms); a single generated CSS rule fixed it. SVG holds; no canvas.
- **Where the commit data comes from.** Vercel clones only the last 10 commits. The
  commit script now runs before every build and logs how much history it can see. A strict
  test build on the `preview/deep-clone` branch failed, which confirms the default clone is
  shallow. Testing `VERCEL_DEEP_CLONE=true` is still to do (it has to be set in the Vercel
  dashboard).
- **Squash merging turned off** on the GitHub repo, so merges can't rewrite the hashes the
  constellation links to.
- **Misses along the way:** a commit grouping slip (a file deletion landed in a docs commit,
  redone before pushing), and the snapshot script had been capturing empty sections since
  ADR 0007; fixed.

## Decisions made
- [0008](../decisions/0008-constellation-phyllotaxis.md): phyllotaxis layout in the hero,
  nodes only; the time spiral is saved for Making-of.
- [0009](../decisions/0009-constellation-night-sky.md): the constellation as a night sky.
  New star color tokens, a 10px label size, and one exception to "no gradients" for halos.
- Milestone labels use IBM Plex Mono, not Geist Mono (banned in DESIGN.md §9).

## What surprised me / what I learned
- Subtle background work was invisible to me at normal viewing, and the one visible part
  (vertical lines) was the part I didn't like. Big visible changes first.
- Time order and space don't line up in phyllotaxis: "recent" commits are spread all around
  the sky, so anything that connects commits by time has to think about distance too.

## Screenshots
- `../screenshots/2026-11-07-layout-v2-desktop.png` and `-mobile`, plus `layout-v2-grain-*`
  (removed by the revert, still in git history)
- `../screenshots/2026-11-07-constellation-v1-desktop.png`, `-mobile`, `-10-fake-*`, `-500-fake-*`
- `../screenshots/2026-11-07-constellation-v2-desktop.png`, `-mobile`, `-10-fake-*`,
  `-40-fake-*`, `-500-fake-*`
- `../screenshots/2026-11-07-constellation-v1-vs-v2.png` (side by side)

## Next
- Set `VERCEL_DEEP_CLONE=true` for Preview and rerun the test; pick deep clone or a
  pre-push hook, and record it.
- More tags as milestones, so the sky gets more constellations.

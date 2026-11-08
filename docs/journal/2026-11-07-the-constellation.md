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

---

## Later the same day: hero v4

**Milestone:** build

### What I set out to do
Give the hero a clear hierarchy (one big element, everything else small), and have the
agents lay out its text like a design tool, all in about 2.5s, without touching the
constellation's build-in.

### What actually happened
- New hero text: "сайн уу, I'm" small and muted with a translation tooltip, "Jake Jacobi"
  as the only big element (49px on phones to 95px), a small mono tagline, and a new sky
  caption. The minors / Oregon → Indiana paragraph is gone from the home page (it goes to
  /about).
- Schibsted Grotesk has no Cyrillic, so Claude stopped and asked before changing anything.
  The whole greeting is now IBM Plex Mono.
- The first screen's build is now text frames: five agents each drag out a selection
  rectangle with corner handles and a "W · H" label, then the text sets in (the name typed,
  the rest fading up). It went from about 10s to 2.9s on desktop and 2.7s on a phone.
- My spec conflicted with itself: the constellation alone took about 3.4s, so "don't change
  its timing" and "everything in 2.5s" couldn't both hold. We dropped only the sky agent's
  walk-in. It now lands a bit over 2.5s, with the sky finishing last.
- My tooltip copy had an em dash, which DESIGN.md bans; it uses a middle dot now.
- I asked for the agent count in "the control bar" to match, but the control bar was
  removed with this morning's revert. Nothing to update besides `BuildIn.astro` and
  DESIGN.md.
- `npm run build` refreshed `commits.json` and it slipped into the feature commit; split
  into its own chore commit before pushing.

### Decisions made
- [0013](../decisions/0013-hero-text-hierarchy.md): hero hierarchy, a 95px display size,
  mono greeting for Cyrillic.
- [0014](../decisions/0014-hero-build-text-frames.md): text-frame build-in with five
  agents; the constellation starts on its center.

### What surprised me / what I learned
- A short spec can still contradict itself. Measuring the real timings first turned the
  conflict into a quick choice instead of a surprise later.

### Screenshots
- `../screenshots/2026-11-07-hero-v4-desktop.png`, `-mobile`
- `../screenshots/2026-11-07-hero-v4-buildin-0.7s.png`, `-1.3s` (frames mid-build)

### Next
- Write /about with the minors and Oregon → Indiana.
- Watch the build a few times and decide whether 2.9s feels right or the sky should start
  even sooner.

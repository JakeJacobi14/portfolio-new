# 2026-11-05 — Concept and rules

**Time spent:** ~30 min
**Milestone:** concept

**Live site:** https://portfolio-new-three-gamma-49.vercel.app (Vercel Hobby, deploys from
`main`; still the empty Astro scaffold, checked it returns 200)

## What I set out to do
Fill in the TBDs in `DESIGN.md` by having Claude interview me one question at a time,
starting with the concept and the three words.

## What actually happened
- **Concept:** Picked a multi-agent build-in: 4–6 cursors build the page, a less cluttered
  version of the IgnitronDev reel. Claude pushed back that this is close to the reel and
  asked what each cursor stands for. I decided not to worry about that yet. I'm taking the
  build-before-your-eyes idea, and I'd rather start working and make it my own as I go.
  The personal side will come partly from a portfolio entry about this site, with its
  version history.
- **Never-list:** Brought in a list of signs of a vibe-coded website (harsh gradients,
  Lucide icons, Inter/Geist/Space fonts, bento grids, em dashes, etc.). Claude agreed with
  most, reworded a few (no pure `#fff`/`#000`, radius 0–2px, mono labels OK but no fake
  terminals, guide lines only during the build-in) and dropped "no skeleton loaders" because
  a static site has nothing to load. Wrote it all into `DESIGN.md` §9.
- **Three words:** elegant, simple, human. Claude pushed back that elegant and simple
  overlapped. I didn't think that was useful: I can't say what it should look like until I
  see it. The summary is "modern and clean." Recorded as is.
- Changed how we work: instead of answering abstract questions, I'll react to concrete
  proposals and a rough first build.

## Decisions made
- [0002 — Concept: multi-agent build-in](../decisions/0002-concept-multi-agent-build-in.md)
- `DESIGN.md` §2 (three words) and §9 (never-list) filled in; no ADR, since neither was a
  choice between alternatives.

## What surprised me / what I learned
- Pushback helped on the concrete stuff (the never-list got sharper) but not on abstract
  stuff like the three words. Logged in `../prompts/log.md`.

## Screenshots
- None. No visual changes yet.

## Next
- Claude proposes a starter set: palette, fonts, type scale, grid, motion timings.
- Rough first pass of the build-in so there's something to react to.
- Still open: labeled vs. unlabeled cursors; which projects to feature; custom domain.

# Jake Jacobi · Portfolio

**Live: [jakejacobi.me](https://jakejacobi.me)**

My personal site, built so you can watch it get built. A small crew of cursor "agents"
lays out the page in front of you, and the sky is drawn from this repo's
own history: every star is a commit.


## What's in it

- **Commit constellation.** Each commit to this repo becomes a star, placed oldest at
  the center in a sunflower (phyllotaxis) pattern. Brightness comes from the size of the
  change, and each git tag (milestone) forms its own small constellation. Hover a star to
  see its commit.
- **Agent build-in.** On load, agents drag out text frames, set the type and place the
  stars. Sections further down build as you scroll to them. Respects
  `prefers-reduced-motion`.
- **After hours.** Photos from 9 countries, each drawn as a field of tiny points that
  settle into the image, with the real photo on hover.
- **Project pages.** Case studies for my work, including a drag-to-turn 3D model of the
  Project ECHO drone (three.js) and my physics engine running live on its page.

## Stack

- [Astro](https://astro.build) with content collections, plain CSS custom properties
- SVG + canvas for the constellation and star fields, three.js for the 3D model
- sharp for image processing (all photo metadata, including GPS, is stripped at import)
- Hosted on Vercel

## How it was made

I designed and directed the site; most of the code was written with
[Claude Code](https://claude.com/claude-code). The whole process is documented in
[`docs/`](docs/):

- [`docs/decisions/`](docs/decisions/): architecture decision records for every real choice,
  including the directions I tried and dropped
- [`docs/journal/`](docs/journal/): session-by-session notes
- [`docs/prompts/`](docs/prompts/): prompts that worked well, and ones that didn't
- [`docs/screenshots/`](docs/screenshots/): how the design changed over time
- [`DESIGN.md`](DESIGN.md): the design rules every change has to follow

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build to dist/
```

Other scripts:

```bash
npm run commits    # regenerate the commit data for the constellation
npm run photos     # import photos (resize + strip metadata) into the After hours section
```

## License

The code is free to read and learn from. The photos, writing and personal content are
mine. Please don't reuse them.

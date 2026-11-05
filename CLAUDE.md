# Portfolio — project context for Claude

This is my personal portfolio site. I'm a CS student at Purdue (minors in Spanish and Math).
I direct the design; Claude writes most of the code. The site itself is also a portfolio
entry, so **the process is documented as carefully as the product**.

## Stack
- Astro (static output), plain CSS with custom properties (no Tailwind unless I decide otherwise)
- Animation: GSAP or Motion — see `docs/decisions/` for which one is chosen
- Hosted on Vercel (Hobby plan), auto-deploys from `main` on GitHub
- Package manager: npm

## Commands
- `npm run dev` — local dev server at http://localhost:4321
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the build locally
- `node scripts/snapshot.mjs <label>` — screenshot the running dev server into `docs/screenshots/`

## Design rules
- `DESIGN.md` is the source of truth for colors, type, spacing and motion. Never introduce a
  color, font, size or easing that isn't defined there. If something is missing, ask me and
  update `DESIGN.md` first.
- Minimal over clever. One signature interaction, done well. Anything else must earn its place.
- Respect `prefers-reduced-motion`: every animation needs a no-motion fallback.
- Accessible by default: semantic HTML, visible focus states, real alt text, AA contrast.
- Performance budget: the home page should stay light (target < 200 KB JS shipped).

## Code conventions
- Components in `src/components/`, one per file. Design tokens live in `src/styles/tokens.css`.
- Small, focused commits using Conventional Commits (`feat:`, `fix:`, `style:`, `docs:`, `refactor:`).
- Don't add dependencies without saying why; log significant ones as a decision.

## Documentation (keep it light)
Goal: just enough material to write one portfolio entry about how this site was made.
Don't over-document. No session-length tracking, no logging every prompt.
1. **Decisions:** ADRs in `docs/decisions/` (from `TEMPLATE.md`, numbered) only for big
   choices: concept, stack, palette/type, significant libraries.
2. **Journal:** a short entry in `docs/journal/YYYY-MM-DD-short-title.md` when a session
   moved the project forward (or when I run `/log`). Base it on what actually happened and
   `git log`; don't embellish.
3. **Prompts:** add to `docs/prompts/log.md` only when something would make a good story in
   the case study.
4. **Screenshots:** at visual milestones (first build-in, new palette, etc.), not every change.
Never rewrite past journal entries; append corrections instead.

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

## Documentation duties (important)
This build is a case study. While working:
1. **Decisions** — when we pick between real alternatives (library, layout, concept, palette),
   write an ADR in `docs/decisions/` using `docs/decisions/TEMPLATE.md`. Number sequentially.
2. **Journal** — at the end of a working session (or when I run `/log`), add an entry to
   `docs/journal/` named `YYYY-MM-DD-short-title.md` using `docs/journal/TEMPLATE.md`.
   Base it on what actually happened this session and `git log`/`git diff` — don't embellish.
3. **Prompts** — when a prompt produced a notably good or bad result, note it in
   `docs/prompts/log.md` (the prompt, what happened, what I changed). Honest misses are useful.
4. **Screenshots** — before and after visual changes, run the snapshot script so the
   evolution of the design is captured.
Never rewrite past journal entries; they are a historical record. Append corrections instead.

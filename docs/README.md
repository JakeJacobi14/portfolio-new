# Process documentation

This folder records how the portfolio was designed and built, so it can become its own
case study later.

| Folder | What goes in it | When |
|---|---|---|
| `journal/` | Dated session entries: what I worked on, what changed, what I learned | End of each session (`/log` in Claude Code) |
| `decisions/` | ADRs: one file per real choice between alternatives | Whenever a choice is made (`/decision`) |
| `prompts/` | Notable prompts to Claude and what they produced, good and bad | When a prompt is worth remembering |
| `screenshots/` | Dated screenshots of the site, desktop + mobile | Before/after visual changes (`/snapshot`) |
| `inspiration/` | References and what I took from each | When I find something useful |

Also part of the record:
- **Git history** — small, well-labeled commits.
- **Milestone tags** — `git tag -a v0.1-concept -m "..."`, then `git push --tags`.
  Suggested milestones: concept, wireframe, first deploy, signature animation, content, launch.
- **Vercel preview deployments** — every branch/PR gets its own URL; note good ones in the journal.

## Turning this into a case study later
1. Skim `journal/` and `decisions/` for the story arc: idea → constraints → turning points.
2. Pick 4–6 screenshots that show the design evolving.
3. Pull 2–3 entries from `prompts/log.md` that show *how* I directed the AI (incl. a miss).
4. Write: problem → approach → process → result → what I'd do differently.

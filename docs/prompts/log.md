# Prompt log

Notable prompts to Claude — the ones that worked surprisingly well, and the ones that missed.
This is the "how I directed the AI" part of the case study.

Format:

## YYYY-MM-DD — what I was trying to do
**Prompt (excerpt):**
> ...

**Result:** what Claude produced.
**What I changed / learned:** how I corrected course, or why it worked.

---

## 2026-11-05 — interviewing to fill in DESIGN.md TBDs
**Prompt (excerpt):**
> Interview me one question at a time to fill in the TBDs in DESIGN.md, starting with the
> concept (A, B, C, or something new) and the three words. Push back if my answers are
> vague or generic.

**Result:** Worked for the concept and the never-list. Claude's pushback produced a clearer
ADR and a sharper §9. On the three words it pushed too hard: after I gave three words with
definitions, it asked me to justify the difference between two of them. I got frustrated:
"I can't tell you what it's going to look like until I see it."
**What I changed / learned:** "Push back" needs a limit. Abstract questions only go so far
before I need something visual to react to. We switched from interviewing to Claude proposing
concrete defaults that I accept or change.

---

## 2026-11-07 — one big multi-phase prompt for the whole redesign
**Prompt (excerpt):**
> Big update: reformat the home page, add a background system, build the "commit
> constellation" as the hero's central image, and stub out the remaining pages. [...] Work
> in the phases below and STOP for my approval at each checkpoint.

Phase 1 asked for a 12-column grid, a faint dot grid the agents snap to, column guides,
registration marks, a cursor glow on the dots, and optional grain.

**Result:** The checkpoints worked: Claude planned first, raised conflicts with DESIGN.md
(the dot-grid ban, Geist Mono, em dashes) and stopped after each phase. But Phase 1 was a
miss. Almost all of it was too subtle to see at normal viewing, and the one visible part,
the vertical column guides, was the part I disliked. After two rounds ("remove the grid and
lines", then "I can't tell the difference in any of your other changes") everything was
reverted and we built only the constellation.
**What I changed / learned:** Start with the change I'll actually see. A long spec of quiet
background details reads well on paper but gives me nothing to react to, and it's expensive
to undo. The constellation, one visible thing at a time, went much better.

---

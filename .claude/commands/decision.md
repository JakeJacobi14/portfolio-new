---
description: Record a design or technical decision as an ADR
argument-hint: <what was decided>
---

Record this decision as an ADR: $ARGUMENTS

1. Find the highest-numbered file in `docs/decisions/` and use the next number (4 digits).
2. Create `docs/decisions/NNNN-<slug>.md` from `docs/decisions/TEMPLATE.md`.
3. Fill in context, the options we actually considered (from this conversation), the decision,
   and why. Ask me for the "why" if it isn't clear — don't invent reasons.
4. If the decision changes a design value, update `DESIGN.md` in the same commit.
5. Commit with `docs: ADR NNNN <short title>`.

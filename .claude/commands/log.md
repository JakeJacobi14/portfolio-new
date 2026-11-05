---
description: Write a journal entry for this working session
argument-hint: [optional short title]
---

Write a journal entry for today's work on the portfolio.

1. Run `git log --since="12 hours ago" --oneline` and `git diff --stat HEAD~5 2>/dev/null` (adjust
   if there are fewer commits) to see what actually changed. Also review this conversation.
2. Check whether an entry for today already exists in `docs/journal/`. If it does, append a new
   section to it instead of creating a second file.
3. Otherwise create `docs/journal/YYYY-MM-DD-<slug>.md` from `docs/journal/TEMPLATE.md`.
   Title: $ARGUMENTS (if empty, propose a short one).
4. Fill it honestly from what happened — including things that didn't work. Link any ADRs
   written today and any screenshots taken today. Don't guess "time spent"; ask me.
5. If a prompt from this session is worth remembering (great result or instructive miss),
   offer to add it to `docs/prompts/log.md`.
6. Show me the entry, then commit it with `docs: journal <date>` once I approve.

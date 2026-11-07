// Write this repo's commit history to src/data/commits.json for the commit constellation.
// Usage: npm run commits
//
// Each commit: short and full hash, date, subject, Conventional Commit type, files changed,
// insertions, deletions, and any tags on it. Merge commits are skipped. Commits whose hash
// starts with an entry in src/data/commits-exclude.json are left out (commit messages are
// public on the site). Bookkeeping commits that only refresh commits.json are skipped too.
//
// In a shallow clone (like Vercel's default build) git only sees the last few commits, so
// the script refuses to overwrite the committed file rather than shrink it.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const OUT = "src/data/commits.json";
const EXCLUDE = "src/data/commits-exclude.json";
const TYPES = ["feat", "fix", "style", "docs", "refactor", "chore"];

const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

const shallow = git("rev-parse", "--is-shallow-repository").trim() === "true";
const visible = git("rev-list", "--count", "HEAD").trim();
console.log(`commits: git sees ${visible} commits (${shallow ? "shallow clone" : "full history"})`);
if (shallow) {
  console.warn(`commits: shallow clone, keeping the committed ${OUT}`);
  process.exit(0);
}

const exclude = JSON.parse(readFileSync(EXCLUDE, "utf8")).map((h) => String(h).toLowerCase());

// Tags, including annotated ones (^{} lines point at the tagged commit).
const tags = new Map();
for (const line of git("show-ref", "--tags", "-d").split("\n").filter(Boolean)) {
  const [hash, ref] = line.split(" ");
  const name = ref.replace(/^refs\/tags\//, "").replace(/\^\{\}$/, "");
  const list = tags.get(hash) ?? [];
  if (!list.includes(name)) tags.set(hash, [...list, name]);
}

// One record per commit: a header line marked with \x1e, then --numstat lines.
const log = git("log", "--no-merges", "--reverse", "--numstat", "--format=%x1e%H%x1f%h%x1f%aI%x1f%s");
const commits = [];
for (const chunk of log.split("\x1e").filter((c) => c.trim())) {
  const [header, ...stats] = chunk.split("\n");
  const [hash, short, date, subject] = header.split("\x1f");
  if (exclude.some((p) => hash.startsWith(p))) continue;
  const changed = stats.filter(Boolean);
  if (changed.length && changed.every((s) => s.endsWith(`\t${OUT}`))) continue; // a data refresh
  let files = 0, insertions = 0, deletions = 0;
  for (const s of changed) {
    const [add, del] = s.split("\t");
    files++;
    // Binary files show "-"; they count as a changed file with no lines.
    insertions += Number(add) || 0;
    deletions += Number(del) || 0;
  }
  const prefix = subject.match(/^(\w+)(\([^)]*\))?!?:/)?.[1]?.toLowerCase();
  const type = TYPES.includes(prefix) ? prefix : "other";
  commits.push({ hash, short, date, subject, type, files, insertions, deletions, tags: tags.get(hash) ?? [] });
}

writeFileSync(OUT, JSON.stringify(commits, null, 2) + "\n");
console.log(`commits: wrote ${commits.length} commits to ${OUT}`);

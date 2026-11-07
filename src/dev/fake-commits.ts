// DEV ONLY. A fake commit history for testing the constellation at any size.
// Used when the dev server runs with FAKE_COMMITS=<n>; never imported in a production build.
import type { Commit } from "../lib/constellation";

const TYPES = ["feat", "feat", "fix", "fix", "docs", "docs", "style", "refactor", "chore", "other"];

export function fakeCommits(n: number): Commit[] {
  let seed = 12345;
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
  const hex = () => Array.from({ length: 40 }, () => Math.floor(rand() * 16).toString(16)).join("");
  const start = Date.parse("2026-11-04T10:00:00-05:00");
  const step = Math.max(12, Math.round(n / 7)); // a milestone every so often
  return Array.from({ length: n }, (_, i) => {
    const hash = hex();
    const type = TYPES[Math.floor(rand() * TYPES.length)];
    const lines = Math.floor(Math.exp(rand() * 7)); // 1 to ~1100, mostly small
    return {
      hash,
      short: hash.slice(0, 7),
      date: new Date(start + i * 3.6e6 * (2 + rand() * 20)).toISOString(),
      subject: `${type}: fake commit ${i + 1} (test data)`,
      type,
      files: 1 + Math.floor(rand() * 6),
      insertions: Math.floor(lines * 0.7),
      deletions: Math.floor(lines * 0.3),
      tags: i > 0 && i % step === 0 ? [`v0.${i / step}-fake`] : [],
    };
  });
}

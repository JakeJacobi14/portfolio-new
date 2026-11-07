// Commit constellation layout (DESIGN.md §8, ADR 0008). Pure and deterministic: the same
// commits always give the same image. Runs at build time; the browser only gets the SVG.

export type Commit = {
  hash: string;
  short: string;
  date: string;
  subject: string;
  type: string;
  files: number;
  insertions: number;
  deletions: number;
  tags: string[];
};

export type Node = Commit & {
  i: number;
  x: number;
  y: number;
  r: number;
  /** Length of the path from the first commit to this one (for drawing it partway). */
  along: number;
};

export const REPO = "https://github.com/JakeJacobi14/portfolio-new";
export const VIEW = 100; // viewBox is 0..100 square
const GOLDEN = Math.PI * (3 - Math.sqrt(5)); // 137.5°, in radians
const FIT = 44; // outermost node center, from the middle

/** A number in [0, 1) from a slice of the commit hash: the hash is the seed. */
const fromHash = (hash: string, at: number) => parseInt(hash.slice(at, at + 4), 16) / 0x10000;

export function layout(commits: Commit[]): { nodes: Node[]; length: number } {
  const n = commits.length;
  if (!n) return { nodes: [], length: 0 };
  // Spacing between neighbours, so the newest commit lands at the edge whatever the count.
  const c = FIT / Math.sqrt(Math.max(n, 2));
  const rMax = Math.min(0.42 * c, 4.5);
  const rMin = rMax * 0.32;
  // Size by lines changed, log-scaled against the 95th percentile so one huge commit (the
  // scaffold) doesn't shrink everything else.
  const sizes = commits.map((k) => Math.log1p(k.insertions + k.deletions));
  const sorted = [...sizes].sort((a, b) => a - b);
  const top = sorted[Math.floor((sorted.length - 1) * 0.95)] || 1;
  // A whole-image rotation seeded by the first commit, so it isn't always "pointing right".
  const turn = fromHash(commits[0].hash, 0) * Math.PI * 2;

  let along = 0;
  const nodes: Node[] = [];
  commits.forEach((k, i) => {
    const jr = (fromHash(k.hash, 4) - 0.5) * 0.24 * c; // up to ±12% of the spacing
    const ja = (fromHash(k.hash, 8) - 0.5) * 0.12;
    const rad = c * Math.sqrt(i + 0.5) + jr;
    const ang = i * GOLDEN + turn + ja;
    const x = VIEW / 2 + rad * Math.cos(ang);
    const y = VIEW / 2 + rad * Math.sin(ang);
    const prev = nodes[i - 1];
    if (prev) along += Math.hypot(x - prev.x, y - prev.y);
    const r = rMin + (rMax - rMin) * Math.min(1, sizes[i] / top);
    nodes.push({ ...k, i, x: round(x), y: round(y), r: round(r), along: round(along) });
  });
  return { nodes, length: round(along) };
}

const round = (v: number) => Math.round(v * 100) / 100;

/** "2026-11-04" from an ISO date with offset, in the author's own time zone. */
export const day = (iso: string) => iso.slice(0, 10);

// Commit constellation layout (DESIGN.md §8, ADR 0008, ADR 0009): a night sky where every
// star is a commit. Pure and deterministic: the same commits always give the same sky.
// Runs at build time; the browser only gets the SVG.

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

export type Star = Commit & {
  i: number;
  x: number;
  y: number;
  /** Core radius, in viewBox units (1 unit is about 4px at desktop size). */
  r: number;
  /** Base opacity, 0.35 to 1. */
  o: number;
  bright: boolean;
  tone: "warm" | "cool" | "neutral";
  /** Twinkle cycle as a 0..1 fraction between --twinkle-min and --twinkle-max, or null. */
  twinkle: number | null;
  twinkleDelay: number;
  /** Length of the build-in path from the first commit to this one. */
  along: number;
  /** Index of the milestone figure this star belongs to, if any. */
  figure: number | null;
};

export type Figure = { milestone: number; lines: [number, number][] };

export const REPO = "https://github.com/JakeJacobi14/portfolio-new";
export const VIEW = 100; // viewBox is 0..100 square
const GOLDEN = Math.PI * (3 - Math.sqrt(5)); // 137.5°, in radians
const FIT = 44; // outermost star center, from the middle
const R_TINY = 0.14; // ~1.1px across
const R_MEDIUM = 0.4; // ~3.2px across, the most a star gets without being bright
const R_BRIGHT = [0.55, 0.75] as const; // ~4.4 to 6px across
const BRIGHT_SHARE = 0.08; // only the biggest 8% of commits (plus milestones) are bright
const FIGURE_NEAR = 6; // a figure picks from the milestone's 6 nearest commits in its range
const FIGURE_STARS = 4;
const DUST_MAX = 6;

const TONES: Record<string, Star["tone"]> = { feat: "warm", fix: "cool", refactor: "cool" };

/** A seeded random stream from a commit hash (mulberry32). */
function seeded(hash: string, salt = 0) {
  let a = (parseInt(hash.slice(0, 8), 16) ^ salt) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (v: number) => Math.round(v * 100) / 100;

export function sky(commits: Commit[]) {
  const n = commits.length;
  if (!n) return { stars: [] as Star[], figures: [] as Figure[], dust: [[], []] as string[][], length: 0 };

  const c = FIT / Math.sqrt(Math.max(n, 2)); // spacing between neighbours
  // Change size, log-scaled against the 95th percentile so one huge commit (the scaffold)
  // doesn't make everything else tiny, then a power curve so most stars stay small.
  const sizes = commits.map((k) => Math.log1p(k.insertions + k.deletions));
  const sorted = [...sizes].sort((a, b) => a - b);
  const top = sorted[Math.floor((sorted.length - 1) * 0.95)] || 1;
  const turn = seeded(commits[0].hash, 1)() * Math.PI * 2; // whole-sky rotation
  // Bright by rank, so "a few bright stars" holds whatever the size distribution.
  const brightFrom = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * (1 - BRIGHT_SHARE)))];

  let along = 0;
  const stars: Star[] = commits.map((k, i) => {
    const rand = seeded(k.hash);
    // Phyllotaxis, then pushed up to half a spacing off it so it reads as a sky.
    const base = c * Math.sqrt(i + 0.5);
    const ang = i * GOLDEN + turn;
    const push = rand() * 0.5 * c, dir = rand() * Math.PI * 2;
    let x = base * Math.cos(ang) + push * Math.cos(dir);
    let y = base * Math.sin(ang) + push * Math.sin(dir);
    const out = Math.hypot(x, y);
    if (out > FIT + 2) { x *= (FIT + 2) / out; y *= (FIT + 2) / out; }
    x += VIEW / 2; y += VIEW / 2;

    const milestone = k.tags.length > 0;
    const b = Math.pow(Math.min(1, sizes[i] / top), 3);
    const bright = milestone || (n >= 4 && sizes[i] >= brightFrom && sizes[i] > 0);
    const r = bright ? R_BRIGHT[0] + (R_BRIGHT[1] - R_BRIGHT[0]) * b : R_TINY + (R_MEDIUM - R_TINY) * b;
    const o = bright ? 1 : Math.min(1, 0.35 + 0.35 * rand() + 0.6 * b);
    const tw = rand();
    return {
      ...k, i, x: round(x), y: round(y), r: round(r), o: round(o), bright,
      tone: TONES[k.type] ?? "neutral",
      twinkle: tw < 0.125 ? round(rand()) : null,
      twinkleDelay: round(rand() * 8),
      along: 0,
      figure: null,
    };
  });
  stars.forEach((s, i) => {
    if (i) along += Math.hypot(s.x - stars[i - 1].x, s.y - stars[i - 1].y);
    s.along = round(along);
  });

  // Constellation figures: each milestone joins the brightest of its nearest commits since
  // the previous milestone (neighbours in time are scattered around the sky, so "nearest"
  // keeps a figure local), with the shortest set of lines that connects them (Prim's tree).
  const figures: Figure[] = [];
  let from = 0;
  stars.forEach((s, i) => {
    if (!s.tags.length) return;
    const dist = (m: Star) => Math.hypot(m.x - s.x, m.y - s.y);
    const near = stars.slice(from, i).sort((a, b) => dist(a) - dist(b)).slice(0, FIGURE_NEAR);
    const members = [i, ...near.sort((a, b) => b.r - a.r).slice(0, FIGURE_STARS).map((m) => m.i)];
    const f = figures.length;
    for (const m of members) stars[m].figure = f;
    const lines: [number, number][] = [];
    const inTree = [members[0]];
    const rest = members.slice(1);
    while (rest.length) {
      let best: [number, number, number] = [0, 0, Infinity];
      for (const a of inTree) for (const [j, b] of rest.entries()) {
        const d = Math.hypot(stars[a].x - stars[b].x, stars[a].y - stars[b].y);
        if (d < best[2]) best = [a, j, d];
      }
      const [a, j] = best;
      lines.push([a, rest[j]]);
      inTree.push(rest[j]);
      rest.splice(j, 1);
    }
    figures.push({ milestone: i, lines });
    from = i + 1;
  });

  // Stardust: one faint 1px speck per changed file after the first (up to 6), scattered
  // close around its star. Drawn as two paths (two opacities) so 500 stars stay cheap.
  const dust: string[][] = [[], []];
  for (const s of stars) {
    const rand = seeded(s.hash, 2);
    const count = Math.min(DUST_MAX, Math.max(0, s.files - 1));
    for (let d = 0; d < count; d++) {
      const dist = s.r + 0.8 + rand() * 2.6;
      const a = rand() * Math.PI * 2;
      const x = round(s.x + dist * Math.cos(a)), y = round(s.y + dist * Math.sin(a));
      dust[rand() < 0.5 ? 0 : 1].push(`M${x} ${y}h.25v.25h-.25z`);
    }
  }

  return { stars, figures, dust, length: round(along) };
}

/** "2026-11-04" from an ISO date with offset, in the author's own time zone. */
export const day = (iso: string) => iso.slice(0, 10);

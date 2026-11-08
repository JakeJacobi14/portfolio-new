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
  /** Index of the milestone figure this star belongs to, if any. */
  figure: number | null;
};

export type Figure = { milestone: number; lines: [number, number][] };
/** A milestone label, placed where it hits nothing. x/y are its top-left, in sky units. */
export type Label = { figure: number; text: string; x: number; y: number };
/** Stardust for one ring of the sky (inner to outer), split into two opacities. */
export type DustBand = { band: number; faint: string; light: string };

export const REPO = "https://github.com/JakeJacobi14/portfolio-new";
export const VIEW = 100; // stars live in 0..100
/** The SVG reaches PAD past the stars on every side, so the edge can fade out softly. */
export const PAD = 15;
export const BOX = VIEW + 2 * PAD;
const GOLDEN = Math.PI * (3 - Math.sqrt(5)); // 137.5°, in radians
const FIT = 44; // outermost star center, from the middle
const R_TINY = 0.14; // ~1.1px across
const R_MEDIUM = 0.4; // ~3.2px across, the most a star gets without being bright
const R_BRIGHT = [0.55, 0.75] as const; // ~4.4 to 6px across
const BRIGHT_SHARE = 0.08; // only the biggest 8% of commits (plus milestones) are bright
const FIGURE_NEAR = 6; // a figure picks from the milestone's 6 nearest commits in its range
const FIGURE_STARS = 4;
const DUST_MAX = 6;
const DUST_BANDS = 6;
// Labels are HTML at a fixed size; this is their size in sky units at the smallest sky
// (a phone, ~3.5px per unit), so the collision check is on the safe side everywhere.
const PX_PER_UNIT = 3.5;
const LABEL_CHAR = 7.3 / PX_PER_UNIT; // 10px Plex Mono plus 0.12em tracking
const LABEL_H = 13 / PX_PER_UNIT;

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
  if (!n) return { stars: [] as Star[], figures: [] as Figure[], labels: [] as Label[], dust: [] as DustBand[] };

  const c = FIT / Math.sqrt(Math.max(n, 2)); // spacing between neighbours
  // Change size, log-scaled against the 95th percentile so one huge commit (the scaffold)
  // doesn't make everything else tiny, then a power curve so most stars stay small.
  const sizes = commits.map((k) => Math.log1p(k.insertions + k.deletions));
  const sorted = [...sizes].sort((a, b) => a - b);
  const top = sorted[Math.floor((sorted.length - 1) * 0.95)] || 1;
  const turn = seeded(commits[0].hash, 1)() * Math.PI * 2; // whole-sky rotation
  // Bright by rank, so "a few bright stars" holds whatever the size distribution.
  const brightFrom = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * (1 - BRIGHT_SHARE)))];

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
      figure: null,
    };
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
  // close around its star. Grouped into rings of the sky so it can fade in behind the
  // build-in's outward sweep, and drawn as paths (not one element per speck) to stay cheap.
  const bands = Array.from({ length: DUST_BANDS }, () => [[] as string[], [] as string[]]);
  for (const s of stars) {
    const rand = seeded(s.hash, 2);
    const count = Math.min(DUST_MAX, Math.max(0, s.files - 1));
    const band = Math.min(DUST_BANDS - 1, Math.floor((Math.hypot(s.x - 50, s.y - 50) / (FIT + 2)) * DUST_BANDS));
    for (let d = 0; d < count; d++) {
      const dist = s.r + 0.8 + rand() * 2.6;
      const a = rand() * Math.PI * 2;
      const x = round(s.x + dist * Math.cos(a)), y = round(s.y + dist * Math.sin(a));
      bands[band][rand() < 0.5 ? 0 : 1].push(`M${x} ${y}h.25v.25h-.25z`);
    }
  }
  const dust: DustBand[] = bands
    .map(([faint, light], band) => ({ band, faint: faint.join(""), light: light.join("") }))
    .filter((b) => b.faint || b.light);

  return { stars, figures, labels: placeLabels(stars, figures), dust };
}

type Rect = { x: number; y: number; w: number; h: number };

/** Put each milestone's label in the clearest nearby spot: try eight directions (then the
    same farther out) and take the first one that hits no star, line or other label. */
function placeLabels(stars: Star[], figures: Figure[]): Label[] {
  const placed: Rect[] = [];
  const segments = figures.flatMap((f) => f.lines.map(([a, b]) => [stars[a], stars[b]] as const));
  const hits = (rc: Rect) => {
    const pad = 0.4;
    const inside = (x: number, y: number) =>
      x > rc.x - pad && x < rc.x + rc.w + pad && y > rc.y - pad && y < rc.y + rc.h + pad;
    let n = 0;
    for (const s of stars) {
      const rr = Math.max(s.r, 0.35) + 0.5;
      const cx = Math.max(rc.x, Math.min(s.x, rc.x + rc.w)), cy = Math.max(rc.y, Math.min(s.y, rc.y + rc.h));
      if (Math.hypot(s.x - cx, s.y - cy) < rr) n++;
    }
    for (const [a, b] of segments) {
      for (let t = 0; t <= 1; t += 0.05) if (inside(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t)) { n += 2; break; }
    }
    for (const p of placed) if (rc.x < p.x + p.w && p.x < rc.x + rc.w && rc.y < p.y + p.h && p.y < rc.y + rc.h) n += 3;
    if (rc.x < -PAD || rc.y < -PAD || rc.x + rc.w > VIEW + PAD || rc.y + rc.h > VIEW + PAD) n += 3;
    return n;
  };
  return figures.map((f, fi) => {
    const s = stars[f.milestone];
    const text = s.tags.join(", ");
    const w = text.length * LABEL_CHAR, h = LABEL_H;
    let best: Rect | null = null, bestHits = Infinity;
    for (const far of [1, 1.8, 2.6]) {
      const g = s.r + 1.2 * far, d = g * 0.7;
      const options: Rect[] = [
        { x: s.x + g, y: s.y - h / 2, w, h }, // right
        { x: s.x - g - w, y: s.y - h / 2, w, h }, // left
        { x: s.x + d, y: s.y - d - h, w, h }, // up right
        { x: s.x + d, y: s.y + d, w, h }, // down right
        { x: s.x - d - w, y: s.y - d - h, w, h }, // up left
        { x: s.x - d - w, y: s.y + d, w, h }, // down left
        { x: s.x - w / 2, y: s.y - g - h, w, h }, // above
        { x: s.x - w / 2, y: s.y + g, w, h }, // below
      ];
      for (const o of options) {
        // Collisions first; between equally clear spots, prefer the one nearer the center,
        // since the sky fades out toward its edge.
        const k = hits(o) + Math.hypot(o.x + o.w / 2 - 50, o.y + o.h / 2 - 50) / 100;
        if (k < bestHits) { best = o; bestHits = k; }
      }
      if (bestHits < 1) break; // found a spot with no collisions
    }
    placed.push(best!);
    return { figure: fi, text, x: round(best!.x), y: round(best!.y) };
  });
}

/** "2026-11-04" from an ISO date with offset, in the author's own time zone. */
export const day = (iso: string) => iso.slice(0, 10);

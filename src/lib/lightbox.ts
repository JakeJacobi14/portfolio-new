// The after hours lightbox (DESIGN.md §8), shared by the home page strip and /after-hours.
// The markup and styles live in components/Lightbox.astro. Opening it, the build-in's agents
// build the view: a cursor drags a frame out to the photo's size, the photo rises into it,
// the caption is typed, and the agent steps away. Stepping with ← / → just swaps the photo.

export type Item = { full: string; alt: string; caption: string };

const EASE = "cubic-bezier(0.2, 0, 0, 1)"; // --ease
const GROW = 450, RISE = 300, MS_PER_CHAR = 12, FADE = 300; // ms; the build-in's frame, rise and quick typing
const still = matchMedia("(prefers-reduced-motion: reduce)");
const pad = (n: number) => String(n).padStart(2, "0");
const ease = (x: number) => {
  // cubic-bezier(0.2, 0, 0, 1), solved for t by bisection.
  let lo = 0, hi = 1, t = x;
  for (let i = 0; i < 20; i++) {
    t = (lo + hi) / 2;
    const bx = 3 * (1 - t) ** 2 * t * 0.2 + t ** 3;
    if (bx < x) lo = t; else hi = t;
  }
  return 3 * (1 - t) * t ** 2 + t ** 3;
};

let wired = false;
let items: Item[] = [];
let shown = 0;
let onClose: ((i: number) => void) | undefined;
let run = 0; // bumped to stop a build that's still going

function els() {
  const box = document.querySelector<HTMLDialogElement>("[data-lightbox]")!;
  return {
    box,
    img: box.querySelector<HTMLImageElement>("[data-lb-img]")!,
    cap: box.querySelector<HTMLElement>("[data-lb-cap]")!,
    pos: box.querySelector<HTMLElement>("[data-lb-pos]")!,
    nav: box.querySelector<HTMLElement>("[data-lb-nav]")!,
  };
}

function fill(i: number) {
  const { img, cap, pos } = els();
  shown = (i + items.length) % items.length;
  const it = items[shown];
  img.src = it.full;
  img.alt = it.alt;
  cap.textContent = it.caption;
  pos.textContent = `${pad(shown + 1)} / ${pad(items.length)}`;
}

/** Stop any build in progress and leave the view complete. */
function settle() {
  run++;
  const { box, img, cap, nav } = els();
  box.querySelectorAll(".lb-frame, .lb-cursor").forEach((n) => n.remove());
  for (const el of [img, cap, nav]) { el.getAnimations().forEach((a) => a.cancel()); el.style.opacity = ""; }
  cap.textContent = items[shown]?.caption ?? "";
}

function wire() {
  if (wired) return;
  wired = true;
  const { box } = els();
  const step = (d: number) => { settle(); fill(shown + d); };
  box.querySelector("[data-lb-prev]")!.addEventListener("click", () => step(-1));
  box.querySelector("[data-lb-next]")!.addEventListener("click", () => step(1));
  box.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
  });
  // A click on the backdrop (outside the dialog's box) closes it.
  box.addEventListener("click", (e) => {
    const r = box.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) box.close();
  });
  box.addEventListener("close", () => { settle(); onClose?.(shown); });
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const tween = (ms: number, f: (e: number) => void, id: number) => new Promise<void>((resolve) => {
  const t0 = performance.now();
  const frame = (now: number) => {
    if (id !== run) return resolve();
    const p = Math.min(1, (now - t0) / ms);
    f(ease(p));
    if (p < 1) requestAnimationFrame(frame); else resolve();
  };
  requestAnimationFrame(frame);
});

async function build(id: number) {
  const { box, img, cap, nav } = els();
  const text = cap.textContent ?? "";
  img.style.opacity = "0"; cap.style.opacity = "0"; nav.style.opacity = "0";
  // Measure once the photo has its size (it may still be loading).
  await Promise.race([img.decode().catch(() => {}), wait(600)]);
  if (id !== run) return;
  const b = box.getBoundingClientRect(), r = img.getBoundingClientRect();
  // The photo itself, not its element: object-fit: contain leaves bars beside a tall photo.
  const k = img.naturalWidth && img.naturalHeight ? Math.min(r.width / img.naturalWidth, r.height / img.naturalHeight) : 1;
  const w = img.naturalWidth ? img.naturalWidth * k : r.width, h = img.naturalHeight ? img.naturalHeight * k : r.height;
  const x = r.left - b.left - box.clientLeft + (r.width - w) / 2, y = r.top - b.top - box.clientTop + (r.height - h) / 2;

  const frame = document.createElement("div");
  frame.className = "lb-frame";
  frame.setAttribute("aria-hidden", "true");
  frame.innerHTML = "<i></i><i></i><i></i><i></i><span class='lb-size'></span>";
  Object.assign(frame.style, { left: `${x}px`, top: `${y}px` });
  const cursor = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  cursor.setAttribute("class", "lb-cursor");
  cursor.setAttribute("viewBox", "0 0 14 20");
  cursor.setAttribute("width", "14");
  cursor.setAttribute("height", "20");
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML = '<path d="M1 1 L1 16 L5 12.5 L8 19 L10.5 18 L7.6 11.6 L12.5 11.6 Z" />';
  box.append(frame, cursor);
  const size = frame.querySelector<HTMLElement>(".lb-size")!;

  // The agent drags a frame out from the photo's top-left corner to its full size.
  const w0 = Math.min(w, 16), h0 = Math.min(h, 10);
  await tween(GROW, (e) => {
    const fw = w0 + (w - w0) * e, fh = h0 + (h - h0) * e;
    frame.style.width = `${fw}px`;
    frame.style.height = `${fh}px`;
    cursor.style.transform = `translate(${x + fw}px, ${y + fh}px)`;
    size.textContent = `W ${Math.round(fw)} · H ${Math.round(fh)}`;
  }, id);
  if (id !== run) return;
  size.animate([{ opacity: 1 }, { opacity: 0 }], { duration: FADE, easing: EASE, fill: "forwards" });

  // The photo rises into the frame, then the caption is typed and the controls appear.
  img.style.opacity = "";
  await img.animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: RISE, easing: EASE }).finished.catch(() => {});
  if (id !== run) return;
  cap.textContent = "";
  cap.style.opacity = "";
  nav.style.opacity = "";
  nav.animate([{ opacity: 0 }, { opacity: 1 }], { duration: RISE, easing: EASE });
  for (let i = 1; i <= text.length; i++) {
    if (id !== run) return;
    cap.textContent = text.slice(0, i);
    await wait(MS_PER_CHAR);
  }

  // The agent steps away.
  const from = cursor.style.transform;
  frame.animate([{ opacity: 1 }, { opacity: 0 }], { duration: FADE, easing: EASE, fill: "forwards" }).finished.then(() => frame.remove(), () => {});
  cursor.animate([{ opacity: 1, transform: from }, { opacity: 0, transform: `${from} translate(24px, 40px)` }], { duration: FADE, easing: EASE, fill: "forwards" })
    .finished.then(() => cursor.remove(), () => {});
}

/** Open the lightbox on `list[index]`. `close` gets the index you ended on. */
export function openLightbox(list: Item[], index: number, close?: (i: number) => void) {
  wire();
  settle();
  items = list;
  onClose = close;
  fill(index);
  els().box.showModal();
  if (!still.matches) build(run);
}

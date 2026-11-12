// The after hours lightbox (DESIGN.md §8), shared by the home page strip and /after-hours.
// The markup and styles live in components/Lightbox.astro.

export type Item = { full: string; alt: string; caption: string };

const pad = (n: number) => String(n).padStart(2, "0");
let wired = false;
let items: Item[] = [];
let shown = 0;
let onClose: ((i: number) => void) | undefined;

function els() {
  const box = document.querySelector<HTMLDialogElement>("[data-lightbox]")!;
  return {
    box,
    img: box.querySelector<HTMLImageElement>("[data-lb-img]")!,
    cap: box.querySelector<HTMLElement>("[data-lb-cap]")!,
    pos: box.querySelector<HTMLElement>("[data-lb-pos]")!,
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

function wire() {
  if (wired) return;
  wired = true;
  const { box } = els();
  const step = (d: number) => fill(shown + d);
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
  box.addEventListener("close", () => onClose?.(shown));
}

/** Open the lightbox on `list[index]`. `close` gets the index you ended on. */
export function openLightbox(list: Item[], index: number, close?: (i: number) => void) {
  wire();
  items = list;
  onClose = close;
  fill(index);
  els().box.showModal();
}

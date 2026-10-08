/* ------------------------------------------------------------
   The project list. Replace the placeholder text and images
   here as the real content arrives. Nothing else needs to change.
   ------------------------------------------------------------ */
const PROJECTS = [
  {
    slug: "agristelle",
    title: "Agristelle",
    designedFor: "Agristelle farm stays",
    role: "Product designer",
    type: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus dui augue, ac volutpat elit eleifend quis. Phasellus non erat a augue",
    side: "assets/right-blob.svg", tint: "60deg",
    shots: {
      back:  { src: "assets/agristelle-dashboard-02.png", alt: "Agristelle admin panel: experiences and community overview" },
      front: { src: "assets/agristelle-dashboard-01.png", alt: "Agristelle admin panel: property owner detail" },
    },
  },
  {
    slug: "genier",
    title: "Genier",
    designedFor: "Genier (placeholder)",
    role: "Product designer",
    type: "Placeholder text for the second project. Replace this with the real project type.",
    side: "assets/right-blob.svg", tint: "0deg", ph: "#e6f3ef",
  },
  {
    slug: "liq-academy",
    title: "LIQ Academy",
    designedFor: "LIQ Academy (placeholder)",
    role: "Product designer",
    type: "Placeholder text for the third project. Replace this with the real project type.",
    side: "assets/left-blob.svg", tint: "150deg", ph: "#e8eef7",
  },
  {
    slug: "amharic-academy",
    title: "Amharic Academy",
    designedFor: "Amharic Academy (placeholder)",
    role: "Product designer",
    type: "Placeholder text for the fourth project. Replace this with the real project type.",
    side: "assets/left-blob.svg", tint: "0deg", ph: "#f7ece4",
  },
];

/* ------------------------------------------------------------
   Where a card sits for each slot, in design pixels on the
   1440 x 1080 canvas. Slot = (project number - current) mod 4.
   0 = centre, 1 = next (upper right), 3 = previous (lower left),
   2 = waiting out of sight.
   To swap the diagonal, swap the slot 1 and slot 3 rows.
   ------------------------------------------------------------ */
const SLOTS = {
  0: { x: 333, y: 256, w: 775, h: 652 },
  1: { x: 640, y: 181, w: 584, h: 544 },
  2: { x: 500, y: 300, w: 420, h: 360 },
  3: { x: 215, y: 391, w: 576, h: 502 },
};

const stage = document.querySelector(".stage");
const cardsEl = document.getElementById("cards");
const factFor = document.getElementById("fact-for");
const factRole = document.getElementById("fact-role");
const factType = document.getElementById("fact-type");
const counter = document.getElementById("counter");
const total = PROJECTS.length;

let current = 0;
const wanted = new URLSearchParams(location.search).get("card");
const wantedIndex = PROJECTS.findIndex((p) => p.slug === wanted);
if (wantedIndex >= 0) current = wantedIndex;

/* ---------- build the cards ---------- */
const cardEls = PROJECTS.map((p, i) => {
  const a = document.createElement("a");
  a.className = "layer card";
  a.setAttribute("style", "--x:333; --y:256; --w:775; --h:652;");   /* every card starts as the centre box */
  a.href = "project.html?p=" + p.slug;
  a.setAttribute("aria-label", `${p.title}, project ${i + 1} of ${total}`);
  a.innerHTML = `
    <div class="card__side" aria-hidden="true"><img src="${p.side}" alt="" style="--tint:${p.tint}"></div>
    <div class="card__front">
      <div class="card__blob" aria-hidden="true"><img src="assets/front-blob.svg" alt=""></div>
      ${p.shots ? `
        <img class="card__shot card__shot--back layer" style="--x:125; --y:103; --w:371; --h:426;" src="${p.shots.back.src}" alt="${p.shots.back.alt}">
        <img class="card__shot card__shot--front layer" style="--x:294; --y:202; --w:355; --h:291;" src="${p.shots.front.src}" alt="${p.shots.front.alt}">`
      : `
        <div class="card__ph card__ph--back layer" style="--x:125; --y:103; --w:371; --h:426; --ph:${p.ph}" aria-hidden="true"></div>
        <div class="card__ph card__ph--front layer" style="--x:294; --y:202; --w:355; --h:291; --ph:${p.ph}" aria-hidden="true">${p.title}</div>`}
    </div>`;
  cardsEl.appendChild(a);
  a.addEventListener("click", (e) => {
    const slot = slotOf(i);
    if (slot === 0) return;            /* the current card opens its page */
    e.preventDefault();                /* a card at the side comes to the centre first */
    goTo(i);
  });
  return a;
});

function slotOf(i) {
  return (i - current + total) % total;
}

/* ---------- put every card in its slot ---------- */
function place() {
  cardEls.forEach((el, i) => {
    const slot = slotOf(i);
    const s = SLOTS[slot];
    el.dataset.slot = slot;
    /* Slide and scale from the centre box (SLOTS[0]) into this slot's box. */
    const c0 = SLOTS[0];
    const dx = s.x - c0.x, dy = s.y - c0.y;
    el.style.transform =
      `translate(calc(var(--u) * ${dx}), calc(var(--u) * ${dy})) scale(${s.w / c0.w}, ${s.h / c0.h})`;
    const isCurrent = slot === 0;
    el.tabIndex = isCurrent ? 0 : -1;
    if (isCurrent) el.setAttribute("aria-current", "true");
    else el.removeAttribute("aria-current");
  });
}

/* ---------- facts and counter ---------- */
function updateFacts() {
  const p = PROJECTS[current];
  factFor.textContent = p.designedFor;
  factRole.textContent = p.role;
  factType.textContent = p.type;
  counter.textContent = String(current + 1).padStart(2, "0") + "/" + String(total).padStart(2, "0");
  counter.setAttribute("aria-label", `Project ${current + 1} of ${total}`);
}

let swapTimer;
function goTo(index) {
  if (index === current) return;
  const leaving = cardEls[current];
  current = (index + total) % total;
  place();
  leaving.classList.add("is-leaving");
  setTimeout(() => leaving.classList.remove("is-leaving"), 700);
  stage.classList.add("is-swapping");
  clearTimeout(swapTimer);
  swapTimer = setTimeout(() => {
    updateFacts();
    stage.classList.remove("is-swapping");
  }, 250);
}
const next = () => goTo(current + 1);
const prev = () => goTo(current - 1);

/* ---------- input: wheel, touch, keys ---------- */
let locked = false;
function step(direction) {
  if (locked) return;
  locked = true;
  direction > 0 ? next() : prev();
  setTimeout(() => (locked = false), 900);   /* one move per gesture */
}

window.addEventListener("wheel", (e) => {
  const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
  if (Math.abs(d) < 8) return;
  step(d);
}, { passive: true });

let touchStartY = null;
window.addEventListener("touchstart", (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
window.addEventListener("touchend", (e) => {
  if (touchStartY === null) return;
  const dy = touchStartY - e.changedTouches[0].clientY;
  touchStartY = null;
  if (Math.abs(dy) > 50) step(dy);
}, { passive: true });

window.addEventListener("keydown", (e) => {
  if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key)) { e.preventDefault(); step(1); }
  if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); step(-1); }
});

/* ---------- start ---------- */
updateFacts();
place();
/* Switch the animation on only after the first frame has been drawn. */
requestAnimationFrame(() => requestAnimationFrame(() => cardsEl.classList.add("is-ready")));

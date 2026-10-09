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

/* ------------------------------------------------------------
   Phones get their own layout (drawn on a 412 x 917 canvas). Same cards, same logic, other
   numbers. Crossing the breakpoint (turning the phone, resizing the window) just reloads.
   ------------------------------------------------------------ */
const phone = window.matchMedia("(max-width: 700px)");
const isPhone = phone.matches;
phone.addEventListener("change", () => location.reload());

const MOBILE_SLOTS = {
  0: { x: 13.6, y: 275.5, w: 388.5, h: 326.5 },
  1: { x: -86.3, y: 191, w: 367.7, h: 369.1 },    /* upper left, bleeding off the edge */
  2: { x: 60, y: 330, w: 290, h: 250 },
  3: { x: 106.4, y: 317.4, w: 424.4, h: 370.8 },  /* lower right, bleeding off the edge */
};
const MOBILE_SHOTS = {
  back:  { x: 56.5,  y: 49,   w: 186.2, h: 214 },
  front: { x: 140.1, y: 98.8, w: 178.9, h: 146.6 },
};
const DESKTOP_SHOTS = {
  back:  { x: 125, y: 103, w: 371, h: 426 },
  front: { x: 294, y: 202, w: 355, h: 291 },
};
const MOBILE_SIDE = { "assets/right-blob.svg": "assets/m-side-teal.svg", "assets/left-blob.svg": "assets/m-side-dark.svg" };
const slots = isPhone ? MOBILE_SLOTS : SLOTS;
const shotBox = isPhone ? MOBILE_SHOTS : DESKTOP_SHOTS;
const box = (b) => `--x:${b.x}; --y:${b.y}; --w:${b.w};` + (b.h ? ` --h:${b.h};` : "");

const stage = document.querySelector(".stage");
if (isPhone) stage.classList.remove("is-intro");   /* the phone entry screen is not designed yet */
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
  a.setAttribute("style", box(slots[0]));   /* every card starts as the centre box */
  a.href = "project.html?p=" + p.slug;
  a.setAttribute("aria-label", `${p.title}, project ${i + 1} of ${total}`);
  a.innerHTML = `
    <div class="card__side" aria-hidden="true"><img src="${isPhone ? MOBILE_SIDE[p.side] || p.side : p.side}" alt="" style="--tint:${p.tint}"></div>
    <div class="card__front">
      <div class="card__blob" aria-hidden="true"><img src="assets/front-blob.svg" alt=""></div>
      ${p.shots ? `
        <img class="card__shot card__shot--back layer" style="${box(shotBox.back)}" src="${p.shots.back.src}" alt="${p.shots.back.alt}">
        <img class="card__shot card__shot--front layer" style="${box(shotBox.front)}" src="${p.shots.front.src}" alt="${p.shots.front.alt}">`
      : `
        <div class="card__ph card__ph--back layer" style="${box(shotBox.back)} --ph:${p.ph}" aria-hidden="true"></div>
        <div class="card__ph card__ph--front layer" style="${box(shotBox.front)} --ph:${p.ph}" aria-hidden="true">${p.title}</div>`}
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
    const s = slots[slot];
    el.dataset.slot = slot;
    /* Slide and scale from the centre box (SLOTS[0]) into this slot's box. */
    const c0 = slots[0];
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
  counter.querySelector(".counter__num").textContent = String(current + 1).padStart(2, "0");
  counter.querySelector(".counter__total").textContent = "/" + String(total).padStart(2, "0");
  counter.setAttribute("aria-label", `Project ${current + 1} of ${total}`);
}

let swapTimer;
function goTo(index) {
  if (index === current) return;
  current = (index + total) % total;
  place();
  stage.classList.add("is-swapping");
  clearTimeout(swapTimer);
  swapTimer = setTimeout(() => {
    updateFacts();
    stage.classList.remove("is-swapping");
  }, 250);
}
const next = () => goTo(current + 1);
const prev = () => goTo(current - 1);

/* ---------- entry screen ---------- */
const intro = document.getElementById("intro");
const introBlob = document.getElementById("intro-blob");
const introName = document.getElementById("intro-name");
let introBusy = false;

/* NARDOS is split into one span per letter so each letter can change on its own. */
const word = document.createElement("span");
word.className = "intro__word";
introName.appendChild(word);
const letters = [..."NARDOS"].map((ch) => {
  const el = document.createElement("span");
  el.className = "ltr";
  const g = document.createElement("span");      /* the glyph itself, centred in the slot */
  g.className = "ltr__g";
  g.textContent = ch;
  el.appendChild(g);
  el.setAttribute("aria-hidden", "true");
  word.appendChild(el);
  return el;
});

/* Hover: only the letter under the cursor turns into BBH Sans Bartle and orange. */
function heat(on) { if (!on) letters.forEach((el) => el.classList.remove("is-hot")); }
letters.forEach((el) => {
  el.addEventListener("mouseenter", () => el.classList.add("is-hot"));
  el.addEventListener("mouseleave", () => el.classList.remove("is-hot"));
});

/* Each letter's slot is as wide as its current shape, and glides to the other width when it
   changes, so the word stays smooth and centred. Measured once the fonts have loaded. */
function lockLetterWidths() {
  /* Measurements come from the screen, which shows the entry screen scaled up, so divide that out. */
  const k = parseFloat(getComputedStyle(intro).getPropertyValue("--intro-scale")) || 1;
  const size = parseFloat(getComputedStyle(introName).fontSize) * k;
  /* Distance from the top of the letter's box down to its baseline, found with a zero-size marker. */
  const baseline = (el) => {
    const probe = document.createElement("i");
    probe.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline";
    el.firstChild.appendChild(probe);
    const d = probe.getBoundingClientRect().bottom - el.getBoundingClientRect().top;
    probe.remove();
    return d;
  };
  letters.forEach((el) => {
    el.classList.remove("is-hot");
    el.style.width = "auto";
    const a = el.getBoundingClientRect().width, ya = baseline(el);
    el.classList.add("is-hot");
    el.style.width = "auto";
    const b = el.getBoundingClientRect().width, yb = baseline(el);
    el.classList.remove("is-hot");
    el.style.width = "";
    el.style.setProperty("--w0", a / size + "em");
    el.style.setProperty("--w1", b / size + "em");
    /* Antonio's baseline is the reference; the Bartle letter is nudged so its baseline lands on it. */
    el.style.setProperty("--dy", (ya - yb) / size + "em");
  });
}
Promise.all([
  document.fonts.load('700 100px "Antonio"'),
  document.fonts.load('400 100px "BBH Sans Bartle"'),
]).catch(() => {}).then(() => document.fonts.ready).then(lockLetterWidths);


const centre = (r) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });

/* Scroll away: the blob shrinks and turns into the logo blob, and NARDOS travels with it. */
function leaveIntro() {
  if (introBusy || !stage.classList.contains("is-intro")) return;
  introBusy = true;
  heat(false);
  /* Measure everything at rest, before anything moves. */
  const logoBlob = document.querySelector(".logo__blob img") || document.querySelector(".logo__blob");
  const logoText = document.querySelector(".logo__text");
  const b = introBlob.getBoundingClientRect(), bt = logoBlob.getBoundingClientRect();
  const n = introName.getBoundingClientRect(), nt = logoText.getBoundingClientRect();
  const bc = centre(b), btc = centre(bt), nc = centre(n), ntc = centre(nt);
  /* The entry screen is drawn a little larger than the design (--intro-scale), so distances are
     divided by that, and the letter size ratio is measured against what is on screen. */
  const k = parseFloat(getComputedStyle(intro).getPropertyValue("--intro-scale")) || 1;
  const fontRatio = parseFloat(getComputedStyle(logoText).fontSize) / (parseFloat(getComputedStyle(introName).fontSize) * k);

  /* The blob turns a quarter turn, so its width becomes the logo's height and the other way round. */
  introBlob.style.transform =
    `translate(${(btc.x - bc.x) / k}px, ${(btc.y - bc.y) / k}px) rotate(-90deg) scale(${bt.height / b.width}, ${bt.width / b.height})`;
  introName.style.transform =
    `translate(${(ntc.x - nc.x) / k}px, ${(ntc.y - nc.y) / k}px) rotate(-90deg) scale(${fontRatio})`;
  /* Freeze the drifting background where it is, then let it settle back to its place. */
  const frozen = getComputedStyle(cardsEl).transform;
  cardsEl.style.animation = "none";
  cardsEl.style.transform = frozen;
  void cardsEl.offsetWidth;
  cardsEl.style.transition = "transform .9s cubic-bezier(.65, 0, .25, 1)";
  cardsEl.style.transform = "none";
  stage.classList.add("is-leaving");

  setTimeout(() => {
    stage.classList.remove("is-intro", "is-leaving");
    introBusy = false;
  }, 1000);
}

/* Back to the entry screen (logo click): the same move, played backwards. */
function enterIntro() {
  if (isPhone || introBusy || stage.classList.contains("is-intro")) return;
  introBusy = true;
  cardsEl.style.animation = ""; cardsEl.style.transition = ""; cardsEl.style.transform = "";
  stage.classList.add("is-intro", "is-pre");       /* blob and name start on the logo, texts hidden */
  void stage.offsetWidth;                           /* let the browser register that start */
  stage.classList.remove("is-pre");
  introBlob.style.transform = "";
  introName.style.transform = "";
  setTimeout(() => (introBusy = false), 1000);
}

intro.addEventListener("click", leaveIntro);
document.querySelector(".logo").addEventListener("click", (e) => { e.preventDefault(); enterIntro(); });

/* Coming back from a project page goes straight to the work. */
if (new URLSearchParams(location.search).has("card") && !isPhone) {
  stage.classList.remove("is-intro");
  introBlob.style.transform = "translate(0,0) scale(.15)";
  introName.style.transform = "scale(.2)";
}

/* ---------- input: wheel, touch, keys ---------- */
let locked = false;
function step(direction) {
  if (stage.classList.contains("is-intro")) {      /* on the entry screen, scrolling down opens the work */
    if (direction > 0) { locked = true; leaveIntro(); setTimeout(() => (locked = false), 1100); }
    return;
  }
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
  if (["ArrowDown", "ArrowRight", "PageDown", "Enter", " "].includes(e.key) && stage.classList.contains("is-intro")) { e.preventDefault(); step(1); return; }
  if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key)) { e.preventDefault(); step(1); }
  if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); step(-1); }
});

/* ---------- phone menu ---------- */
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
function setMenu(open) {
  menu.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-hidden", String(!open));
}
burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
window.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ---------- start ---------- */
updateFacts();
place();
/* Switch the animation on only after the first frame has been drawn. */
requestAnimationFrame(() => requestAnimationFrame(() => cardsEl.classList.add("is-ready")));

/* ---------- local time in the top row ---------- */
const timeEl = document.getElementById("local-time");
function tick() {
  const t = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Africa/Addis_Ababa" }).format(new Date());
  timeEl.textContent = "Addis Ababa, " + t;
}
tick();
setInterval(tick, 30000);

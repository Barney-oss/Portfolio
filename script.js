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
    side: "assets/right-blob.svg", tint: "60deg", blob: "assets/front-blob.svg",
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
    side: "assets/right-blob.svg", tint: "0deg", ph: "#e6f3ef", blob: "assets/blob-2.svg",
  },
  {
    slug: "liq-academy",
    title: "LIQ Academy",
    designedFor: "LIQ Academy (placeholder)",
    role: "Product designer",
    type: "Placeholder text for the third project. Replace this with the real project type.",
    side: "assets/left-blob.svg", tint: "150deg", ph: "#e8eef7", blob: "assets/blob-3.svg",
  },
  {
    slug: "amharic-academy",
    title: "Amharic Academy",
    designedFor: "Amharic Academy (placeholder)",
    role: "Product designer",
    type: "Placeholder text for the fourth project. Replace this with the real project type.",
    side: "assets/left-blob.svg", tint: "0deg", ph: "#f7ece4", blob: "assets/blob-4.svg",
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
  1: { x: -86.3, y: 175, w: 392, h: 393.5 },    /* upper left, bleeding off the edge */
  2: { x: 60, y: 330, w: 290, h: 250 },
  3: { x: 106.4, y: 317.4, w: 424.4, h: 370.8 },  /* lower right, bleeding off the edge */
};
const MOBILE_SHOTS = {
  back:  { x: 63,    y: 49,   w: 186.2, h: 214 },
  front: { x: 146.6, y: 98.8, w: 178.9, h: 146.6 },
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
    <div class="card__front">
      <div class="card__blob" aria-hidden="true"><img src="${p.blob}" alt=""></div>
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

/* NARDOS is drawn from the real outlines of the two typefaces (assets/glyphs.json). Hovering a letter
   blends its Antonio outline into the BBH Sans Bartle one (flubber), and back again when the cursor leaves.
   The h1 keeps aria-label="Nardos", so screen readers still read the name. */
const INK = [35, 31, 28], ORANGE = [234, 91, 12];
const MORPH_MS = 280;                                  /* how long one letter takes to change */
const easeIO = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mix = (a, b, t) => a + (b - a) * t;
let letters = [];                                      /* one state object per letter, filled in once the outlines load */
let wordSvg = null, wordK = 0.275, wordRunning = false, wordLast = 0;

function setHot(s, on) { s.target = on ? 1 : 0; runWord(); }
function heat(on) { if (!on) letters.forEach((s) => setHot(s, false)); }

function buildWord(data) {
  const NS = "http://www.w3.org/2000/svg";
  const el = (n, at = {}) => { const e = document.createElementNS(NS, n); for (const k in at) e.setAttribute(k, at[k]); return e; };
  const sizeOf = (d) => {                               /* rough size of an outline, used to pair outlines up */
    const n = (d.match(/-?\d+\.?\d*/g) || []).map(Number); let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    for (let i = 0; i + 1 < n.length; i += 2) { x0 = Math.min(x0, n[i]); x1 = Math.max(x1, n[i]); y0 = Math.min(y0, n[i + 1]); y1 = Math.max(y1, n[i + 1]); }
    return (x1 - x0) * (y1 - y0);
  };
  const rings = (g) => g.rings.map((d) => ({ d, a: sizeOf(d) })).sort((p, q) => q.a - p.a).map((r) => r.d);
  const defs = el("defs"), body = el("g"), hits = el("g");
  letters = [..."NARDOS"].map((ch) => {
    const A = data.antonio[ch], B = data.bartle[ch];
    const from = rings(A), to = rings(B);
    /* at rest the exact outline is drawn; only in between is the shape blended */
    const morphs = from.map((f, i) => {
      const m = flubber.interpolate(f, to[i], { maxSegmentLength: 5 });
      return (t) => (t <= 0.002 ? f : t >= 0.998 ? to[i] : m(t));
    });
    /* While a letter changes, a little blur-then-sharpen rounds off spiky corners. It is zero at both ends. */
    const fid = "round" + ch;
    const flt = el("filter", { id: fid, x: "-20%", y: "-20%", width: "140%", height: "140%", "color-interpolation-filters": "sRGB" });
    const blur = el("feGaussianBlur", { stdDeviation: "0" });
    flt.append(blur, el("feColorMatrix", { type: "matrix", values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" }));
    defs.appendChild(flt);
    const path = el("path", { "fill-rule": "evenodd" });
    body.appendChild(path);
    const hit = el("rect", { y: -1008, height: 1000, fill: "transparent" });
    hits.appendChild(hit);
    const s = { path, blur, fid, hit, morphs, advA: A.adv, advB: B.adv, p: 0, target: 0 };
    hit.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") setHot(s, true); });
    hit.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") setHot(s, false); });
    return s;
  });
  const totalA = letters.reduce((t, s) => t + s.advA, 0);
  /* The svg is as big as the Antonio word, one em tall, so it sits where the text used to. */
  wordSvg = el("svg", { viewBox: `${-totalA / 2} -1008 ${totalA} 1000`, "aria-hidden": "true", focusable: "false" });
  wordSvg.style.cssText = `display:block;overflow:visible;flex:none;height:1em;width:${totalA / 1000}em`;
  wordSvg.append(defs, body, hits);
  introName.appendChild(wordSvg);
  wordSvg._w = totalA;
  drawWord(0);
}

/* Draw every letter for its current progress; dt is the time since the last frame. */
function drawWord(dt) {
  const r = wordSvg.getBoundingClientRect();
  if (r.width) wordK = r.width / wordSvg._w;           /* screen pixels per drawing unit, so rounding looks the same on any screen */
  const widths = [];
  letters.forEach((s) => {
    const step = dt / MORPH_MS;
    s.p = s.target > s.p ? Math.min(s.target, s.p + step) : Math.max(s.target, s.p - step);
    const e = easeIO(s.p);
    s.path.setAttribute("d", s.morphs.map((m) => m(e)).join(" "));
    const dev = (3.2 / wordK) * Math.sin(Math.PI * e);
    if (dev * wordK > 0.25) { s.blur.setAttribute("stdDeviation", dev.toFixed(2)); s.path.setAttribute("filter", `url(#${s.fid})`); }
    else s.path.removeAttribute("filter");
    s.path.setAttribute("fill", `rgb(${INK.map((v, i) => Math.round(mix(v, ORANGE[i], e))).join(",")})`);
    widths.push(mix(s.advA, s.advB, e));
  });
  let x = -widths.reduce((a, b) => a + b, 0) / 2;       /* the word stays centred while slots change width */
  letters.forEach((s, i) => {
    s.path.setAttribute("transform", `translate(${x} 0)`);
    s.hit.setAttribute("x", x); s.hit.setAttribute("width", widths[i]);
    x += widths[i];
  });
}
function runWord() {
  if (wordRunning || !wordSvg) return;
  wordRunning = true; wordLast = performance.now();
  const tick = (now) => {
    const dt = Math.min(now - wordLast, 50); wordLast = now;
    drawWord(dt);
    if (letters.some((s) => s.p !== s.target)) requestAnimationFrame(tick);
    else wordRunning = false;
  };
  requestAnimationFrame(tick);
}

fetch("assets/glyphs.json").then((r) => r.json()).then(buildWord).then(playLetters).catch(() => {
  introName.textContent = "NARDOS";                      /* if the outlines can't load, plain text is shown instead */
});

/* Phones have no hover, so the letters play once on their own, one at a time, then rest. */
let autoplay = 0;
function playLetters() {
  if (!isPhone || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const run = ++autoplay;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  (async () => {
    await wait(700);
    for (const s of letters) {
      if (run !== autoplay || !stage.classList.contains("is-intro")) break;
      setHot(s, true);
      await wait(420);
      setHot(s, false);
      await wait(260);
    }
    letters.forEach((s) => setHot(s, false));
  })();
}

/* The phone blob is a separate drawing: if assets/phone-blob.svg exists it replaces the stand-in. */
if (isPhone) {
  const probe = new Image();
  probe.onload = () => { const img = introBlob.querySelector("img"); if (img) img.src = probe.src; };
  probe.src = "assets/phone-blob.svg";
}

const centre = (r) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });

/* Scroll away: the blob shrinks and turns into the logo blob, and NARDOS travels with it. */
function leaveIntro() {
  if (introBusy || !stage.classList.contains("is-intro")) return;
  introBusy = true;
  autoplay++;                                       /* stop the letter animation */
  heat(false);
  /* Measure everything at rest, before anything moves. */
  const logoBlob = document.querySelector(isPhone ? ".logo__blob-m" : ".logo__blob img") || document.querySelector(".logo__blob");
  const logoText = document.querySelector(".logo__text");
  const b = introBlob.getBoundingClientRect(), bt = logoBlob.getBoundingClientRect();
  const n = introName.getBoundingClientRect(), nt = logoText.getBoundingClientRect();
  const bc = centre(b), btc = centre(bt), nc = centre(n), ntc = centre(nt);
  /* The entry screen is drawn a little larger than the design (--intro-scale), so distances are
     divided by that, and the letter size ratio is measured against what is on screen. */
  const k = parseFloat(getComputedStyle(intro).getPropertyValue("--intro-scale")) || 1;
  const fontRatio = parseFloat(getComputedStyle(logoText).fontSize) / (parseFloat(getComputedStyle(introName).fontSize) * k);

  /* The blob turns a quarter turn, so its width becomes the logo's height and the other way round. */
  /* On a phone the logo is a wide pill with the name across it, so nothing needs to turn. */
  const turn = isPhone ? "" : "rotate(-90deg)";
  introBlob.style.transform =
    `translate(${(btc.x - bc.x) / k}px, ${(btc.y - bc.y) / k}px) ${turn} ` +
    (isPhone ? `scale(${bt.width / b.width}, ${bt.height / b.height})` : `scale(${bt.height / b.width}, ${bt.width / b.height})`);
  introName.style.transform =
    `translate(${(ntc.x - nc.x) / k}px, ${(ntc.y - nc.y) / k}px) ${turn} scale(${fontRatio})`;
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
  if (introBusy || stage.classList.contains("is-intro")) return;
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
if (new URLSearchParams(location.search).has("card")) {
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

/* The button's two wavy lines slide into one when the menu opens, and part again when it closes.
   Both lines are drawn with the same commands, so their numbers can simply be blended. */
const BURGER_A = "M2 4.5c4-2.2 7 2.2 11 0s7 2.2 11 0 4-1.2 6-.4";
const BURGER_B = "M3 14c4-2 6.5 2 10.5 0s7 2 11 0 3.5-1.2 5.5-.3";
const nums = (d) => d.match(/-?\d*\.?\d+/g).map(Number);
const lineA = nums(BURGER_A), lineB = nums(BURGER_B);
const lineOne = lineA.map((v, i) => (v + lineB[i]) / 2);          /* the single line they meet in */
const tpl = BURGER_A.replace(/-?\d*\.?\d+/g, "#");
const drawLine = (vals) => { let k = 0; return tpl.replace(/#/g, () => +vals[k++].toFixed(2)); };
const burgerA = document.getElementById("burger-a"), burgerB = document.getElementById("burger-b");
let burgerT = 0, burgerGoal = 0, burgerRaf = 0;
function burgerFrame(now, last) {
  const dt = last ? now - last : 16;
  burgerT += Math.sign(burgerGoal - burgerT) * Math.min(Math.abs(burgerGoal - burgerT), dt / 380);
  const e = burgerT < .5 ? 4 * burgerT ** 3 : 1 - (-2 * burgerT + 2) ** 3 / 2;
  burgerA.setAttribute("d", drawLine(lineA.map((v, i) => v + (lineOne[i] - v) * e)));
  burgerB.setAttribute("d", drawLine(lineB.map((v, i) => v + (lineOne[i] - v) * e)));
  burgerRaf = burgerT !== burgerGoal ? requestAnimationFrame((t) => burgerFrame(t, now)) : 0;
}
function morphBurger(toOne) {
  burgerGoal = toOne ? 1 : 0;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) burgerT = burgerGoal;
  if (!burgerRaf) burgerRaf = requestAnimationFrame((t) => burgerFrame(t, 0));
}

function setMenu(open) {
  menu.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-hidden", String(!open));
  morphBurger(open);
}
burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
menu.addEventListener("click", (e) => { if (e.target.closest("a") || !e.target.closest("ul, .menu__blob")) setMenu(false); });
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

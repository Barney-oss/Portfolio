/* The orange wash: a blob that covers the page while something changes underneath.
   - Wash.sweep(dir, change)   between chapters: a band rises (dir 1) or falls (dir -1); change() runs while it covers the screen.
   - Wash.go(url, x, y)        between pages: a blob grows from (x, y) over the page; the next page opens already covered and
                               shrinks it back to the same spot.
   Loaded in the <head> of every page, so the next page can start covered before anything is drawn. */
(() => {
  const root = document.documentElement;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ORANGE = "#F8E9DB", DEEP = "#F2B48C";   /* the site's own apricot cream, with a soft peach-orange leading edge */
  const NS = "http://www.w3.org/2000/svg";

  const style = document.createElement("style");
  style.textContent =
    ".wash{position:fixed;inset:0;z-index:2147483000;pointer-events:none;overflow:hidden;visibility:hidden}" +
    ".wash.on{visibility:visible}.wash svg{position:absolute;display:block;will-change:transform}" +
    ".washing .chapter,.washing .chapter.is-active{transition:none!important}";
  root.appendChild(style);

  /* a hand-drawn looking round blob (radii wobble), as a smooth closed path */
  const blobPath = (() => {
    const R = [95, 90, 86, 92, 99, 94, 88, 91];
    const pts = R.map((r, i) => { const a = (i / R.length) * Math.PI * 2; return [100 + r * Math.cos(a), 100 + r * Math.sin(a)]; });
    const n = pts.length; let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d + "Z";
  })();
  const BLOB_MIN = 82;                                   /* the smallest radius of that drawing, in its 200 x 200 box */
  const bandPath = "M0,12C15,0 30,18 50,8S85,0 100,10L100,238C85,250 70,232 50,242S15,248 0,238Z";

  const el = document.createElement("div"); el.className = "wash"; el.setAttribute("aria-hidden", "true");
  const mk = (viewBox, d, fill, aspect) => {
    const s = document.createElementNS(NS, "svg"); s.setAttribute("viewBox", viewBox);
    if (aspect) s.setAttribute("preserveAspectRatio", aspect);
    const p = document.createElementNS(NS, "path"); p.setAttribute("d", d); p.setAttribute("fill", fill); s.appendChild(p); el.appendChild(s); return s;
  };
  const deepBlob = mk("0 0 200 200", blobPath, DEEP), mainBlob = mk("0 0 200 200", blobPath, ORANGE);
  const deepBand = mk("0 0 100 250", bandPath, DEEP, "none"), mainBand = mk("0 0 100 250", bandPath, ORANGE, "none");
  root.appendChild(el);
  const all = [deepBlob, mainBlob, deepBand, mainBand];
  const setShown = (list) => all.forEach((s) => (s.style.display = list.includes(s) ? "block" : "none"));

  const ease = "cubic-bezier(.65,0,.25,1)";
  const run = (node, keys, opt) => node.animate(keys, { fill: "forwards", easing: ease, ...opt }).finished;

  /* ---- a blob growing from / shrinking to a point ---- */
  const place = (x, y) => {
    setShown([deepBlob, mainBlob]);
    [deepBlob, mainBlob].forEach((s) => { s.style.width = s.style.height = "200px"; s.style.left = x - 100 + "px"; s.style.top = y - 100 + "px"; s.style.transformOrigin = "50% 50%"; });
    const far = Math.max(Math.hypot(x, y), Math.hypot(innerWidth - x, y), Math.hypot(x, innerHeight - y), Math.hypot(innerWidth - x, innerHeight - y));
    return (far / BLOB_MIN) * 1.06;                      /* the scale at which it covers the whole window */
  };
  const sc = (k) => `scale(${k})`;
  async function grow(x, y, ms) {
    const full = place(x, y); el.classList.add("on");
    await Promise.all([run(deepBlob, [{ transform: sc(0.02) }, { transform: sc(full) }], { duration: ms }),
                       run(mainBlob, [{ transform: sc(0.02) }, { transform: sc(full) }], { duration: ms, delay: 60 })]);
  }
  async function shrink(x, y, ms) {
    const full = place(x, y); el.classList.add("on");
    await Promise.all([run(mainBlob, [{ transform: sc(full) }, { transform: sc(0.02) }], { duration: ms }),
                       run(deepBlob, [{ transform: sc(full) }, { transform: sc(0.02) }], { duration: ms, delay: 60 })]);
    el.classList.remove("on");
  }
  const coverNow = (x, y) => { const full = place(x, y); el.classList.add("on"); [deepBlob, mainBlob].forEach((s) => (s.style.transform = sc(full))); };

  /* ---- a band sweeping across, for chapter changes ---- */
  let sweeping = false;
  async function sweep(dir, change) {
    if (still || sweeping) { change(); return; }
    sweeping = true; root.classList.add("washing");
    const H = innerHeight, d = dir > 0 ? 1 : -1;
    [deepBand, mainBand].forEach((s) => { s.style.width = "104vw"; s.style.left = "-2vw"; s.style.top = "0"; s.style.height = "250vh"; });
    setShown([deepBand, mainBand]); el.classList.add("on");
    const start = d > 0 ? H : -2.5 * H, mid = -0.75 * H, end = d > 0 ? -2.5 * H : H;
    const lead = -d * 0.12 * H;                           /* the darker edge goes a little ahead of the main band */
    const T = (y) => `translateY(${y}px)`;
    const cover = (s, off, delay) => run(s, [{ transform: T(start + off) }, { transform: T(mid + off) }], { duration: 260, delay, easing: "cubic-bezier(.55,.05,.7,.45)" });
    const open = (s, off, delay) => run(s, [{ transform: T(mid + off) }, { transform: T(end + off) }], { duration: 300, delay, easing: "cubic-bezier(.3,.55,.35,1)" });
    await Promise.all([cover(deepBand, lead, 0), cover(mainBand, 0, 70)]);
    change();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await Promise.all([open(mainBand, 0, 0), open(deepBand, lead, 70)]);
    el.classList.remove("on"); root.classList.remove("washing"); sweeping = false;
  }

  /* ---- between pages ---- */
  const KEY = "wash";
  let leaving = false;
  async function go(url, x, y) {
    if (still || leaving) { location.href = url; return; }
    leaving = true;
    try { sessionStorage.setItem(KEY, JSON.stringify({ x, y })); } catch (e) {}
    try { await grow(x, y, 380); } catch (e) {}
    location.href = url;
  }

  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || (u.pathname === location.pathname && u.search === location.search)) return;
    e.preventDefault();
    const r = a.getBoundingClientRect();
    const nav = a.matches(".nav__link, .menu__link");     /* menu links: the orange dot beside the word is where it starts */
    go(u.href, nav ? r.left + 10 : r.left + r.width / 2, r.top + r.height / 2);
  });

  /* arriving: if the last page covered the screen, start covered and open from the same spot */
  let arrival = null;
  try { arrival = JSON.parse(sessionStorage.getItem(KEY) || "null"); sessionStorage.removeItem(KEY); } catch (e) {}
  if (arrival && !still) {
    coverNow(arrival.x, arrival.y);
    /* Open as soon as the page itself is built. Fonts are not waited for (they swap in when they arrive). Pictures that are
       already in view get a short moment, at most 400 ms, so they do not pop in under the opening blob. */
    const built = new Promise((r) => (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", r) : r()));
    /* Open as soon as the page is built, or after 450 ms at the latest, whichever comes first. Pictures are not waited for. */
    Promise.race([built, new Promise((r) => setTimeout(r, 450))])
      .then(() => requestAnimationFrame(() => shrink(arrival.x, arrival.y, 420)));
    setTimeout(() => el.classList.remove("on"), 1800);   /* never leave the page covered */
  }
  /* coming back with the browser's back button must not show a covered page */
  addEventListener("pageshow", (e) => { if (e.persisted) { leaving = false; el.classList.remove("on"); root.classList.remove("washing"); } });

  /* "Work" opens the project you looked at last (or the first one); "Home" returns to the work screen, on that project's card */
  const fixLinks = () => {
    let last = null; try { last = localStorage.getItem("lastProject"); } catch (e) {}
    if (!/^[a-z-]+$/.test(last || "")) last = null;
    document.querySelectorAll("a[data-work]").forEach((a) => (a.href = last || "agristelle"));
    document.querySelectorAll("a[data-home]").forEach((a) => (a.href = last ? "./?card=" + last : "./?work"));
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fixLinks); else fixLinks();

  window.Wash = { sweep, go };
})();

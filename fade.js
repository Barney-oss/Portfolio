/* The page transitions: the things on the screen fade out one by one, then the next ones fade in one by one.
   - Fade.swap(change)   between chapters on a project page: the chapter's pieces fade out, change() swaps the chapter, the new pieces fade in.
   - Fade.go(url)        between pages: the pieces fade out, the next page loads and fades its own pieces in.
   Loaded in the <head> of every page, so the next page can hide its pieces before anything is drawn.
   The logo, the nav, the Back to home link and the small labels stay where they are. */
(() => {
  const root = document.documentElement;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* what fades: the pieces of each kind of page */
  const SEL = [
    ".canvas .cards", ".canvas .fact", ".counter",                       /* the work screen */
    "main .in > :not(.text):not(.media)", "main .text > *", "main .media > *",   /* About, Say hi and the project chapters */
  ];
  const ALL = SEL.join(",");

  const OUT = { ms: 180, step: 50, total: 170, move: "0 -8px" };
  const IN  = { ms: 380, step: 70, total: 230, move: "0 10px" };

  const style = document.createElement("style");
  style.textContent =
    "html.fade-pre :is(" + ALL + "){opacity:0!important}" +        /* until the new page has set up its own fade-in */
    "html.fading .chapter, html.fading .chapter.is-active{transition:none!important}";
  root.appendChild(style);

  /* the pieces that are on the screen now, in reading order */
  const pieces = () => {
    const list = [...new Set(document.querySelectorAll(ALL))].filter((el) =>
      !el.closest(".chapter:not(.is-active)") && el.getClientRects().length && getComputedStyle(el).visibility !== "hidden");
    const key = (el) => { const r = el.getBoundingClientRect(); return r.top + r.left * 0.35; };
    return list.sort((a, b) => key(a) - key(b));
  };
  const seen = () => pieces().filter((el) => parseFloat(getComputedStyle(el).opacity) > 0.01);

  const fadeOut = (list) => {
    const step = Math.min(OUT.step, OUT.total / Math.max(list.length, 1));
    const anims = list.map((el, i) => el.animate(
      [{ opacity: 1, translate: "0 0" }, { opacity: 0, translate: OUT.move }],
      { duration: OUT.ms, delay: i * step, easing: "ease-in", fill: "forwards" }));
    return { anims, done: Promise.all(anims.map((a) => a.finished.catch(() => {}))) };
  };
  const fadeIn = (list) => {
    const step = Math.min(IN.step, IN.total / Math.max(list.length, 1));
    return Promise.all(list.map((el, i) => el.animate(
      [{ opacity: 0, translate: IN.move }, { opacity: 1, translate: "0 0" }],
      { duration: IN.ms, delay: i * step, easing: "cubic-bezier(.2,.7,.3,1)", fill: "backwards" }).finished.catch(() => {})));
  };

  /* ---- between chapters ---- */
  let swapping = false;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  async function swap(change) {
    if (still) { change(); return; }
    if (swapping) return;
    swapping = true; root.classList.add("fading");
    try {
      const out = fadeOut(seen());
      await Promise.race([out.done, wait(900)]);           /* never wait forever for an animation that did not report back */
      change();
      out.anims.forEach((a) => a.cancel());                /* the old chapter must come back whole if it is visited again */
      await Promise.race([fadeIn(pieces()), wait(1400)]);  /* started in the same frame as the change, so nothing flashes */
    } finally {
      root.classList.remove("fading"); swapping = false;
      /* Whatever happened, the chapter on screen must end up fully visible: drop every leftover fade. */
      document.getAnimations().forEach((a) => { const t = a.effect && a.effect.target; if (t && t.closest && t.closest(".chapter")) a.cancel(); });
    }
  }

  /* ---- between pages ---- */
  const KEY = "fade";
  let leaving = false;
  async function go(url) {
    if (still || leaving) { location.href = url; return; }
    leaving = true;
    const list = seen();
    if (!list.length) { location.href = url; return; }
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
    await fadeOut(list).done;
    location.href = url;
  }

  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || (u.pathname === location.pathname && u.search === location.search)) return;
    e.preventDefault();
    go(u.href);
  });

  /* arriving: if the last page faded out, hide this page's pieces until they can fade in */
  let arriving = false;
  try { arriving = !!sessionStorage.getItem(KEY); sessionStorage.removeItem(KEY); } catch (e) {}
  if (arriving && !still) {
    root.classList.add("fade-pre");
    const start = () => {
      const list = document.querySelector(".stage.is-intro") ? [] : pieces();   /* the entry screen has its own opening */
      fadeIn(list);                                         /* the animations hold each piece at 0 until its turn ... */
      root.classList.remove("fade-pre");                    /* ... so the guard can go in the same moment */
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
    setTimeout(() => root.classList.remove("fade-pre"), 2000);   /* never leave the page hidden */
  }
  /* coming back with the browser's back button must show the page whole */
  addEventListener("pageshow", (e) => { if (e.persisted) { leaving = false; root.classList.remove("fade-pre", "fading"); document.getAnimations().forEach((a) => a.cancel()); } });

  /* "Home" returns to the work screen, on that project's card */
  const fixLinks = () => {
    let last = null; try { last = localStorage.getItem("lastProject"); } catch (e) {}
    if (!/^[a-z-]+$/.test(last || "")) last = null;
    document.querySelectorAll("a[data-home]").forEach((a) => (a.href = last ? "./?card=" + last : "./?work"));
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fixLinks); else fixLinks();

  window.Fade = { swap, go };
})();

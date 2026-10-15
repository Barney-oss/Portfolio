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


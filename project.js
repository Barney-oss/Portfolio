/* Edit the text and images for each project here.
   Every project lists its own chapters: a title, one or two paragraphs, and images with captions.
   overlap: true puts two images on top of each other. */
const LOREM = "Placeholder text. Replace with the real story for this chapter: a few short sentences, not a wall of text.";
const SOON = ["Overview", "The problem", "The process", "The result"].map(t => ({ title: t, body: [LOREM, LOREM], images: [{ src: null }] }));
const PROJECTS = {
  "agristelle": {
    name: "Agristelle", role: "Product designer", forWho: "Agristelle farm stays", type: "Booking platform · Web",
    timeline: "3 months", team: "2 designers, 5 others",
    chapters: [
      { title: "Agristelle", big: true,
        body: ["A booking platform for agriturismi, the working farms in the Italian countryside that rent out a few rooms. I designed the hero of the public site, its type and colour balance, the admin panel and the host panel.",
               "It was a three-month project in a team of seven: two designers, a backend developer, a front-end developer, a project manager, a QA tester and a tech lead. My feedback came from the other designer and the tech lead."],
        images: [{ src: "assets/web-agristelle-overview.webp", bare: true, alt: "Agristelle admin panel and host panel on laptop and phone", caption: "" }] },
      { title: "The problem",
        body: ["The old site looked outdated, and the client wanted a modern look. Behind it, the admin panel was Django's default: dense, hard to read, and hard to act on. The host panel was just as cluttered.",
               "The Django admin panel turned out to be the heaviest part of the project: close to two of the three months went into it."],
        images: [{ src: "assets/web-agristelle-the-problem.png", alt: "The Django admin panel before", caption: "Before: Django's default admin panel." }] },
      { title: "The admin panel",
        body: ["Most of the data was hidden behind tables. The front was dense, with no icons or colour and no clear sign of progress where data was entered. Everything sat on one scrollable page, with nothing to show where one group of data ended and the next began.",
               "I grouped the information and put the team's main jobs first: approving hosts, listed properties and disputes. The three newest hosts waiting for approval now stand out, in urgent colours, big numbers and icons."],
        images: [{ video: "assets/web-agristelle-the-admin-panel.mp4", src: "assets/web-agristelle-the-admin-panel.png", alt: "Agristelle admin panel", caption: "Grouped information instead of one long page." }] },
      { title: "The public site",
        body: ["A visitor comes to look at Italian farm stays, so the first thing they see is one. The hero is a full-width image of an agriturismo, with a search bar and a headline over it. I chose an image over a video because the site has to load fast.",
               "I also chose the typeface and the balance of colour, based on the brand's own colours. The rest of the public site was designed by the second designer on the team."],
        images: [{ src: "assets/web-agristelle-the-public-site.png", alt: "Agristelle hero", caption: "The hero: one farm stay, one search bar." }] },
      { title: "The host panel",
        body: ["Hosts use it to list and manage their properties, answer booking requests and keep their calendar up to date, which shows when each farm is available.",
               "For hosts with several properties it is one place to see them all. It was cluttered too, so I organised it the same way as the admin panel. The panel and the hero took close to a month together."],
        images: [{ src: "assets/web-agristelle-the-host-panel.png", alt: "Agristelle host panel", caption: "All of a host's properties in one place." }] },
      { title: "What's next",
        body: ["The site isn't live yet; some backend work remains.<br>The host panel on mobile still needs a design of its own, and time and budget didn't allow it. That's the first thing I'd do with more time."],
        images: [] },
    ],
  },
  "genier": {
    name: "Genier", role: "Product designer", forWho: "Genier", type: "Inspection app \u00b7 Mobile",
    timeline: "3 weeks", team: "Sole designer",
    chapters: [
      { title: "Genier", big: true,
        body: ["A machinery inspection app. Inspectors work through an inspection in it, and the reports that come out the other end help a business keep its equipment safe and inside the safety regulations.",
               "It was a redesign. The app already existed and did its job, it just looked bleak. I rebuilt how it looks, drew the icon set it never had, added a light theme to the dark one it was already built around, and designed two things that were missing altogether."],
        images: [{ src: "assets/web-genier-overview.webp", bare: true, alt: "The home screen and an inspection step", caption: "" }] },
      { title: "Before",
        body: ["Three things did most of the damage: the typeface, the shapes, and the complete absence of iconography. Plain text in plain boxes, with nothing to tell one kind of thing from another at a glance.",
               "Fixing those three is what a redesign is usually asked to do. It is not where I stopped, because two things were missing as well as plain."],
        images: [{ src: "assets/web-genier-before.webp", bare: true, alt: "Two screens from the old design", caption: "The design I was given." }] },
      { title: "The home screen",
        body: ["Opening the app put you straight into an inspection. There was no front door: nowhere to see what was waiting, nowhere to see what you had finished, nowhere to decide what to do next.",
               "So I designed one. It holds a button to start a new inspection, a search bar for finding a particular machine, and a way into the archive of inspections already done. Starting, finding and looking back: most of what anyone opens the app to do."],
        images: [{ src: "assets/web-genier-the-home-screen.webp", bare: true, alt: "The home screen, and choosing a machine", caption: "A front door: start, search, look back." }] },
      { title: "Where you are",
        body: ["An inspection runs in steps, and the app gave no sign of which one you were on. That matters in the field, where a job gets picked up and put down, and an inspector needs to know what is left before they can finish.",
               "I put a bar across the top of the page. It stays there for the whole inspection, so the answer to how much is left is always in the same place, and nobody has to go looking for it."],
        images: [{ src: "assets/web-genier-where-you-are.webp", bare: true, alt: "An inspection step with the progress bar", caption: "The bar sits at the top, all the way through." }] },
      { title: "Light and dark",
        body: ["The app was orange on a dark background, and I kept it that way. It suits the product, and it was already what the client knew.",
               "I added a light theme alongside it, because an inspection often happens outside, and a dark screen in daylight is hard to read."],
        images: [{ src: "assets/web-genier-light-and-dark.webp", bare: true, alt: "The home screen in the light theme and the dark theme", caption: "The same screen, both themes." }] },
      { title: "What happened",
        body: ["The client loved the redesign and it went live.",
               "It is not live now. The business behind it stopped, and the app came down with it."],
        images: [] },
    ],
  },
  "liq-academy": {
    name: "LIQ Academy", role: "Product designer", forWho: "LIQ Academy", type: "Study app \u00b7 Mobile",
    timeline: "1 month", team: "Sole designer",
    chapters: [
      { title: "LIQ Academy", big: true,
        body: ["A study platform for Ethiopian high school students preparing for the university entrance exam. It holds lessons recorded by teachers, and past exam questions with the explanations that go with them.",
               "It was a client project and I was the designer on it. The content already existed. The structure did not, so I decided how a lesson is shown and how years of past exams are grouped and organised."],
        images: [{ src: "assets/web-liq-overview.webp?v=2", bare: true, alt: "A lesson, the exam cards and a question", caption: "" }] },
      { title: "The problem",
        body: ["The client had the material: lessons from teachers, and years of entrance exam questions with their answers explained. What they had no shape for was the rest. Nothing decided how a student reaches a lesson, or how hundreds of past questions are grouped so they can actually be worked through.",
               "The platform comes down to two things: a place to watch a lesson, and a place to sit an exam. I designed both. Before starting I looked at other platforms in the same field, to see what already worked for students."],
        images: [] },
      { title: "The lessons",
        body: ["A lesson is a video from a teacher. Under it sit the two things a student reaches for next: the teacher\u2019s notes for that lesson, and the videos that follow it.",
               "Both stay on the lesson screen, so a student never has to leave the lesson to find either one. The notes open where they are, and when a video ends the next one is already in front of them."],
        images: [{ src: "assets/web-liq-the-lessons.webp", bare: true, alt: "A unit\u2019s lessons, and a lesson playing", caption: "The notes and the next videos stay with the lesson." }] },
      { title: "The exam cards",
        body: ["Past exams are organised by year, and each year sits on its own card. That card took longer than anything else in the project. It has to carry the information a student needs in order to choose, and it still has to look like something worth tapping.",
               "The card shows the year, how much of that exam the student has finished, when they last practised it, how many questions it holds and how long they are given. Five things on one small card without it turning into a table: that is what took the time, and it is the piece of this project I am most pleased with."],
        images: [{ src: "assets/web-liq-the-exam-cards.webp", bare: true, alt: "Exams by year, and the same exams by chapter", caption: "By year, or by chapter." }] },
      { title: "Colour by subject",
        body: ["The brand has one colour. Using it for every subject would have left them all looking the same, and a student scanning for physics would have to read every label to find it.",
               "So I argued for a colour of its own for each subject, and the client agreed. I chose muted pastels: quiet enough to sit under the brand colour, separate enough that a subject is recognisable at a glance."],
        images: [{ src: "assets/web-liq-colour-by-subject.webp", bare: true, alt: "The same screen in three subject colours", caption: "The same screen, three subjects." }] },
      { title: "What\u2019s next",
        body: ["None of it is live yet. The lessons and the exams sit in the same app as the client\u2019s other products, and those are waiting too.",
               "With more time and budget I would redesign the rest of that app, the home screen above all, so the whole thing holds together the way these two parts do."],
        images: [] },
    ],
  },
  "amharic-academy": {
    name: "Amharic Academy", role: "Product designer", forWho: "Amharic Academy", type: "Learning app \u00b7 Android",
    timeline: "3 weeks", team: "Sole designer",
    chapters: [
      { title: "Amharic Academy", big: true,
        body: ["An Amharic learning app for the diaspora, built around stories, real dialogues and immersion. It is live on the Play Store. I was the only designer on it, and I designed all of it: the learning path, the alphabet course, the practice exercises and every screen around them.",
               "The client gave me three weeks and a page of bullet points. I spent the first of those weeks on the experience architecture and the wireframes, unpaid, because without them the two paid weeks would not have been enough."],
        images: [{ src: "assets/web-amharic-overview.webp?v=2", bare: true, alt: "The home screen, the alphabet hub and the pattern lab", caption: "" }] },
      { title: "The problem",
        body: ["The brief was a list of bullet points, and they were vague. There was nothing to design against: no map of how a learner moves through the app, and no agreement on what a lesson even was.",
               "I didn't look at other Amharic apps. I was fairly sure they wouldn't have the interaction design I was after. My reference was Duolingo, which I use every day: the content is structured and paced well, and the feedback is strong. I looked at Drops too, for the way it handles flashcards."],
        images: [{ src: "assets/web-amharic-the-problem.webp", bare: true, alt: "The original brief", caption: "The brief: a list of features, and little else." }] },
      { title: "The wireframes",
        body: ["Three weeks is not long enough to work out the structure while drawing finished screens. So I asked for the first week to think instead, and I worked it unpaid: the experience architecture first, then more than fifty pages of wireframes: every screen, every state, and how a learner gets from one to the next.",
               "It meant the client could see the app before it existed and argue with it cheaply. By the time I opened the real file almost nothing was still an open question, and two weeks was enough to design all of it."],
        images: [{ video: "assets/web-amharic-the-wireframes.mp4", src: "assets/web-amharic-the-wireframes.webp", alt: "The wireframe canvas", caption: "Fifty-plus pages, drawn in the first week." }] },
      { title: "The learning path",
        body: ["The home screen is where most of the learning happens, through a dialogue, a story or a piece of grammar. I designed it as a path: a lesson opens only once the one before it is finished, so a learner always knows where they are and what comes next.",
               "The client wanted every lesson to carry a label and a button saying finished, review this, or start. I argued for states instead. The lesson to practise now is the biggest, brightest thing on the screen; lessons not yet reached are greyed out and locked; finished ones stay open, so a review button has nothing left to do. That is what shipped."],
        images: [{ src: "assets/web-amharic-the-learning-path.webp?v=2", bare: true, alt: "The learning path, a story lesson and a dialogue lesson", caption: "One lesson opens when the one before it is done." }] },
      { title: "The alphabet hub",
        body: ["The Amharic script has 35 parent letters. The alphabet hub is where a learner meets them and the sounds they make.",
               "Colour carries the state. Green, the brand colour, for letters already studied; a glowing yellow outline for the one being studied now; grey for the letters not yet reached. One glance tells a learner how far into the alphabet they are."],
        images: [{ src: "assets/web-amharic-the-alphabet-hub.webp?v=2", bare: true, alt: "The alphabet hub and a letter opened", caption: "Studied, studying, not yet reached." }] },
      { title: "The pattern lab",
        body: ["Each of the 35 parent letters has six further forms, one for each vowel sound. This part wasn't in the original brief, so I had no wireframes for it, and it arrived once the design was already under way: an exercise where learners match each form to its parent letter.",
               "The forms don't all follow one rule. The letters fall into groups, each changing in its own way, so I had to understand the groups before I could design for them, then find one layout that held for every group. It was the hardest thing I designed on this project. The logic from the alphabet hub carried over: whatever is selected is the largest and the strongest thing on the screen."],
        images: [{ src: "assets/web-amharic-the-pattern-lab.webp?v=2", bare: true, alt: "The pattern lab before and after a match", caption: "Matching each form to its parent letter." }] },
      { title: "The result",
        body: ["The app is live on the Play Store, rated 5.0.",
               "One of the reviews says the part they especially love is \u201cthe timeline that helps me feel confident in what to tackle next\u201d. That timeline is the learning path, the piece I had to argue for.",
               "What I take from it is the first week. Three weeks was only possible because the architecture and the wireframes came first, and I would argue for that week again on any project this short."],
        images: [{ src: "assets/web-amharic-the-result.webp?v=2", bare: true, alt: "Reviews on the Play Store", caption: "What people wrote once it shipped." }] },
    ],
  },
  "ribkas-portfolio": {
    name: "Ribka's portfolio", role: "Product designer", forWho: "Ribka, a computer science student", type: "Portfolio site · Web",
    timeline: "TIMELINE?", team: "Me designing, Ribka building",
    chapters: [
      { title: "Ribka’s portfolio", big: true,
        body: ["A portfolio site for my sister, a third-year computer science student who needs it for internship applications. I designed it and set up the Figma file for handoff. Ribka built it herself in React.",
               "The first part is live. The rest is still being built."],
        images: [{ src: "assets/web-ribka-overview.webp", bare: true, alt: "The home screen of Ribka’s portfolio on a laptop and a phone", caption: "" }] },
      { title: "The brief",
        body: ["Her brief was “design it how you want”, which was the hardest part. There was no direction to react to, so I wrote my own brief from a short set of questions about her projects, her goals and her taste.",
               "Then I kept going back to her with specific questions as I designed: what she built herself, which tools she actually uses, when she could start. Those answers changed the design more than any reference did."],
        images: [] },
      { title: "Editorial design as the starting point",
        body: ["Before settling on a direction I studied developer portfolios. Most of them look alike: dark backgrounds, gradient text, rounded cards and grids of logos. I wanted Ribka’s site to read more like a well-made publication, so I built a moodboard from editorial design: magazine layouts, type foundry sites and engineering-minded brands that rely on strong grids, thin rules, white space and confident typography instead of decoration.",
               "I took the look of editorial design, not its rules. I didn’t need long reading columns or a serif typeface. I wanted its discipline: no rounded corners, no shadows, lines doing the separating, and type doing the talking."],
        images: [{ src: "assets/web-ribka-moodboard.webp", alt: "The editorial moodboard with my notes", caption: "The moodboard: grids, thin rules and confident type." }] },
      { title: "Drawn like a technical sheet",
        body: ["While building the moodboard I noticed that the editorial references I liked most shared something with technical drawings: grids, construction lines, labels and numbering.",
               "That overlap became the concept for the whole site: editorial structure, drawn like a technical sheet."],
        images: [{ src: "assets/web-ribka-technical-sheet.webp", alt: "The stack and about sections, drawn on a grid with labels", caption: "Grids, construction lines, labels and numbers." }] },
      { title: "Color only on interaction",
        body: ["The site is black, white and gray by default. Color appears only when someone engages: project screenshots and her portrait turn from gray to color on hover, and construction lines turn blue.",
               "It had a practical reason too. JobFeed’s interface is busy, and in grayscale it calms down into one clean block, then comes alive when you hover."],
        images: [{ video: "assets/web-ribka-color-on-hover.mp4", src: "assets/web-ribka-color-on-hover.webp", alt: "Her portrait turning from gray to color on hover", caption: "Gray at rest, color on hover." }] },
      { title: "One blue square",
        body: ["The dot on the “ı” in her name, the period ending each heading, the marker on the active nav link and the “Open to internships” status all use the same small blue square.",
               "One mark, repeated with purpose, ties the whole site together."],
        images: [{ src: "assets/web-ribka-blue-square.webp", alt: "The blue square in the headline, her name and the internship status", caption: "One small blue square, used everywhere." }] },
      { title: "The handoff",
        body: ["I set up colors, type and spacing as Figma variables and text styles named the way she would name them in code. A variable like color/accent maps directly to --color-accent in her CSS.",
               "It worked as planned: the variables and styles carried straight into her code."],
        images: [{ src: "assets/web-ribka-handoff.webp", alt: "The color variables in Figma", caption: "The colors as Figma variables, named the way she names them in code." }] },
      { title: "What I learned",
        body: ["When a client says “do what you want”, the brief is still in there. You get it by asking specific questions. And content decides design: the most important choices on this site came from her answers, not from my moodboard.",
               "Next, the rest of the site goes live as Ribka finishes building it."],
        images: [] },
    ],
  },
  "this-site": {
    name: "How I built this site", noFacts: true,
    chapters: [
      { title: "Coming soon", big: true, body: [], images: [] },
    ],
  },
};
const slug = document.body.dataset.project || new URLSearchParams(location.search).get("p");
const p = PROJECTS[slug] || PROJECTS["agristelle"];
document.title = p.name + " \u00b7 Nardos";
try { if (PROJECTS[slug] && slug !== "this-site") localStorage.setItem("lastProject", slug); } catch (e) {}
const homeLink = document.querySelector("a[data-home]"); if (homeLink) homeLink.href = "./" + (PROJECTS[slug] ? "?card=" + slug : "?work");

const chapters = p.chapters.map((c, i) => ({ ...c, first: i === 0 }));
/* An image can also carry a short silent video: { video: "assets/clip.mp4", src: "assets/still.png" }.
   src is the still shown until the video loads, and the only thing shown if the visitor prefers reduced motion. */
const fig = (im) => `<figure class="fig">${im.video
  ? `<video class="shot" data-video="${im.video}" ${im.src ? `poster="${im.src}"` : ""} muted loop playsinline preload="none" aria-label="${im.alt || ""}"></video>`
  : im.src
  ? `<img class="shot${im.bare ? " shot--bare" : ""}" src="${im.src}" alt="${im.alt || ""}">`
  : `<div class="shot shot--ph">Screenshot goes here</div>`}${im.caption ? `<figcaption>${im.caption}</figcaption>` : ""}</figure>`;
const root = document.getElementById("chapters");
const dots = document.getElementById("dots");
chapters.forEach((c, i) => {
  const sec = document.createElement("section");
  sec.className = "chapter"; sec.id = "c" + i;
  const facts = c.first && !p.noFacts ? `<div class="facts"><div><b>Role</b>${p.role}</div>${p.timeline ? `<div><b>Timeline</b>${p.timeline}</div>` : ""}${p.team ? `<div><b>Team</b>${p.team}</div>` : ""}<div><b>Type</b>${p.type}</div></div>` : "";
  const imgs = c.images || [{ src: null }];
  if (!imgs.length) sec.classList.add("chapter--text");
  sec.innerHTML = `<div class="chapter__in">
    <div class="text">
      <div class="pill"><img src="assets/chapter-blob.svg" alt="">${c.first ? `<h1>${c.title}</h1>` : `<h2>${c.title}</h2>`}</div>
      ${[].concat(c.body).map(t => `<p>${t}</p>`).join("")}${facts}
    </div>
    ${imgs.length ? `<div class="media">${imgs.map(fig).join("")}</div>` : ""}</div>`;
  root.appendChild(sec);
  const d = document.createElement("a"); d.href = "#c" + i; d.setAttribute("aria-label", c.title); d.addEventListener("click", (e) => { e.preventDefault(); goTo(i); }); dots.appendChild(d);
});
if (chapters.length < 2) dots.style.display = "none";   /* one chapter needs no dots */
const timeEl = document.getElementById("local-time");
const tick = () => { timeEl.textContent = "Addis Ababa, " + new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Africa/Addis_Ababa" }).format(new Date()); };
tick(); setInterval(tick, 30000);
/* The pager: exactly one chapter is on screen. Wheel, swipe, arrow keys and the dots all change chapter;
   if a chapter is taller than the window it scrolls inside itself first. */
const secs = [...document.querySelectorAll(".chapter")];
let cur = -1, busy = false, rel;
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
/* Videos load and play only while their chapter is on screen, and pause when it leaves. */
function playVideos(active) {
  secs.forEach((el, k) => el.querySelectorAll("video").forEach((v) => {
    if (k !== active) { v.pause(); return; }
    if (still) return;
    if (!v.src) {
      v.addEventListener("error", () => { if (!v.poster) v.replaceWith(Object.assign(document.createElement("div"), { className: "shot shot--ph", textContent: "Screenshot goes here" })); }, { once: true });
      v.src = v.dataset.video;
    }
    v.play().catch(() => {});
  }));
}
function show(i) {
  cur = i;
  secs.forEach((el, k) => el.classList.toggle("is-active", k === i));
  [...dots.children].forEach((d, k) => d.classList.toggle("on", k === i));
  document.getElementById("cue").classList.toggle("hide", i === secs.length - 1);
  secs[i].scrollTop = 0;
  playVideos(i);
  try { history.replaceState(null, "", "#c" + i); } catch (e) {}
}
/* Every request for a chapter is kept: the page moves to the latest one asked for, one fade at a time, so a quick second
   swipe is never thrown away. */
let want = -1, moving = false;
async function run() {
  moving = true;
  while (want !== cur) {
    const target = want;
    if (still || !window.Fade) show(target); else await Fade.swap(() => show(target));
    if (cur !== target) show(target);                  /* if the fade could not run, still arrive */
  }
  moving = false;
}
function goTo(i) {
  if (i < 0 || i >= secs.length || i === want) return;
  busy = true; clearTimeout(rel); rel = setTimeout(() => busy = false, 750);   /* only the mouse wheel looks at this */
  want = i;
  if (!moving) run();
}
const canScroll = (dir) => { const el = secs[cur]; return dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 2 : el.scrollTop > 2; };
addEventListener("wheel", (e) => {
  if (Math.abs(e.deltaY) < 3) return;
  const dir = e.deltaY > 0 ? 1 : -1;
  if (canScroll(dir) && !busy) return;           // let a tall chapter scroll itself
  e.preventDefault();
  if (busy) { clearTimeout(rel); rel = setTimeout(() => busy = false, 180); return; }
  goTo(want + dir);
}, { passive: false });
let ty = 0, tt = 0, edgeStart = 0, tdone = true;
function swipe(dy) {
  const dir = dy > 0 ? 1 : -1;
  const atEdge = dir > 0 ? (edgeStart === 1 || edgeStart === 0 && false) || !canScroll(1) && edgeStart >= 1 : !canScroll(-1) && edgeStart <= -1;
  const fits = secs[cur].scrollHeight <= secs[cur].clientHeight + 64;   /* a few pixels over is only the bottom padding: nothing is hidden, so the swipe changes chapter */
  if (fits || atEdge) goTo(want + dir);          /* from the chapter we are heading to, so quick swipes add up */
}
addEventListener("touchstart", (e) => {
  tdone = e.touches.length !== 1; tt = performance.now();
  ty = e.touches[0].clientY; const el = secs[cur]; edgeStart = (el.scrollTop <= 2 ? -1 : 0) + (el.scrollTop + el.clientHeight >= el.scrollHeight - 2 ? 1 : 0);
}, { passive: true });
addEventListener("touchmove", (e) => {       /* far enough: change chapter now, without waiting for the finger to lift */
  if (tdone) return;
  const dy = ty - e.touches[0].clientY;
  if (Math.abs(dy) > 40) { tdone = true; swipe(dy); }
}, { passive: true });
addEventListener("touchend", (e) => {
  if (tdone) return; tdone = true;
  const dy = ty - e.changedTouches[0].clientY;
  const speed = Math.abs(dy) / Math.max(performance.now() - tt, 1);
  if (Math.abs(dy) > 40 || (Math.abs(dy) > 16 && speed > 0.3)) swipe(dy);   /* a short, quick flick counts too */
}, { passive: true });
addEventListener("touchcancel", () => { tdone = true; }, { passive: true });
addEventListener("keydown", (e) => {
  if (["ArrowDown", "PageDown", " "].includes(e.key) && !canScroll(1)) { e.preventDefault(); goTo(want + 1); }
  else if (["ArrowUp", "PageUp"].includes(e.key) && !canScroll(-1)) { e.preventDefault(); goTo(want - 1); }
});
const start = /^#c(\d+)$/.exec(location.hash);
show(start && +start[1] < secs.length ? +start[1] : 0);
want = cur;

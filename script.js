const pillarContent = {
  ai: {
    number: "01",
    title: "AI Fluency",
    items: [
      "Build a functioning AI agent using Lovable",
      "Conduct an agent demonstration with a real web link",
      "Decode the environment, memory, and tokens behind AI",
      "Master the \"checklist\" of prompt engineering"
    ]
  },
  communication: {
    number: "02",
    title: "Communication",
    items: [
      "Master the 3C framework of content, connection, and charisma",
      "Deliver powerful impromptu speeches on any topic",
      "Get coaching from a national champion in public speaking",
      "Present in front of Bay Area professionals in the Shark Tank Finale"
    ]
  },
  entrepreneurship: {
    number: "03",
    title: "Entrepreneurship",
    items: [
      "Learn the four components of a successful pitch",
      "Ask the \"critical questions\" to test business viability",
      "Receive detailed mentorship from a Bay Area AI founder",
      "Compete to win awards at the Shark Tank Finale"
    ]
  }
};

const curriculum = [
  {
    title: "The Art of Persuasion",
    copy: "A National Champion in Impromptu Speaking joins the class to break down the 3Cs Framework - Content, Charisma, and Connection — and show students why great speakers need all three to move an audience. After a lightning-round Persuasion Challenge and a live Impromptu Speech Tournament, students leave class able to speak confidently on any topic with zero prep time."
  },
  {
    title: "Finding the Problem",
    copy: "Students explore the four categories every great problem falls into — community, school, home, and technology — and run each idea through the AI Opportunity Test. Through Problem Explosion brainstorming and a Problem Auction where classmates \"invest\" in the best ideas, teams form and lock in the problem they'll spend the rest of the program solving."
  },
  {
    title: "Building the Business Model",
    copy: "A tech founder who has built an eight-figure company joins to teach the Business Model Canvas, reverse-engineering household names like Airbnb, Uber, and Netflix before students apply the same thinking to their own idea. A rapid-fire Canvas Challenge forces teams to answer tough founder questions before pitching to peers for real-time feedback."
  },
  {
    title: "Speaking AI's Language",
    copy: "Students learn the Prompt Checklist — Role, Task, Context, Format — and see firsthand how a vague prompt produces a vague answer. In the Bad Prompt Battle, teams compete to rescue terrible prompts into excellent ones, earning Resonate Tokens for the strongest rewrites."
  },
  {
    title: "From Idea to Prototype",
    copy: "Students learn what an MVP actually is — the simplest version of a product that solves the core problem — using Uber and Amazon's earliest versions as proof. After a Feature Prioritization Challenge, teams dive into a 30-minute Build Sprint in Lovable to create their first real prototype."
  },
  {
    title: "Crafting the Pitch",
    copy: "A Silicon Valley honoree on the 40 Under 40 list joins to teach the HPSA structure — Hook, Problem, Solution, Ask — dissecting famous pitches before students write their own. Teams draft, present, and revise their Shark Tank pitch through rapid Founder Feedback Circles."
  },
  {
    title: "Delivering With Confidence",
    copy: "Students break down the 5 Elements of Powerful Delivery — voice, pauses, body language, energy, and Q&A skills — and drill full pitch run-throughs with peer scoring across content, charisma, and connection. A Shark Tank Q&A Simulation preps teams to think on their feet when judges start asking questions."
  },
  {
    title: "Shark Tank Finale",
    copy: "In front of parents and a judging panel that includes a fintech founder and Stanford/Wharton alumnus alongside other Bay Area entrepreneurs and technologists, each team delivers a 5-minute pitch and fields a live 3-minute Q&A on their AI-powered solution. Awards, a Resonate Token spending spree, and a closing reflection send students off having built — and defended — something real."
  }
];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const refreshIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
  }
};

const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuClose = document.querySelector("[data-menu-close]");

const setMenu = (open) => {
  menuButton?.setAttribute("aria-expanded", String(open));
  if (mobileMenu) mobileMenu.hidden = !open;
  document.body.classList.toggle("menu-open", open);
  if (open) menuClose?.focus();
};

menuButton?.addEventListener("click", () => setMenu(true));
menuClose?.addEventListener("click", () => setMenu(false));
mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileMenu?.hidden) {
    setMenu(false);
    menuButton?.focus();
  }
});

const pillarTitle = document.querySelector("[data-pillar-title]");
const pillarNumber = document.querySelector("[data-pillar-number]");
const pillarList = document.querySelector("[data-pillar-list]");
const pillarDetail = document.querySelector(".program-detail");
const pillarButtons = document.querySelectorAll("[data-pillar]");
const programBrowser = document.querySelector(".program-browser");

const renderPillar = (key) => {
  const content = pillarContent[key];
  if (!content || !pillarTitle || !pillarNumber || !pillarList) return;

  pillarTitle.textContent = content.title;
  pillarNumber.textContent = content.number;
  pillarList.innerHTML = content.items
    .map((item) => `<li><i data-lucide="check" aria-hidden="true"></i><span>${item}</span></li>`)
    .join("");

  pillarDetail?.classList.remove("is-changing");
  void pillarDetail?.offsetWidth;
  pillarDetail?.classList.add("is-changing");
  refreshIcons();
};

const selectPillar = (button) => {
  pillarButtons.forEach((item) => item.setAttribute("aria-selected", "false"));
  button.setAttribute("aria-selected", "true");
  renderPillar(button.dataset.pillar);
};

let pillarTimer;
const stopPillarCycle = () => {
  window.clearTimeout(pillarTimer);
  programBrowser?.classList.remove("is-cycling");
};

const startPillarCycle = () => {
  if (!programBrowser || pillarButtons.length < 2) return;
  stopPillarCycle();
  void programBrowser.offsetWidth;
  programBrowser.classList.add("is-cycling");
  pillarTimer = window.setTimeout(() => {
    const buttons = [...pillarButtons];
    const current = buttons.findIndex((button) => button.getAttribute("aria-selected") === "true");
    selectPillar(buttons[(current + 1) % buttons.length]);
    startPillarCycle();
  }, 4800);
};

pillarButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectPillar(button);
    startPillarCycle();
  });
});

programBrowser?.addEventListener("mouseenter", stopPillarCycle);
programBrowser?.addEventListener("mouseleave", startPillarCycle);
programBrowser?.addEventListener("focusin", stopPillarCycle);
programBrowser?.addEventListener("focusout", (event) => {
  if (!programBrowser.contains(event.relatedTarget)) startPillarCycle();
});

const curriculumList = document.querySelector("[data-curriculum-list]");
if (curriculumList) {
  curriculumList.innerHTML = curriculum
    .map((week, index) => {
      const number = String(index + 1).padStart(2, "0");
      const open = index === 0;
      return `
        <article class="curriculum-item">
          <button class="curriculum-trigger" type="button" aria-expanded="${open}" aria-controls="week-${number}" data-week-trigger>
            <span class="week-number">${number}</span>
            <span class="week-title">${week.title}</span>
            <i data-lucide="plus" aria-hidden="true"></i>
          </button>
          <div class="curriculum-panel" id="week-${number}">
            <div><p>${week.copy}</p></div>
          </div>
        </article>
      `;
    })
    .join("");
}

const curriculumTriggers = document.querySelectorAll("[data-week-trigger]");
curriculumTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    curriculumTriggers.forEach((item) => item.setAttribute("aria-expanded", "false"));
    trigger.setAttribute("aria-expanded", String(!isOpen));
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");

document.querySelectorAll("[data-capstone-video]").forEach((video) => {
  const setPlayback = () => {
    if (reducedMotion) {
      video.pause();
      video.removeAttribute("autoplay");
      return;
    }
    video.playbackRate = video.dataset.capstoneVideo === "atlas" ? 2 : 1.5;
  };
  video.addEventListener("canplay", setPlayback);
  setPlayback();
});

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -48px" }
  );
  revealItems.forEach((item) => observer.observe(item));
}

renderPillar("ai");
startPillarCycle();
refreshIcons();

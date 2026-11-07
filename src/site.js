import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll("[data-interest]").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector("#interest").value = link.dataset.interest;
  });
});
const form = document.querySelector("#brief-form");
const status = document.querySelector("#form-status");
const copyButton = document.querySelector("#copy-brief");
function composeBrief() {
  const data = new FormData(form);
  const name = String(data.get("name")).trim();
  const brief = String(data.get("brief")).trim();
  return {
    subject: "Trivyo enquiry — " + data.get("interest"),
    body: [
      "Hello Trivyo,",
      "",
      "I’m interested in " + data.get("interest") + ".",
      "",
      brief,
      ...(name ? ["", "From,", name] : []),
    ].join(String.fromCharCode(10)),
  };
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const field = document.querySelector("#project-brief");
  field.setCustomValidity(
    field.value.trim() ? "" : "Please add a few words about your project.",
  );
  if (!form.reportValidity()) return;
  const { subject, body } = composeBrief();
  window.location.href =
    "mailto:contact@trivyo.in?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);
  status.textContent =
    "Your email draft is ready to open. If your email app didn’t open, copy the brief below and send it to contact@trivyo.in.";
  copyButton.hidden = false;
});
document
  .querySelector("#project-brief")
  .addEventListener("input", (event) => event.target.setCustomValidity(""));
copyButton.addEventListener("click", async () => {
  const { subject, body } = composeBrief();
  try {
    await navigator.clipboard.writeText(
      [subject, "", body].join(String.fromCharCode(10)),
    );
    status.textContent =
      "Brief copied. Paste it into an email to contact@trivyo.in.";
  } catch {
    status.textContent =
      "Copy your project details from the fields above and email them to contact@trivyo.in.";
  }
});

form.querySelector('button[type="submit"]').disabled = false;

const motionPreferences = gsap.matchMedia();
const motionButtons = [...document.querySelectorAll("[data-motion-stage]")];
let workflowScroll;

motionPreferences.add("(prefers-reduced-motion: no-preference)", () => {
  document.documentElement.classList.add("motion-enabled");

  let active = true;
  const flow = document.querySelector(".hero-flow");
  const intro = gsap.timeline({
    paused: true,
    defaults: { ease: "power3.out" },
    onComplete: () => flow.classList.add("flow-settled"),
  });
  intro
    .from(".title-line > span", { yPercent: 110, duration: 1.2, stagger: 0.14 })
    .from(
      ".hero-label, .hero-bottom",
      { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 },
      0.45,
    )
    .from(".hero-rule span", { scaleX: 0, duration: 1.4 }, 0.5);

  intro.from(flow, { y: 16, opacity: 0, duration: 1.3 }, 0.25);
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top bottom",
    end: "bottom top",
    toggleClass: { targets: flow, className: "flow-visible" },
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".motion-story",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7,
      invalidateOnRefresh: true,
      onUpdate: ({ progress }) => {
        const active = Math.min(2, Math.floor(progress * 2 + 0.5));
        motionButtons.forEach((button, index) => {
          button.setAttribute("aria-pressed", String(index === active));
        });
      },
    },
  });
  workflowScroll = timeline.scrollTrigger;
  timeline
    .to(".motion-track", { xPercent: -66.6667, ease: "none", duration: 10 }, 0)
    .to(".journey-fill", { scaleX: 1, ease: "none", duration: 10 }, 0)
    .to(".journey-dot", { left: "100%", ease: "none", duration: 10 }, 0)
    .fromTo(
      ".enquiry-object",
      { rotation: -7, y: 30 },
      { rotation: 6, y: -25, duration: 3, ease: "none" },
      0,
    )
    .from(
      ".draft-lines i",
      { scaleX: 0, stagger: 0.3, duration: 1.4, ease: "power2.out" },
      3,
    )
    .from(
      ".review-ring",
      {
        scale: 0.5,
        rotation: -45,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
      },
      7.2,
    )
    .from(".review-visual strong", { y: 25, opacity: 0, duration: 1.4 }, 8);

  gsap.utils.toArray(".service-row, .process-grid li").forEach((item) => {
    gsap.from(item, {
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 92%",
        toggleActions: "play none none reverse",
      },
    });
  });

  document.fonts.ready.then(() => {
    if (!active) return;
    ScrollTrigger.refresh();
    intro.play();
  });
  return () => {
    active = false;
    flow.classList.remove("flow-settled", "flow-visible");
    document.documentElement.classList.remove("motion-enabled");
    workflowScroll = undefined;
  };
});

motionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!workflowScroll) return;
    const position = Number(button.dataset.motionStage) / 2;
    window.scrollTo({
      top:
        workflowScroll.start +
        (workflowScroll.end - workflowScroll.start) * position,
      behavior: "smooth",
    });
  });
});

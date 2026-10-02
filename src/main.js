import "./style.css";

// Year update
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Navigation mobile menu
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");
function closeMenu() {
  if (!menu || !nav) return;
  menu.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
}
if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menu.focus();
    }
  });
}

let selectedMode = 0;
const modeButtons = [...document.querySelectorAll("[data-mode]")];
const servicePanels = [...document.querySelectorAll("[data-service]")];

function selectMode(mode) {
  selectedMode = mode;
  window.dispatchEvent(new CustomEvent("trivyo:service", { detail: mode }));
  modeButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(Number(button.dataset.mode) === mode),
    );
  });

  // Smoothly open and navigate to the selected service accordion
  if (servicePanels[mode]) {
    servicePanels[mode].open = true;
    servicePanels.forEach((p, idx) => {
      if (idx !== mode) p.open = false;
    });
    servicePanels[mode].scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "center",
    });
  }
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () =>
    selectMode(Number(button.dataset.mode)),
  );
});

servicePanels.forEach((panel) => {
  panel.addEventListener("toggle", () => {
    if (!panel.open) return;
    servicePanels.forEach((other) => {
      if (other !== panel) other.open = false;
    });
    const sIdx = Number(panel.dataset.service);
    if (!isNaN(sIdx) && sIdx !== selectedMode) {
      selectedMode = sIdx;
      window.dispatchEvent(new CustomEvent("trivyo:service", { detail: sIdx }));
      modeButtons.forEach((button) => {
        button.setAttribute(
          "aria-pressed",
          String(Number(button.dataset.mode) === sIdx),
        );
      });
    }
  });
});

if (document.querySelector("#webgl-canvas")) {
  import("./background.js")
    .then(({ mountCompanyBackground }) => mountCompanyBackground())
    .catch(() => {
      const pause = document.querySelector("#motion-toggle");
      if (pause) {
        pause.disabled = true;
        pause.textContent = "Static view";
      }
    });
}

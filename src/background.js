import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const COUNT = 48;
const clamp = THREE.MathUtils.clamp;
const mix = THREE.MathUtils.lerp;
const smooth = (v) => v * v * (3 - 2 * v);

// One original lowercase t becomes service layers, connected frames, and steps.
function arrangement(mode, i) {
  const row = Math.floor(i / 12),
    col = i % 12;
  if (mode === 0) {
    const crossbar = i >= 7 && i < 19;
    return [
      crossbar ? 0.48 : 0,
      2.1 - i * 0.09,
      0,
      crossbar ? 4.1 : 1.35,
      0.065,
      1.6,
    ];
  }
  if (mode === 1)
    return [
      -2.55 + col * 0.465,
      1.6 - row * 1.02,
      -row * 0.17,
      0.43,
      0.14,
      2.5,
    ];
  if (mode === 2) {
    const edge = Math.floor(col / 3),
      segment = col % 3,
      z = 1.35 - row * 0.9;
    return edge % 2 === 0
      ? [-1.4 + segment * 1.4, edge === 0 ? 1.55 : -1.55, z, 1.35, 0.12, 0.12]
      : [edge === 1 ? 2.1 : -2.1, -1.02 + segment * 1.02, z, 0.12, 0.96, 0.12];
  }
  return [
    -1.95 + row * 1.3,
    -1.3 + row * 0.88 + col * 0.015,
    -1.14 + col * 0.205,
    1.12,
    0.12,
    0.18,
  ];
}

export function mountCompanyBackground() {
  const host = document.querySelector("#world");
  const canvas = document.querySelector("#webgl-canvas");
  const pause = document.querySelector("#motion-toggle");
  const label = document.querySelector("#scene-section");
  if (!host || !canvas) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let renderer,
    environment,
    disposed = false;
  const disposables = [],
    listeners = [];
  const on = (target, event, handler, options) => {
    target.addEventListener(event, handler, options);
    listeners.push(() => target.removeEventListener(event, handler, options));
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    renderer?.setAnimationLoop(null);
    listeners.forEach((remove) => remove());
    disposables.forEach((resource) => resource.dispose());
    environment?.dispose();
    renderer?.dispose();
  };
  const fallback = () => {
    dispose();
    host.classList.remove("scene-ready");
    pause.disabled = true;
    pause.textContent = "Static view";
  };
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x141714, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      34,
      innerWidth / innerHeight,
      0.1,
      70,
    );
    const generator = new THREE.PMREMGenerator(renderer),
      room = new RoomEnvironment();
    environment = generator.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    generator.dispose();
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.64,
      roughness: 0.31,
    });
    const geometry = new RoundedBoxGeometry(1, 1, 1, 2, 0.06);
    const members = new THREE.InstancedMesh(geometry, material, COUNT);
    members.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    members.frustumCulled = false;
    const structure = new THREE.Group();
    structure.add(members);
    scene.add(structure);
    disposables.push(members, material, geometry);
    const colors = [
      new THREE.Color(0xd0d1c5),
      new THREE.Color(0xf07849),
      new THREE.Color(0x59635b),
    ];
    const dummy = new THREE.Object3D(),
      color = new THREE.Color();
    const layouts = [0, 1, 2, 3].map((mode) =>
      Array.from({ length: COUNT }, (_, i) => arrangement(mode, i)),
    );
    // Oversized architectural lines extend beyond the viewport, never a card.
    const railGeometry = new THREE.BoxGeometry(1, 1, 1);
    const railMaterial = new THREE.MeshBasicMaterial({
      color: 0x697368,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });
    disposables.push(railGeometry, railMaterial);
    const rails = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const rail = new THREE.Mesh(railGeometry, railMaterial);
      rail.scale.set(28, 0.008, 0.008);
      rail.position.set(0, -4 + i * 1.3, -4 - i * 0.35);
      rails.add(rail);
    }
    rails.rotation.set(0.15, -0.28, -0.15);
    scene.add(rails);
    for (const [tint, intensity, position] of [
      [0xffe5d0, 3, [-4, 6, 7]],
      [0xe2e8dc, 4, [5, 3, -4]],
      [0xf07849, 1.2, [3, -3, 4]],
    ]) {
      const light = new THREE.DirectionalLight(tint, intensity);
      light.position.set(...position);
      scene.add(light);
    }
    const sections = [
      "home",
      "system",
      "services",
      "work",
      "process",
      "studio",
      "contact",
    ].map((id) => document.getElementById(id));
    const labels = [
      "Introduction",
      "Connected systems",
      "Expertise",
      "Solutions",
      "Approach",
      "Company",
      "Contact",
    ];
    const story = document.querySelector("#system");
    const storySteps = [...document.querySelectorAll("[data-story-step]")];
    let paused = reduced.matches,
      visible = !document.hidden;
    let section = 0,
      progress = 0,
      targetPose = 0,
      pose = 0,
      serviceIndex = 0;
    let pointerX = 0,
      pointerY = 0,
      drag = 0,
      dragStart = null,
      previousTime = 0;
    let starts = [],
      storyStart = 0,
      storyLength = 1,
      renderNeeded = true,
      initialized = false;
    const current = {
      x: 3.15,
      y: 0.1,
      rx: 0.16,
      ry: -0.58,
      rz: -0.06,
      z: 12.7,
      scale: 1.18,
    };
    const updatePause = () => {
      pause.textContent = paused ? "Resume motion" : "Pause motion";
      pause.setAttribute("aria-pressed", String(paused));
      renderNeeded = true;
    };
    updatePause();
    const readScroll = () => {
      section = 0;
      starts.forEach((top, i) => {
        if (scrollY + innerHeight * 0.43 >= top) section = i;
      });
      progress = clamp((scrollY - storyStart) / storyLength, 0, 1);
      targetPose =
        section === 0
          ? 0
          : section === 1
            ? progress * 2
            : [0, 0, 1, 2, 3, 0, 2][section];
      label.textContent = "0" + (section + 1) + " / " + labels[section];
      host.dataset.section = String(section);
      story.style.setProperty("--story-progress", progress);
      const step = Math.min(2, Math.floor(progress * 3));
      storySteps.forEach((el, i) => el.classList.toggle("active", i === step));
      renderNeeded = true;
    };
    const measure = () => {
      starts = sections.map((el) => el.getBoundingClientRect().top + scrollY);
      storyStart = story.getBoundingClientRect().top + scrollY;
      storyLength = Math.max(1, story.offsetHeight - innerHeight);
      readScroll();
    };
    const resize = () => {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.fov = innerWidth < 768 ? 44 : 34;
      camera.updateProjectionMatrix();
      measure();
    };
    resize();
    on(window, "resize", resize);
    on(window, "scroll", readScroll, { passive: true });
    // Font swaps and accordions can move landmarks without resizing the window.
    const observer = new ResizeObserver(measure);
    observer.observe(document.querySelector("#page-wrapper"));
    listeners.push(() => observer.disconnect());
    on(pause, "click", () => {
      paused = !paused;
      updatePause();
    });
    on(reduced, "change", () => {
      paused = reduced.matches;
      updatePause();
    });
    on(document, "visibilitychange", () => {
      visible = !document.hidden;
      renderNeeded = true;
    });
    on(window, "trivyo:service", (event) => {
      serviceIndex = clamp(Number(event.detail) || 0, 0, 3);
      renderNeeded = true;
    });
    on(
      window,
      "pointermove",
      (event) => {
        if (event.pointerType !== "mouse" || paused) return;
        pointerX = event.clientX / innerWidth - 0.5;
        pointerY = event.clientY / innerHeight - 0.5;
        if (dragStart !== null) {
          drag = clamp(drag + (event.clientX - dragStart) * 0.002, -0.45, 0.45);
          dragStart = event.clientX;
        }
        renderNeeded = true;
      },
      { passive: true },
    );
    on(window, "pointerdown", (event) => {
      if (
        paused ||
        event.pointerType !== "mouse" ||
        event.button !== 0 ||
        event.target.closest("a,button,summary,input,nav")
      )
        return;
      dragStart = event.clientX;
    });
    const release = () => {
      dragStart = null;
    };
    on(window, "pointerup", release);
    on(window, "pointercancel", release);
    on(window, "blur", release);
    on(canvas, "webglcontextlost", (event) => {
      event.preventDefault();
      fallback();
    });
    on(window, "pagehide", (event) => {
      if (!event.persisted) dispose();
    });
    renderer.setAnimationLoop((time) => {
      const delta = Math.min((time - previousTime) / 1000 || 0.016, 0.05);
      previousTime = time;
      if (!visible || disposed || !renderNeeded) return;
      const mobile = innerWidth < 768;
      // Pausing or reducing motion makes section changes instant, without parallax.
      const amount = paused || !initialized ? 1 : 1 - Math.exp(-delta * 7);
      pose = mix(pose, targetPose, amount);
      const from = Math.floor(pose),
        to = Math.min(3, from + 1),
        blend = smooth(pose - from);
      let moving = Math.abs(pose - targetPose) > 0.0001;
      const targets = {
        x: mobile ? 1.65 : section === 5 ? -2.5 : section === 1 ? 3.0 : 3.35,
        y: mobile ? -0.85 : section === 1 ? -0.1 : 0.05,
        rx:
          (section === 1
            ? mix(0.18, 0.42, progress)
            : section === 4
              ? 0.36
              : 0.18) + (paused ? 0 : pointerY * 0.07),
        ry:
          (section === 1
            ? mix(-0.58, -0.22, progress)
            : section === 5
              ? 0.45
              : -0.58) + (paused ? 0 : pointerX * 0.14 + drag),
        rz: section === 4 ? -0.12 : -0.055,
        z: section === 1 ? mix(12.7, 11.6, progress) : 12.7,
        scale: mobile ? 0.98 : section === 0 ? 1.27 : 1.1,
      };
      for (const field of Object.keys(current)) {
        current[field] = mix(current[field], targets[field], amount);
        moving ||= Math.abs(current[field] - targets[field]) > 0.0001;
      }
      structure.position.set(current.x, current.y, 0);
      structure.rotation.set(current.rx, current.ry, current.rz);
      structure.scale.setScalar(current.scale);
      camera.position.set(0, 0.1, current.z);
      camera.lookAt(0, 0, 0);
      for (let i = 0; i < COUNT; i++) {
        const a = layouts[from][i],
          b = layouts[to][i];
        const active = section === 2 && Math.floor(i / 12) === serviceIndex;
        dummy.position.set(
          mix(a[0], b[0], blend),
          mix(a[1], b[1], blend),
          mix(a[2], b[2], blend) + (active ? 0.26 : 0),
        );
        dummy.scale.set(
          mix(a[3], b[3], blend),
          mix(a[4], b[4], blend),
          mix(a[5], b[5], blend),
        );
        dummy.updateMatrix();
        members.setMatrixAt(i, dummy.matrix);
        color.copy(
          active || (i >= 7 && i < 11)
            ? colors[1]
            : i % 12 === 11
              ? colors[2]
              : colors[0],
        );
        members.setColorAt(i, color);
      }
      members.instanceMatrix.needsUpdate = true;
      members.instanceColor.needsUpdate = true;
      rails.rotation.y = -0.28 + pose * 0.1;
      renderer.render(scene, camera);
      host.dataset.pose = pose.toFixed(3);
      initialized = true;
      renderNeeded = moving;
      host.classList.add("scene-ready");
    });
  } catch (error) {
    console.warn("Trivyo background unavailable", error);
    fallback();
  }
}

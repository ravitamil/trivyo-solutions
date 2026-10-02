import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// Original parametric ribbon surface: no reference-site assets or source reused.
function createRibbonGeometry(mobile) {
  const bands = mobile ? 28 : 44,
    steps = mobile ? 48 : 72;
  const positions = [[], [], [], []],
    indices = [];
  for (let band = 0; band < bands; band++) {
    for (let step = 0; step <= steps; step++) {
      const u = (step / steps) * Math.PI * 2;
      for (let side = 0; side < 2; side++) {
        const v = ((band + (side ? 0.76 : 0)) / bands) * 2 - 1;
        positions[0].push(
          (1.65 + v * 0.6) * Math.cos(u),
          1.65 * Math.sin(u) + v * 0.58 * Math.cos(u * 2),
          v * 1.25 + Math.sin(u * 2) * 0.55,
        );
        positions[1].push(
          (u / Math.PI - 1) * 2.25,
          v * 1.7,
          Math.sin(u * 1.5 + v * 2) * 0.7,
        );
        const a = u + v * 0.7;
        positions[2].push(
          Math.cos(a) * (1.7 + v * 0.65),
          Math.sin(a) * (1.7 + v * 0.65),
          Math.sin(u * 3) * 0.45 + v * 0.85,
        );
        positions[3].push(
          Math.cos(u) * (1.3 + v * 0.9),
          v * 1.8,
          Math.sin(u) * (1.3 + v * 0.9) + Math.sin(v * 3) * 0.5,
        );
      }
    }
    for (let step = 0; step < steps; step++) {
      const start = band * (steps + 1) * 2 + step * 2;
      indices.push(
        start,
        start + 1,
        start + 2,
        start + 1,
        start + 3,
        start + 2,
      );
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions[0], 3),
  );
  geometry.computeVertexNormals();
  geometry.morphAttributes.position = [];
  geometry.morphAttributes.normal = [];
  for (let form = 1; form < 4; form++) {
    const target = new THREE.BufferGeometry();
    target.setIndex(indices);
    target.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions[form], 3),
    );
    target.computeVertexNormals();
    geometry.morphAttributes.position.push(
      target.getAttribute("position").clone(),
    );
    geometry.morphAttributes.normal.push(target.getAttribute("normal").clone());
    target.dispose();
  }
  for (let band = 0; band < bands; band++)
    geometry.addGroup(band * steps * 6, steps * 6, band % 11 === 0 ? 1 : 0);
  return geometry;
}

export function mountCompanyBackground() {
  const host = document.querySelector("#world");
  if (!host) return;
  const pause = document.querySelector("#motion-toggle"),
    sectionLabel = document.querySelector("#scene-section");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let renderer,
    cleanup = () => {};
  try {
    const canvas = document.querySelector("#webgl-canvas");
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x141714, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      34,
      innerWidth / innerHeight,
      0.1,
      70,
    );
    camera.position.set(0, 0.1, 11.5);
    const generator = new THREE.PMREMGenerator(renderer),
      room = new RoomEnvironment(),
      environment = generator.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    generator.dispose();
    const metal = new THREE.MeshPhysicalMaterial({
      color: 0xb9c4b3,
      metalness: 0.92,
      roughness: 0.29,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
    });
    const orange = new THREE.MeshPhysicalMaterial({
      color: 0xf07849,
      metalness: 0.55,
      roughness: 0.29,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    });
    const geometry = createRibbonGeometry(innerWidth < 768),
      surface = new THREE.Mesh(geometry, [metal, orange]);
    scene.add(surface);
    surface.rotation.set(0.3, 0.5, -0.3);
    const grid = new THREE.GridHelper(45, 60, 0x3b4337, 0x232a20);
    grid.position.y = -3.3;
    grid.material.transparent = true;
    grid.material.opacity = 0.38;
    scene.add(grid);
    const warm = new THREE.DirectionalLight(0xffd8bb, 2.8);
    warm.position.set(-3, 4, 3);
    scene.add(warm);
    const edge = new THREE.DirectionalLight(0xc9d9c0, 3);
    edge.position.set(4, 2, -3);
    scene.add(edge);
    const sections = [
      "home",
      "services",
      "work",
      "process",
      "studio",
      "contact",
    ].map((id) => document.getElementById(id));
    const labels = [
      "Introduction",
      "Expertise",
      "Solutions",
      "Approach",
      "Company",
      "Contact",
    ];
    let paused = reduced.matches,
      visible = !document.hidden,
      lastTime = 0,
      phase = 0,
      mouseX = 0,
      mouseY = 0,
      dragging = false,
      dragX = 0,
      lastX = 0,
      section = 0,
      form = 0,
      scroll = 0;
    const updatePause = () => {
      pause.textContent = paused ? "Resume motion" : "Pause motion";
      pause.setAttribute("aria-pressed", String(paused));
    };
    updatePause();
    const togglePause = () => {
      paused = !paused;
      updatePause();
    };
    pause.addEventListener("click", togglePause);
    const media = (event) => {
      paused = event.matches;
      updatePause();
    };
    reduced.addEventListener("change", media);
    const visibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", visibility);
    const resize = () => {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.fov = innerWidth < 768 ? 42 : 34;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);
    const readScroll = () => {
      scroll = scrollY / Math.max(1, innerHeight);
      let active = 0;
      sections.forEach((element, index) => {
        if (element.getBoundingClientRect().top < innerHeight * 0.48)
          active = index;
      });
      section = active;
      sectionLabel.textContent = `0${section + 1} / ${labels[section]}`;
      host.dataset.section = String(section);
      form =
        section === 0
          ? 0
          : section === 1
            ? 1
            : section === 2
              ? 2
              : section === 3
                ? 1
                : section === 4
                  ? 3
                  : 0;
    };
    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });
    const service = (event) => {
      form = event.detail;
    };
    window.addEventListener("trivyo:service", service);
    const pointer = (event) => {
      if (event.pointerType === "mouse") {
        mouseX = event.clientX / innerWidth - 0.5;
        mouseY = event.clientY / innerHeight - 0.5;
      }
      if (dragging) {
        dragX += (event.clientX - lastX) * 0.004;
        lastX = event.clientX;
      }
    };
    const down = (event) => {
      if (event.target.closest("a,button,summary,input,nav")) return;
      dragging = true;
      lastX = event.clientX;
    };
    const release = () => {
      dragging = false;
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    renderer.setAnimationLoop((time) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      if (!visible) return;
      if (!paused) phase += delta;
      const mobile = innerWidth < 768;
      const speed = reduced.matches ? 1 : 1 - Math.exp(-delta * 4);
      const x = mobile
        ? section === 0
          ? 1.4
          : 1.7
        : section === 0
          ? 2.6
          : section === 4
            ? -2.4
            : 3.1;
      surface.position.x += (x - surface.position.x) * speed;
      surface.position.y +=
        ((mobile && section === 0 ? -0.55 : 0.1) - surface.position.y) * speed;
      surface.rotation.y +=
        (0.45 +
          scroll * 0.28 +
          dragX +
          (!paused ? Math.sin(phase * 0.14) * 0.12 + mouseX * 0.2 : 0) -
          surface.rotation.y) *
        speed;
      surface.rotation.x +=
        (0.25 + (!paused ? mouseY * 0.15 : 0) - surface.rotation.x) * speed;
      surface.rotation.z = -0.27 + Math.sin(phase * 0.1) * 0.025;
      for (let index = 0; index < 3; index++)
        surface.morphTargetInfluences[index] +=
          ((form === index + 1 ? 1 : 0) -
            surface.morphTargetInfluences[index]) *
          speed;
      const opacity = section === 0 ? 0.94 : section === 4 ? 0.65 : 0.38;
      metal.opacity += (opacity - metal.opacity) * speed;
      orange.opacity = metal.opacity;
      const scale = mobile ? (section === 0 ? 1.08 : 0.87) : 1.13;
      surface.scale.setScalar(scale);
      grid.rotation.y = scroll * 0.025;
      renderer.render(scene, camera);
    });
    host.classList.add("scene-ready");
    const contextLost = (event) => {
      event.preventDefault();
      renderer.setAnimationLoop(null);
      host.classList.remove("scene-ready");
      pause.disabled = true;
      pause.textContent = "Static view";
    };
    canvas.addEventListener("webglcontextlost", contextLost);
    cleanup = () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("trivyo:service", service);
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", media);
      pause.removeEventListener("click", togglePause);
      geometry.dispose();
      metal.dispose();
      orange.dispose();
      grid.geometry.dispose();
      grid.material.dispose();
      environment.dispose();
      renderer.dispose();
    };
    window.addEventListener(
      "pagehide",
      (event) => {
        if (!event.persisted) cleanup();
      },
      { once: true },
    );
  } catch {
    cleanup();
    renderer?.dispose();
    host.classList.remove("scene-ready");
    pause.disabled = true;
    pause.textContent = "Static view";
  }
}

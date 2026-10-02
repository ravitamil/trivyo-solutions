import './style.css';
document.querySelector('#year').textContent = new Date().getFullYear();
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); menu.focus(); } });
const labels = ['01 / Quality assurance', '02 / Web applications', '03 / Workflow automation', '04 / Agent setup'];
let selected = 0;
let updateSculpture = () => {};
const modeButtons = [...document.querySelectorAll('[data-mode]')];
const servicePanels = [...document.querySelectorAll('[data-service]')];
function selectMode(mode) {
  selected = mode;
  modeButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.mode) === mode)));
  document.querySelector('#scene-state').textContent = labels[mode];
  updateSculpture(mode);
}
modeButtons.forEach(button => button.addEventListener('click', () => selectMode(Number(button.dataset.mode))));
servicePanels.forEach(panel => panel.addEventListener('toggle', () => {
  if (!panel.open) return;
  servicePanels.forEach(other => { if (other !== panel) other.open = false; });
  selectMode(Number(panel.dataset.service));
}));
async function mountScene() {
  const host = document.querySelector('#scene');
  const pause = document.querySelector('#motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let renderer;
  try {
    const THREE = await import('three');
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, powerPreference: 'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0xe3e6dc, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    host.classList.add('scene-ready');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(4.6, 3.1, 6.5); camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x606955, 3));
    const light = new THREE.DirectionalLight(0xffffff, 4); light.position.set(3, 6, 5); scene.add(light);
    const fill = new THREE.DirectionalLight(0xf07849, 1.2); fill.position.set(-5, 1, -3); scene.add(fill);
    const sculpture = new THREE.Group(); scene.add(sculpture);
    const geometry = new THREE.BoxGeometry(.52, .52, .52);
    const dark = new THREE.MeshStandardMaterial({color: 0x343c2c, roughness: .32, metalness: .6});
    const orange = new THREE.MeshStandardMaterial({color: 0xf07849, roughness: .38, metalness: .2});
    const pale = new THREE.MeshStandardMaterial({color: 0xb6c1a6, roughness: .42, metalness: .35});
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({color: 0x808d70, transparent: true, opacity: .4});
    const blocks = [];
    for (let i = 0; i < 27; i++) {
      const block = new THREE.Mesh(geometry, i === 13 || i % 9 === 0 ? orange : i % 3 === 0 ? pale : dark);
      block.add(new THREE.LineSegments(edges, edgeMaterial)); sculpture.add(block); blocks.push(block);
    }
    const ringGeometry = new THREE.TorusGeometry(1.9, .007, 6, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({color:0x69795a, transparent:true, opacity:.38});
    const ring = new THREE.Mesh(ringGeometry, ringMaterial); ring.rotation.x = Math.PI/2; ring.position.y = -1.4; scene.add(ring);
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial); ring2.rotation.set(.3, 0, .5); ring2.scale.setScalar(1.12); scene.add(ring2);
    const target = blocks.map(() => new THREE.Vector3());
    updateSculpture = mode => {
      for (let i = 0; i < blocks.length; i++) {
        const x = i % 3 - 1, y = Math.floor(i / 3) % 3 - 1, z = Math.floor(i / 9) - 1;
        if (mode === 0) target[i].set(x * .72, y * .72, z * .72);
        if (mode === 1) target[i].set(x * .78, y * .62 + (x === 0 ? .35 : -.15), z * .78);
        if (mode === 2) {const angle = i / 27 * Math.PI * 2; target[i].set(Math.cos(angle) * 1.45, Math.sin(angle * 3) * .3, Math.sin(angle) * 1.45);}
        if (mode === 3) {const angle = i * 2.399963; const height = 1 - i / 13; const radius = Math.sqrt(Math.max(0, 1-height*height)) * 1.45; target[i].set(Math.cos(angle) * radius, height * 1.45, Math.sin(angle) * radius);}
      }
    };
    updateSculpture(selected); blocks.forEach((block,i) => block.position.copy(target[i]));
    let paused = reduced.matches, visible = true, inView = true, lastTime = 0, pointerX = 0, pointerY = 0, dragging = false;
    let rotationY = -.25, rotationX = .08;
    function labelPause() {pause.textContent = paused ? 'Resume motion' : 'Pause motion'; pause.setAttribute('aria-pressed', String(paused));}
    labelPause();
    pause.addEventListener('click', () => {paused = !paused; labelPause();});
    reduced.addEventListener('change', event => {paused = event.matches; labelPause();});
    // Mobile vertical swipes continue scrolling; horizontal drags rotate the sculpture.
    host.addEventListener('pointerdown', event => {dragging = true; pointerX = event.clientX; pointerY = event.clientY;});
    host.addEventListener('pointermove', event => {
      if (!dragging) return;
      rotationY += (event.clientX-pointerX)*.009;
      if (event.pointerType === 'mouse') rotationX = THREE.MathUtils.clamp(rotationX+(event.clientY-pointerY)*.005, -.6, .6);
      pointerX = event.clientX; pointerY = event.clientY;
    });
    const release = () => {dragging = false;};
    window.addEventListener('pointerup', release); host.addEventListener('pointercancel', release); host.addEventListener('pointerleave', release);
    const resize = new ResizeObserver(() => {
      const {width,height} = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width,height,false); camera.aspect = width/height; camera.updateProjectionMatrix();
      camera.position.set(4.6,3.1,6.5).multiplyScalar(width<340 ? 1.13 : 1); camera.lookAt(0,0,0);
    }); resize.observe(host);
    const observer = new IntersectionObserver(entries => {inView = entries[0].isIntersecting;}); observer.observe(host);
    document.addEventListener('visibilitychange', () => {visible = !document.hidden;});
    renderer.setAnimationLoop(time => {
      const delta = Math.min((time-lastTime)/1000,.05); lastTime=time;
      if (!visible || !inView) return;
      if (!paused && !dragging) rotationY += delta * .15;
      sculpture.rotation.y = rotationY; sculpture.rotation.x = rotationX;
      blocks.forEach((block,i) => {if(reduced.matches) block.position.copy(target[i]); else block.position.lerp(target[i],1-Math.exp(-delta*7));});
      renderer.render(scene,camera);
    });
    renderer.domElement.addEventListener('webglcontextlost', event => {event.preventDefault(); renderer.setAnimationLoop(null); host.classList.remove('scene-ready'); pause.disabled=true; pause.textContent='Static view';});
    window.addEventListener('pagehide', event => {
      if(event.persisted) return;
      renderer.setAnimationLoop(null); resize.disconnect(); observer.disconnect();
      geometry.dispose(); edges.dispose(); ringGeometry.dispose();
      [dark,orange,pale,edgeMaterial,ringMaterial].forEach(material => material.dispose()); renderer.dispose();
    }, {once:true});
  } catch {
    renderer?.dispose();
    host.classList.remove('scene-ready'); pause.disabled=true; pause.textContent='Static view';
    document.querySelector('.scene-caption span:last-child').textContent = 'Connected services';
  }
}
mountScene();

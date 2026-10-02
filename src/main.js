import './style.css';

// Year update
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Navigation mobile menu
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu() {
  if (!menu || !nav) return;
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      menu.focus();
    }
  });
}

// Telemetry & Stage Data for Option A (Refined Modern Dev Studio)
const STAGES = [
  { name: 'HERO // DEV WORKSPACE', status: 'STATUS: PRODUCTION-GRADE QA MATRIX // VERIFIED ● 0 DEFECTS', altitude: 'STUDIO VIEW // 60 FPS' },
  { name: 'SERVICES // ARCHITECTURE', status: 'STATUS: QUALITY ASSURANCE & WEB PLATFORMS ACTIVE', altitude: 'SERVICES // 60 FPS' },
  { name: 'WORK // DELIVERABLES', status: 'STATUS: ZERO-DEFECT ARTIFACTS & CASE HISTORIES', altitude: 'WORK PORTFOLIO // 60 FPS' },
  { name: 'PROCESS // CI/CD FLOW', status: 'STATUS: HIGH-SPEED WORKFLOW PIPELINES STREAMING', altitude: 'PIPELINE GATE // 60 FPS' },
  { name: 'STUDIO // ENG PARTNER', status: 'STATUS: ONE SENIOR ENGINEERING PARTNER', altitude: 'STUDIO PROFILE // 60 FPS' },
  { name: 'CONTACT // GET IN TOUCH', status: 'STATUS: READY FOR PRODUCTION COLLABORATION', altitude: 'DIRECT INTAKE // 60 FPS' }
];

let selectedMode = 0;
const modeButtons = [...document.querySelectorAll('[data-mode]')];
const servicePanels = [...document.querySelectorAll('[data-service]')];

function selectMode(mode) {
  selectedMode = mode;
  modeButtons.forEach(button => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.mode) === mode));
  });

  // Smoothly open and navigate to the selected service accordion
  if (servicePanels[mode]) {
    servicePanels[mode].open = true;
    servicePanels.forEach((p, idx) => {
      if (idx !== mode) p.open = false;
    });
    servicePanels[mode].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

modeButtons.forEach(button => {
  button.addEventListener('click', () => selectMode(Number(button.dataset.mode)));
});

servicePanels.forEach(panel => {
  panel.addEventListener('toggle', () => {
    if (!panel.open) return;
    servicePanels.forEach(other => {
      if (other !== panel) other.open = false;
    });
    const sIdx = Number(panel.dataset.service);
    if (!isNaN(sIdx) && sIdx !== selectedMode) {
      selectedMode = sIdx;
      modeButtons.forEach(button => {
        button.setAttribute('aria-pressed', String(Number(button.dataset.mode) === sIdx));
      });
    }
  });
});

// Helper: Rounded Rectangle for Canvas
function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ----------------------------------------------------
// CANVAS TEXTURE GENERATOR 1: CODE EDITOR (VS CODE STYLE)
// ----------------------------------------------------
function createCodeEditorTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 680;
  const ctx = canvas.getContext('2d');

  // Dark obsidian window background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 680);
  bgGrad.addColorStop(0, '#0c1017');
  bgGrad.addColorStop(1, '#080c13');
  ctx.fillStyle = bgGrad;
  drawRoundedRect(ctx, 0, 0, 1024, 680, 14);
  ctx.fill();

  // Refined hairline border (Linear slate)
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 1, 1, 1022, 678, 14);
  ctx.stroke();

  // Title Bar Header
  ctx.fillStyle = '#111722';
  drawRoundedRect(ctx, 0, 0, 1024, 46, 14);
  ctx.fill();
  ctx.fillRect(0, 26, 1024, 20);

  // Traffic lights
  ctx.fillStyle = '#ff5f56';
  ctx.beginPath(); ctx.arc(24, 23, 5.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffbd2e';
  ctx.beginPath(); ctx.arc(42, 23, 5.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#27c93f';
  ctx.beginPath(); ctx.arc(60, 23, 5.5, 0, Math.PI * 2); ctx.fill();

  // Active Tab: checkout.spec.ts
  ctx.fillStyle = '#182030';
  drawRoundedRect(ctx, 88, 6, 210, 40, 6);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(88, 43, 210, 3);

  // Tab Badge TS
  ctx.fillStyle = '#0284c7';
  drawRoundedRect(ctx, 98, 16, 20, 19, 3);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px monospace';
  ctx.fillText('TS', 101, 29);

  // Tab Title
  ctx.fillStyle = '#f1f5f9';
  ctx.font = '12px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('checkout.spec.ts', 126, 29);

  // Tab 2 (Inactive): App.tsx
  ctx.fillStyle = '#0c1017';
  drawRoundedRect(ctx, 306, 6, 150, 40, 6);
  ctx.fill();
  ctx.fillStyle = '#64748b';
  ctx.font = '12px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('⚛  App.tsx', 324, 29);

  // Header Right Status
  ctx.fillStyle = '#10b981';
  ctx.beginPath(); ctx.arc(840, 23, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('PLAYWRIGHT v1.42 // E2E LAB', 852, 27);

  // Sidebar (Explorer Tree)
  ctx.fillStyle = '#080c13';
  ctx.fillRect(0, 46, 230, 594);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(230, 46); ctx.lineTo(230, 640); ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 11px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('EXPLORER: TRIVYO-CORE', 18, 74);

  const fileTree = [
    { text: '▼ src', indent: 18, col: '#94a3b8' },
    { text: '  ▼ tests/e2e', indent: 18, col: '#94a3b8' },
    { text: '    📄 checkout.spec.ts', indent: 18, col: '#38bdf8', active: true },
    { text: '    📄 auth-matrix.spec.ts', indent: 18, col: '#64748b' },
    { text: '    📄 api-gateway.spec.ts', indent: 18, col: '#64748b' },
    { text: '  ▼ components', indent: 18, col: '#64748b' },
    { text: '    ⚛ Dashboard.tsx', indent: 18, col: '#64748b' },
    { text: '  ▼ automation', indent: 18, col: '#64748b' },
    { text: '    ⚙ playwright.config.ts', indent: 18, col: '#64748b' },
    { text: '📄 package.json', indent: 18, col: '#64748b' }
  ];

  fileTree.forEach((item, idx) => {
    const y = 102 + idx * 26;
    if (item.active) {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.fillRect(0, y - 17, 230, 24);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(0, y - 17, 3, 24);
    }
    ctx.fillStyle = item.col;
    ctx.font = '12px "JetBrains Mono", Consolas, monospace';
    ctx.fillText(item.text, item.indent, y);
  });

  // Breadcrumbs
  ctx.fillStyle = '#0f141f';
  ctx.fillRect(230, 46, 794, 26);
  ctx.fillStyle = '#64748b';
  ctx.font = '11px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('src > tests > e2e > checkout.spec.ts', 248, 63);

  // Code Area
  const codeLines = [
    { num: '01', tokens: [{ text: 'import', col: '#f43f5e' }, { text: ' { test, expect } ', col: '#f1f5f9' }, { text: 'from', col: '#f43f5e' }, { text: " '@playwright/test';", col: '#7dd3fc' }] },
    { num: '02', tokens: [{ text: 'import', col: '#f43f5e' }, { text: ' { TrivyoQualityLab } ', col: '#f1f5f9' }, { text: 'from', col: '#f43f5e' }, { text: " '@/automation/core';", col: '#7dd3fc' }] },
    { num: '03', tokens: [] },
    { num: '04', tokens: [{ text: 'test.describe', col: '#c084fc' }, { text: "('Release Verification Suite', () => {", col: '#f1f5f9' }] },
    { num: '05', tokens: [{ text: "  test('Zero-defect checkout & payment', ", col: '#f1f5f9' }, { text: 'async', col: '#f43f5e' }, { text: ' ({ page }) => {', col: '#f1f5f9' }] },
    { num: '06', tokens: [{ text: '    const', col: '#f43f5e' }, { text: ' qa = ', col: '#f1f5f9' }, { text: 'new', col: '#f43f5e' }, { text: ' TrivyoQualityLab({ tier: ', col: '#f1f5f9' }, { text: "'enterprise'", col: '#7dd3fc' }, { text: ' });', col: '#f1f5f9' }] },
    { num: '07', tokens: [{ text: '    await', col: '#f43f5e' }, { text: ' page.goto(', col: '#f1f5f9' }, { text: "'https://app.trivyo.com/checkout'", col: '#7dd3fc' }, { text: ');', col: '#f1f5f9' }] },
    { num: '08', tokens: [{ text: '    await', col: '#f43f5e' }, { text: ' page.fill(', col: '#f1f5f9' }, { text: "'[data-testid=order-input]'", col: '#7dd3fc' }, { text: ", 'ORD-8942');", col: '#f1f5f9' }] },
    { num: '09', tokens: [{ text: '    await', col: '#f43f5e' }, { text: ' page.click(', col: '#f1f5f9' }, { text: "'button.submit-transaction'", col: '#7dd3fc' }, { text: ');', col: '#f1f5f9' }] },
    { num: '10', tokens: [{ text: '    // Assert 100% verified state before production gate', col: '#64748b' }] },
    { num: '11', tokens: [{ text: '    await', col: '#f43f5e' }, { text: ' expect(page.locator(', col: '#f1f5f9' }, { text: "'.status-badge'", col: '#7dd3fc' }, { text: ")).toHaveText('APPROVED');", col: '#f1f5f9' }] },
    { num: '12', tokens: [{ text: '    expect(', col: '#f1f5f9' }, { text: 'await', col: '#f43f5e' }, { text: ' qa.auditDefects()).toBe(0);', col: '#f1f5f9' }, { text: ' |', col: '#38bdf8' }] },
    { num: '13', tokens: [{ text: "    console.log('✔ Trivyo Zero-Defect Pipeline Certified');", col: '#34d399' }] },
    { num: '14', tokens: [{ text: '  });', col: '#f1f5f9' }] },
    { num: '15', tokens: [{ text: '});', col: '#f1f5f9' }] }
  ];

  ctx.font = '13px "JetBrains Mono", Consolas, monospace';
  codeLines.forEach((line, idx) => {
    const y = 104 + idx * 30;
    // Line Number
    ctx.fillStyle = '#475569';
    ctx.fillText(line.num, 246, y);

    // Code Tokens
    let xOffset = 282;
    line.tokens.forEach(tok => {
      ctx.fillStyle = tok.col;
      ctx.fillText(tok.text, xOffset, y);
      xOffset += ctx.measureText(tok.text).width;
    });
  });

  // Bottom Status Bar
  ctx.fillStyle = '#111722';
  drawRoundedRect(ctx, 0, 640, 1024, 40, 10);
  ctx.fill();
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 640, 1024, 1);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('LF   UTF-8   TypeScript   Ln 12, Col 44   Spaces: 2   ✔ Git: main (Clean)', 20, 664);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// ----------------------------------------------------
// CANVAS TEXTURE GENERATOR 2: AUTOMATION QA TERMINAL
// ----------------------------------------------------
function createTerminalTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 620;
  const ctx = canvas.getContext('2d');

  // Terminal background
  ctx.fillStyle = '#060910';
  drawRoundedRect(ctx, 0, 0, 1024, 620, 14);
  ctx.fill();

  // Emerald hairline border
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 1, 1, 1022, 618, 14);
  ctx.stroke();

  // Terminal Header
  ctx.fillStyle = '#0f172a';
  drawRoundedRect(ctx, 0, 0, 1024, 42, 14);
  ctx.fill();
  ctx.fillRect(0, 22, 1024, 20);

  // Dots
  ctx.fillStyle = '#ff5f56';
  ctx.beginPath(); ctx.arc(24, 21, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffbd2e';
  ctx.beginPath(); ctx.arc(40, 21, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#27c93f';
  ctx.beginPath(); ctx.arc(56, 21, 5, 0, Math.PI * 2); ctx.fill();

  // Terminal Title
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('pnpm test:e2e ~ trivyo-qa-runner (workers: 8)', 82, 25);

  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 11px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('● RUNNER: VERIFIED (64/64 PASSING)', 730, 25);

  // Terminal Body
  ctx.font = '13px "JetBrains Mono", Consolas, monospace';

  // Command Prompt
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('trivyo@qa-cluster:~/repo$', 28, 76);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(' pnpm test:e2e --reporter=line,html', 230, 76);

  ctx.fillStyle = '#64748b';
  ctx.fillText('[TRIVYO QA ENGINE] Booting distributed test matrix on Chromium, Firefox, WebKit, Mobile...', 28, 108);
  ctx.fillText('Running 64 automated regression suites across 4 target platforms:', 28, 132);

  const testOutputs = [
    { mark: '✔', label: '[chromium]', test: 'tests/e2e/checkout-flow.spec.ts:18 › Zero-defect transaction', time: '312ms' },
    { mark: '✔', label: '[firefox] ', test: 'tests/auth/mfa-biometric.spec.ts:24 › OAuth 2.0 PKCE sign-in', time: '218ms' },
    { mark: '✔', label: '[webkit]  ', test: 'tests/perf/core-vitals.spec.ts:44 › LCP latency < 0.6s SLA', time: '175ms' },
    { mark: '✔', label: '[android] ', test: 'tests/appium/device-sync.spec.ts:19 › Native touch & gesture audit', time: '490ms' },
    { mark: '✔', label: '[api-tier]', test: 'tests/api/rest-resilience.spec.ts:08 › Latency under 20ms ceiling', time: '014ms' },
    { mark: '✔', label: '[security]', test: 'tests/sec/penetration-audit.spec.ts:52 › Zero high/critical CVEs', time: '380ms' }
  ];

  testOutputs.forEach((item, idx) => {
    const y = 170 + idx * 32;
    // Checkmark
    ctx.fillStyle = '#10b981';
    ctx.fillText(item.mark, 28, y);
    // Platform label
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(item.label, 48, y);
    // Test text
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(item.test, 155, y);
    // Execution time
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(item.time, 920, y);
  });

  // Progress Bar
  const progY = 375;
  ctx.fillStyle = '#1e293b';
  drawRoundedRect(ctx, 28, progY, 968, 12, 6);
  ctx.fill();

  const progGrad = ctx.createLinearGradient(28, 0, 996, 0);
  progGrad.addColorStop(0, '#38bdf8');
  progGrad.addColorStop(1, '#10b981');
  ctx.fillStyle = progGrad;
  drawRoundedRect(ctx, 28, progY, 968, 12, 6);
  ctx.fill();

  // Summary Card Box
  ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
  drawRoundedRect(ctx, 28, 415, 968, 165, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, 28, 415, 968, 165, 10);
  ctx.stroke();

  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 18px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('✔ 64 PASSED (1.59s)  |  0 FAILED  |  0 FLAKY TESTS', 48, 455);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '13px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('100% PRODUCTION VERIFIED // ZERO DEFECT RATE STANDARD', 48, 490);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('Artifacts: ExtentReport + Playwright Trace generated at dist/reports/index.html', 48, 524);
  ctx.fillText('Deployment Gate: READY FOR ENTERPRISE RELEASE MERGE', 48, 548);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// ----------------------------------------------------
// CANVAS TEXTURE GENERATOR 3: WEB SAAS APP WIREFRAME
// ----------------------------------------------------
function createWebDashboardTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 680;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#080c14';
  drawRoundedRect(ctx, 0, 0, 1024, 680, 14);
  ctx.fill();

  // Sky blue hairline border
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 1, 1, 1022, 678, 14);
  ctx.stroke();

  // Browser Chrome
  ctx.fillStyle = '#0f172a';
  drawRoundedRect(ctx, 0, 0, 1024, 46, 14);
  ctx.fill();
  ctx.fillRect(0, 24, 1024, 22);

  // Window Controls
  ctx.fillStyle = '#ff5f56';
  ctx.beginPath(); ctx.arc(24, 23, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffbd2e';
  ctx.beginPath(); ctx.arc(40, 23, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#27c93f';
  ctx.beginPath(); ctx.arc(56, 23, 5, 0, Math.PI * 2); ctx.fill();

  // Nav Arrows ‹ › ↻
  ctx.fillStyle = '#64748b';
  ctx.font = '15px sans-serif';
  ctx.fillText('‹   ›   ↻', 80, 27);

  // URL Bar
  ctx.fillStyle = '#090e18';
  drawRoundedRect(ctx, 150, 7, 720, 32, 6);
  ctx.fill();
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, 150, 7, 720, 32, 6);
  ctx.stroke();

  ctx.fillStyle = '#10b981';
  ctx.font = '12px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('🔒 https://app.trivyo.com/analytics/dashboard', 170, 28);

  // App Nav Header
  ctx.fillStyle = '#0b1120';
  ctx.fillRect(0, 46, 1024, 52);
  ctx.strokeStyle = '#1e293b';
  ctx.beginPath(); ctx.moveTo(0, 98); ctx.lineTo(1024, 98); ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 16px system-ui, sans-serif';
  ctx.fillText('TRIVYO // SYSTEM PLATFORM', 24, 78);

  const navItems = ['Overview', 'Test Matrix', 'Pipelines', 'Release Gate'];
  navItems.forEach((item, idx) => {
    ctx.fillStyle = idx === 0 ? '#ffffff' : '#64748b';
    ctx.font = (idx === 0 ? 'bold ' : '') + '13px system-ui, sans-serif';
    ctx.fillText(item, 340 + idx * 110, 78);
    if (idx === 0) {
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(340 + idx * 110, 95, ctx.measureText(item).width, 3);
    }
  });

  ctx.fillStyle = '#10b981';
  ctx.beginPath(); ctx.arc(900, 75, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f8fafc';
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillText('Lead QA Architect', 912, 79);

  // 3 Metric KPI Cards
  const cards = [
    { title: 'TEST AUTOMATION PASS', val: '99.98%', sub: '+4.2% stability vs last sprint', color: '#10b981' },
    { title: 'AVERAGE LATENCY SLA', val: '18.4ms', sub: '90% faster than legacy cloud', color: '#38bdf8' },
    { title: 'PRODUCTION DEFECTS', val: '0 CRITICAL', sub: 'Zero-defect gate standard', color: '#f59e0b' }
  ];

  cards.forEach((c, idx) => {
    const x = 24 + idx * 328;
    ctx.fillStyle = '#0c1424';
    drawRoundedRect(ctx, x, 116, 316, 105, 10);
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, x, 116, 316, 105, 10);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px "JetBrains Mono", Consolas, monospace';
    ctx.fillText(c.title, x + 20, 142);

    ctx.fillStyle = c.color;
    ctx.font = 'bold 26px system-ui, sans-serif';
    ctx.fillText(c.val, x + 20, 180);

    ctx.fillStyle = '#64748b';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(c.sub, x + 20, 204);
  });

  // Centerpiece UI Wireframe Chart
  ctx.fillStyle = '#0a101d';
  drawRoundedRect(ctx, 24, 238, 976, 260, 10);
  ctx.fill();
  ctx.strokeStyle = '#1e293b';
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 13px system-ui, sans-serif';
  ctx.fillText('AUTOMATED TEST VELOCITY & REGRESSION STABILITY (LAST 30 SPRINTS)', 46, 268);

  // Chart Grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let y = 305; y <= 455; y += 35) {
    ctx.beginPath(); ctx.moveTo(46, y); ctx.lineTo(970, y); ctx.stroke();
  }

  // Glowing Wave Chart Line
  const chartPoints = [
    [50, 440], [140, 420], [230, 390], [320, 370], [410, 385],
    [500, 340], [590, 320], [680, 335], [770, 310], [860, 295], [960, 280]
  ];

  ctx.beginPath();
  ctx.moveTo(chartPoints[0][0], chartPoints[0][1]);
  for (let i = 1; i < chartPoints.length; i++) {
    ctx.lineTo(chartPoints[i][0], chartPoints[i][1]);
  }
  ctx.lineTo(960, 465);
  ctx.lineTo(50, 465);
  ctx.closePath();

  const chartFill = ctx.createLinearGradient(0, 280, 0, 465);
  chartFill.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
  chartFill.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
  ctx.fillStyle = chartFill;
  ctx.fill();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(chartPoints[0][0], chartPoints[0][1]);
  for (let i = 1; i < chartPoints.length; i++) {
    ctx.lineTo(chartPoints[i][0], chartPoints[i][1]);
  }
  ctx.stroke();

  chartPoints.forEach(pt => {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(pt[0], pt[1], 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(pt[0], pt[1], 3.5, 0, Math.PI * 2); ctx.stroke();
  });

  // Bottom Wireframe Action & Table Row
  ctx.fillStyle = '#0c1424';
  drawRoundedRect(ctx, 24, 514, 976, 145, 10);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 12px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('ACTIVE SERVICE RELEASES', 46, 544);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('PR-419  ›  Checkout Microservice  ›  32/32 tests passed  ›  Coverage: 100%  ›', 46, 580);
  ctx.fillStyle = '#10b981';
  ctx.fillText('[ PASSED ● ]', 880, 580);

  ctx.fillStyle = '#94a3b8';
  ctx.fillText('PR-420  ›  Auth OAuth 2.0 PKCE   ›  18/18 tests passed  ›  Coverage: 100%  ›', 46, 614);
  ctx.fillStyle = '#10b981';
  ctx.fillText('[ PASSED ● ]', 880, 614);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// ----------------------------------------------------
// CANVAS TEXTURE GENERATOR 4: MOBILE PHONE WIREFRAME
// ----------------------------------------------------
function createMobileWireframeTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Phone chassis background
  ctx.fillStyle = '#070a12';
  drawRoundedRect(ctx, 0, 0, 512, 1024, 40);
  ctx.fill();

  // Subtle border
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 2, 2, 508, 1020, 40);
  ctx.stroke();

  // Dynamic Island
  ctx.fillStyle = '#0f172a';
  drawRoundedRect(ctx, 176, 24, 160, 32, 16);
  ctx.fill();
  ctx.fillStyle = '#1e293b';
  ctx.beginPath(); ctx.arc(310, 40, 4.5, 0, Math.PI * 2); ctx.fill();

  // Mobile Status Bar
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 13px system-ui, sans-serif';
  ctx.fillText('9:41', 40, 45);
  ctx.fillText('5G  [||||] 100%', 390, 45);

  // App Navigation
  ctx.fillStyle = '#f07849';
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.fillText('Trivyo Mobile QA', 40, 104);

  ctx.fillStyle = '#64748b';
  ctx.font = '12px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('Appium 2.0 // Device Lab', 40, 126);

  // Card 1: Active Test Target
  ctx.fillStyle = '#0f172a';
  drawRoundedRect(ctx, 32, 155, 448, 135, 14);
  ctx.fill();
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, 32, 155, 448, 135, 14);
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('CONNECTED DEVICE MATRIX', 52, 185);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px system-ui, sans-serif';
  ctx.fillText('Google Pixel 8 & iPhone 15 Pro', 52, 215);

  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 12px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('✔ STATUS: HIGH FIDELITY SYNC (60 FPS)', 52, 252);

  // Card 2: Touch & Gesture Automation Wireframe
  ctx.fillStyle = '#0f172a';
  drawRoundedRect(ctx, 32, 310, 448, 260, 14);
  ctx.fill();
  ctx.strokeStyle = 'rgba(240, 120, 73, 0.35)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, 32, 310, 448, 260, 14);
  ctx.stroke();

  ctx.fillStyle = '#f07849';
  ctx.font = 'bold 12px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('TOUCH & GESTURE AUTOMATION', 52, 342);

  ctx.strokeStyle = '#f07849';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(80, 430);
  ctx.bezierCurveTo(180, 380, 300, 470, 400, 410);
  ctx.stroke();
  ctx.setLineDash([]);

  // Touch Target Point
  ctx.fillStyle = 'rgba(255, 87, 34, 0.2)';
  ctx.beginPath(); ctx.arc(400, 410, 22, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ff5722';
  ctx.beginPath(); ctx.arc(400, 410, 7, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '12px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('● TAP REGISTERED (x: 400, y: 410)', 110, 508);
  ctx.fillStyle = '#10b981';
  ctx.fillText('Response Latency: 11.2ms (Zero Drop)', 110, 532);

  // Card 3: Offline-First SQLite Sync
  ctx.fillStyle = '#0f172a';
  drawRoundedRect(ctx, 32, 595, 448, 140, 14);
  ctx.fill();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('OFFLINE-FIRST RESILIENCE', 52, 626);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.fillText('Automated Network Partition Test', 52, 656);

  // Toggle switch in ON state
  ctx.fillStyle = '#10b981';
  drawRoundedRect(ctx, 370, 638, 66, 30, 15);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(420, 653, 11, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#64748b';
  ctx.font = '11px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('Sync queue: 0 pending · Zero data loss', 52, 695);

  // Card 4: Action Button Wireframe
  ctx.fillStyle = '#ff5722';
  drawRoundedRect(ctx, 32, 760, 448, 60, 12);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.fillText('RUN MOBILE E2E SUITE ↗', 145, 797);

  // Mobile Bottom Tab Bar
  ctx.fillStyle = '#0a0f1d';
  drawRoundedRect(ctx, 0, 930, 512, 94, 18);
  ctx.fill();

  const tabs = ['Home', 'Tests', 'Traces', 'Config'];
  tabs.forEach((tab, idx) => {
    ctx.fillStyle = idx === 1 ? '#ff5722' : '#64748b';
    ctx.font = (idx === 1 ? 'bold ' : '') + '12px system-ui, sans-serif';
    ctx.fillText(tab, 48 + idx * 115, 978);
  });

  // Home Indicator Bar
  ctx.fillStyle = '#ffffff';
  drawRoundedRect(ctx, 166, 1004, 180, 5, 2.5);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// ----------------------------------------------------
// FULLSCREEN 3D SOFTWARE WIREFRAME ENGINE (OPTION A)
// ----------------------------------------------------
async function mountDeepZoomArchitecture() {
  const canvas = document.querySelector('#webgl-canvas');
  const pause = document.querySelector('#motion-toggle');
  const altitudeEl = document.querySelector('#hud-altitude');
  const statusEl = document.querySelector('#scene-hud-status');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!canvas) return;

  let renderer;
  try {
    const THREE = await import('three');
    window.THREE = THREE;

    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    // Atmospheric dark obsidian fog (Linear/Vercel standard)
    scene.fog = new THREE.FogExp2(0x07090e, 0.018);

    const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 150);
    camera.position.set(0, 1.6, 18);

    const universe = new THREE.Group();
    scene.add(universe);

    // Glowing Particle Texture for Data Streams
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 64;
    glowCanvas.height = 64;
    const gCtx = glowCanvas.getContext('2d');
    const grad = gCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(56, 189, 248, 0.85)');
    grad.addColorStop(0.6, 'rgba(14, 165, 233, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    gCtx.fillStyle = grad;
    gCtx.fillRect(0, 0, 64, 64);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);

    // ------------------------------------------------
    // 0. BLUEPRINT HIGHWAY GRID FLOOR (EXTENDS Z: +20 TO -120)
    // ------------------------------------------------
    const gridFloor = new THREE.GridHelper(180, 90, 0x38bdf8, 0x111827);
    gridFloor.position.set(0, -5, -45);
    universe.add(gridFloor);

    // Runway coordinate laser markers along the ground
    const runwayGeo = new THREE.BufferGeometry();
    const runwayPositions = [];
    for (let z = 20; z >= -110; z -= 5) {
      runwayPositions.push(-7, -4.95, z);
      runwayPositions.push(7, -4.95, z);
      runwayPositions.push(0, -4.95, z);
    }
    runwayGeo.setAttribute('position', new THREE.Float32BufferAttribute(runwayPositions, 3));
    const runwayMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.18,
      map: glowTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    universe.add(new THREE.Points(runwayGeo, runwayMat));

    // Helper: Build a 3D Glass Floating Window with Wireframe Borders
    function create3DWindow(texture, width, height, borderColor, depth = 0.08) {
      const group = new THREE.Group();

      // Front Textured Face
      const planeGeo = new THREE.PlaneGeometry(width, height);
      const planeMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.96,
        side: THREE.FrontSide
      });
      const planeMesh = new THREE.Mesh(planeGeo, planeMat);
      planeMesh.position.z = depth * 0.5 + 0.005;
      group.add(planeMesh);

      // Glass Backing Plate
      const boxGeo = new THREE.BoxGeometry(width, height, depth);
      const glassMat = new THREE.MeshBasicMaterial({
        color: 0x070b12,
        transparent: true,
        opacity: 0.88
      });
      const glassMesh = new THREE.Mesh(boxGeo, glassMat);
      group.add(glassMesh);

      // Wireframe Glowing Edges
      const edges = new THREE.EdgesGeometry(boxGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: borderColor,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      const edgeLines = new THREE.LineSegments(edges, edgeMat);
      group.add(edgeLines);

      return group;
    }

    // ------------------------------------------------
    // 1. GENERATE APPLICATION WIREFRAME TEXTURES
    // ------------------------------------------------
    const codeEditorTex = createCodeEditorTexture(THREE);
    const terminalTex = createTerminalTexture(THREE);
    const webDashboardTex = createWebDashboardTexture(THREE);
    const mobileTex = createMobileWireframeTexture(THREE);

    // Apply maximum anisotropy for ultra-sharp text at acute 3D angles
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    [codeEditorTex, terminalTex, webDashboardTex, mobileTex].forEach(tex => {
      tex.anisotropy = maxAniso;
    });

    // ------------------------------------------------
    // 2. HERO DEVELOPER SPATIAL WORKSTATION (RIGHT-SIDE DEDICATED SHOWCASE)
    // ------------------------------------------------
    // Positioned strictly on the RIGHT half of the viewport (x: 4.8)
    // The LEFT half is 100% clean obsidian dark space for razor-sharp typography!
    const heroStation = new THREE.Group();
    universe.add(heroStation);

    // Responsive position calculation for heroStation
    function updateHeroStationLayout() {
      const w = window.innerWidth;
      if (w < 768) {
        // Mobile: Push below hero content with smaller scale
        heroStation.position.set(0, -6.5, -4);
        heroStation.scale.setScalar(0.62);
      } else if (w < 1120) {
        // Tablet: Moderate offset right
        heroStation.position.set(3.4, 0.2, -1.0);
        heroStation.scale.setScalar(0.85);
      } else {
        // Desktop: Dedicated right showcase column (Zero overlap with left text!)
        heroStation.position.set(4.8, 0.4, 0);
        heroStation.scale.setScalar(1.0);
      }
    }
    updateHeroStationLayout();

    // 3D Code Editor Window (Right-center, tilted slightly toward viewer)
    const codeWindow = create3DWindow(codeEditorTex, 6.4, 4.2, 0x38bdf8);
    codeWindow.position.set(-1.4, 1.3, 0.4);
    codeWindow.rotation.set(-0.10, 0.22, 0.02);
    heroStation.add(codeWindow);

    // 3D Web Dashboard Window (Layered behind and to the right)
    const webWindow = create3DWindow(webDashboardTex, 6.4, 4.2, 0x38bdf8);
    webWindow.position.set(2.2, 1.7, -2.2);
    webWindow.rotation.set(-0.12, -0.22, -0.02);
    heroStation.add(webWindow);

    // 3D Automation QA Console Terminal (Lower Center of the right cluster)
    const heroTerminal = create3DWindow(terminalTex, 5.8, 3.6, 0x10b981);
    heroTerminal.position.set(-0.6, -1.8, 1.8);
    heroTerminal.rotation.set(-0.25, 0.12, 0.02);
    heroStation.add(heroTerminal);

    // 3D Mobile Phone Wireframe (Right side of the cluster)
    const mobileWindow = create3DWindow(mobileTex, 2.1, 4.2, 0xf07849);
    mobileWindow.position.set(3.5, -0.8, 2.4);
    mobileWindow.rotation.set(-0.08, -0.28, 0.04);
    heroStation.add(mobileWindow);

    // Real-time QA Verification Laser Sweep Line across Terminal
    const qaLaserGeo = new THREE.BufferGeometry();
    qaLaserGeo.setAttribute('position', new THREE.Float32BufferAttribute([-2.9, 0, 0.1, 2.9, 0, 0.1], 3));
    const qaLaserMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const qaLaser = new THREE.Line(qaLaserGeo, qaLaserMat);
    heroTerminal.add(qaLaser);

    // ------------------------------------------------
    // 3. 3D GLOWING DATA CABLES LINKING WINDOWS
    // ------------------------------------------------
    const cables = [
      // Code Editor to QA Terminal
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.0, 0.4, 0.4),
        new THREE.Vector3(-0.8, -0.6, 1.2),
        new THREE.Vector3(-0.6, -1.0, 1.8)
      ]),
      // QA Terminal to Web Dashboard
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.6, -1.0, 1.8),
        new THREE.Vector3(1.5, -0.2, 0.0),
        new THREE.Vector3(1.8, 0.5, -2.2)
      ]),
      // Web Dashboard to Mobile Mockup
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(2.5, 0.2, -2.2),
        new THREE.Vector3(3.2, -0.2, 0.2),
        new THREE.Vector3(3.5, -0.4, 2.4)
      ])
    ];

    const cableMaterials = [
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending }),
      new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending }),
      new THREE.LineBasicMaterial({ color: 0xf07849, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending })
    ];

    cables.forEach((c, idx) => {
      const pts = c.getPoints(40);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, cableMaterials[idx % cableMaterials.length]);
      heroStation.add(line);
    });

    // Traveling Energy Pulses along Data Cables
    const PULSE_COUNT = 15;
    const pulsePositions = new Float32Array(PULSE_COUNT * 3);
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.28,
      map: glowTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
    heroStation.add(pulsePoints);

    // ------------------------------------------------
    // 4. CONTINUOUS AMBIENT DATA HIGHWAY ON THE FLOOR
    // ------------------------------------------------
    const STREAM_COUNT = 70;
    const streamGeo = new THREE.BufferGeometry();
    const streamPositions = new Float32Array(STREAM_COUNT * 3);
    const streamData = [];

    for (let i = 0; i < STREAM_COUNT; i++) {
      streamData.push({
        lane: (i % 6 - 2.5) * 1.8,
        y: -4.8,
        z: (Math.random() - 0.5) * 90,
        speed: 10 + Math.random() * 15
      });
      streamPositions[i * 3] = streamData[i].lane;
      streamPositions[i * 3 + 1] = streamData[i].y;
      streamPositions[i * 3 + 2] = streamData[i].z;
    }
    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
    const streamMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.28,
      map: glowTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const streamPoints = new THREE.Points(streamGeo, streamMat);
    universe.add(streamPoints);

    // ------------------------------------------------
    // 5. CAMERA SCROLL CHOREOGRAPHY (OPTION A: HERO SHOWCASE -> SEAMLESS FADE)
    // ------------------------------------------------
    let scrollFraction = 0;
    let targetCameraZ = 18;
    let targetCameraY = 1.6;
    let targetCameraX = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    let currentCameraZ = 18;
    let currentCameraY = 1.6;
    let currentCameraX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    function onScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      scrollFraction = window.scrollY / maxScroll;

      // In Option A:
      // In the Hero (0.0 to 0.22): The camera glides subtly forward through the developer workspace.
      // Between 0.18 and 0.32: The 3D windows gracefully fade out into the dark fog.
      // Beyond 0.32: The camera smoothly hovers along the calm floor grid with subtle data streams.
      // This guarantees 100% reading comfort and clarity for the services, proof points, and contact.

      const fadeStart = 0.16;
      const fadeEnd = 0.30;
      let heroAlpha = 1.0;
      if (scrollFraction > fadeStart) {
        heroAlpha = Math.max(0, 1 - (scrollFraction - fadeStart) / (fadeEnd - fadeStart));
      }

      heroStation.visible = heroAlpha > 0.01;
      heroStation.traverse(child => {
        if (child.material) {
          if (child.userData.baseOpacity === undefined) {
            child.userData.baseOpacity = child.material.opacity !== undefined ? child.material.opacity : 1.0;
          }
          child.material.opacity = child.userData.baseOpacity * heroAlpha;
          child.material.transparent = true;
        }
      });
      pulsePoints.material.opacity = 0.95 * heroAlpha;

      if (scrollFraction < 0.25) {
        // Hero developer workspace flythrough
        const f = scrollFraction / 0.25;
        targetCameraZ = 18 - f * 8; // Move from 18 to 10
        targetCameraY = 1.6 - f * 0.8;
        targetCameraX = f * 0.4;
        targetRotY = f * 0.1;
        targetRotX = -0.04;
      } else {
        // Calm ambient runway for reading content
        const f = (scrollFraction - 0.25) / 0.75;
        targetCameraZ = 10 - f * 40;
        targetCameraY = 0.8 - f * 1.2;
        targetCameraX = 0;
        targetRotY = 0;
        targetRotX = 0.02;
      }

      // Update HUD Status & Altitude
      const stageIndex = Math.min(STAGES.length - 1, Math.floor(scrollFraction * STAGES.length));
      const activeStage = STAGES[stageIndex];

      if (altitudeEl) {
        altitudeEl.textContent = activeStage.altitude;
      }
      if (statusEl) {
        statusEl.textContent = activeStage.status;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ------------------------------------------------
    // 6. MOUSE PARALLAX
    // ------------------------------------------------
    let mouseNormX = 0;
    let mouseNormY = 0;

    window.addEventListener('pointermove', event => {
      mouseNormX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseNormY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // ------------------------------------------------
    // 7. MOTION TOGGLE & RESIZE
    // ------------------------------------------------
    let paused = reduced.matches;
    function updatePauseState() {
      if (!pause) return;
      pause.textContent = paused ? 'Resume motion' : 'Pause motion';
      pause.setAttribute('aria-pressed', String(paused));
    }
    updatePauseState();
    if (pause) {
      pause.addEventListener('click', () => {
        paused = !paused;
        updatePauseState();
      });
    }
    reduced.addEventListener('change', event => {
      paused = event.matches;
      updatePauseState();
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateHeroStationLayout();
    });

    // ------------------------------------------------
    // 8. ANIMATION LOOP
    // ------------------------------------------------
    let lastTime = 0;
    let laserY = 0;
    let laserDir = 1;

    renderer.setAnimationLoop(time => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const t = time * 0.001;

      // Camera Damping (Smooth Interpolation)
      currentCameraZ += (targetCameraZ - currentCameraZ) * 0.07;
      currentCameraY += (targetCameraY - currentCameraY) * 0.07;
      currentCameraX += (targetCameraX - currentCameraX) * 0.07;

      currentRotY += (targetRotY - currentRotY) * 0.07;
      currentRotX += (targetRotX - currentRotX) * 0.07;

      // Parallax mouse offsets (Only active in Hero)
      const parallaxFactor = Math.max(0, 1 - scrollFraction * 3.5);
      const mouseParallaxX = mouseNormX * 1.0 * parallaxFactor;
      const mouseParallaxY = mouseNormY * 0.6 * parallaxFactor;

      camera.position.x = currentCameraX + mouseParallaxX;
      camera.position.y = currentCameraY + mouseParallaxY;
      camera.position.z = currentCameraZ;

      camera.lookAt(
        currentCameraX * 0.3 + mouseParallaxX * 0.2,
        currentCameraY * 0.3 + mouseParallaxY * 0.2,
        currentCameraZ - 20
      );

      // QA Laser Sweep across Terminal
      laserY += delta * laserDir * 1.8;
      if (laserY > 1.7) laserDir = -1;
      if (laserY < -1.7) laserDir = 1;
      qaLaser.position.y = laserY;

      // Floating gentle motion on wireframe windows
      codeWindow.position.y = 1.3 + Math.sin(t * 1.2) * 0.05;
      webWindow.position.y = 1.7 + Math.cos(t * 1.4) * 0.05;
      mobileWindow.position.y = -0.8 + Math.sin(t * 1.6) * 0.06;
      heroTerminal.position.y = -1.8 + Math.sin(t * 1.3) * 0.04;

      // Stream high-speed packets along highway
      const sPos = streamGeo.attributes.position.array;
      for (let i = 0; i < STREAM_COUNT; i++) {
        const s = streamData[i];
        if (!paused) {
          s.z -= delta * s.speed;
          if (s.z < -45) s.z += 90;
        }
        sPos[i * 3 + 2] = s.z;
      }
      streamGeo.attributes.position.needsUpdate = true;

      // Animate energy pulses flowing across fiber cables
      if (!paused && heroStation.visible) {
        const pArr = pulseGeo.attributes.position.array;
        for (let i = 0; i < PULSE_COUNT; i++) {
          const cableIdx = i % cables.length;
          const progress = ((t * 0.35 + i * (1 / PULSE_COUNT)) % 1);
          const pt = cables[cableIdx].getPoint(progress);
          pArr[i * 3] = pt.x;
          pArr[i * 3 + 1] = pt.y;
          pArr[i * 3 + 2] = pt.z;
        }
        pulseGeo.attributes.position.needsUpdate = true;
      }

      // Render Scene
      renderer.render(scene, camera);
    });

  } catch (err) {
    console.error('Three.js Option A Architecture error:', err);
    if (pause) {
      pause.disabled = true;
      pause.textContent = 'Static view';
    }
  }
}

mountDeepZoomArchitecture();

# Trivyo Solutions

Professional company website for software development, quality engineering, workflow automation, and AI agent services.

Production domain: https://trivyo.in/

## Local review

This redesign is on the local `codex/trivyo-redesign` branch. It has not been pushed or published. Release only after the owner approves the local preview.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Requires Node.js 24. Open the URL printed by the local server. GitHub Pages deployment is configured on `main`; `public/CNAME` preserves the custom domain.

## Design and interactions

One fixed Three.js canvas renders behind the company page. An original parametric ribbon surface uses GPU morph targets, reflective materials, and environment lighting. Scroll selects shapes and compositions; pointer movement adds parallax, and dragging changes orientation. The motion button controls ambient animation. Reduced-motion preferences stop ambient movement and switch forms immediately. Rendering pauses while the document is hidden. Pixel density and mobile geometry complexity are capped; resources are disposed on teardown.

No models, images, code, textures, branding, or text from the reference website were copied. The page does not embed test execution reports or redirect visitors to a founder portfolio or GitHub project. Contact links open an email client or LinkedIn; no enquiry backend or analytics was added.

- `index.html`: company content, navigation, contact links, and metadata.
- `src/style.css`: typography, responsive layout, foreground/background composition, and legal page styles.
- `src/main.js`: navigation and service accordion behavior.
- `src/background.js`: original full-viewport Three.js scene.
- `privacy.html`, `terms.html`: existing legal content.

Space Grotesk is self-hosted under the SIL Open Font License; see `public/fonts/OFL.txt`. Three.js is MIT licensed. AI assisted the implementation.

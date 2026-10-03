# Trivyo Solutions

Professional company website for software development, quality engineering, workflow automation, and AI agent services.

Production domain: https://trivyo.in/

## Local review

This redesign is on `codex/trivyo-scroll-experience`. The branch is pushed for review; production and `main` remain unchanged. Release only after the owner approves the local preview.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Requires Node.js 24. Open the URL printed by the local server. GitHub Pages deployment is configured on `main`; `public/CNAME` preserves the custom domain.

## Design and interactions

One fixed Three.js canvas renders an original architectural lowercase “t” behind the company page. Its 48 instanced structural members separate into four service layers, connected frames, and delivery steps. The full-page “Moving parts. Working systems.” sequence continuously interpolates these arrangements with native scroll; reversing scroll reverses the construction. Perspective, position, and depth also follow the narrative. Pointer movement and bounded dragging add subtle viewpoint control. Opening a service highlights its layer.

The motion button disables interpolation and pointer effects, showing each composition immediately. Reduced-motion preferences also shorten the scroll sequence into one ordinary section. Rendering is demand-driven and stops when idle or hidden. Pixel density is capped, geometry is shared across instances, and GPU resources and listeners are disposed on teardown. If WebGL cannot initialize or its context is lost, the company content and navigation stay available against the static background.

No models, images, code, textures, branding, or text from the reference website were copied. The page does not embed test execution reports or redirect visitors to a founder portfolio or GitHub project. Contact links open an email client or LinkedIn; no enquiry backend or analytics was added.

- `index.html`: company content, navigation, contact links, and metadata.
- `src/style.css`: typography, responsive layout, foreground/background composition, and legal page styles.
- `src/main.js`: navigation and service accordion behavior.
- `src/background.js`: original full-viewport Three.js scene.
- `privacy.html`, `terms.html`: existing legal content.

Space Grotesk is self-hosted under the SIL Open Font License; see `public/fonts/OFL.txt`. Three.js is MIT licensed. AI assisted the implementation.

## Reference study

Live wheel and pointer interactions were inspected, alongside canvas runtime markers, rather than relying on screenshots alone. [Lusion](https://lusion.co/) demonstrated spatial composition and a canvas marked `three.js r158`; [0110 Studio](https://www.0110studio.ca/) demonstrated an integrated background marked `three.js r169`. The earlier [Shape of Intelligence](https://shapeofintelligence.com/) study informed damped input and readability. These are references for interaction principles; Trivyo's geometry, layout, words, palette, and scroll arrangements are original. The scene uses no external models or textures.

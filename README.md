# Trivyo Solutions

Independent freelance software studio of Ravikumar Tamilmani: QA, web application development, workflow automation, and agent setup.

**Website:** https://ravitamil.github.io/trivyo-solutions/

## Run locally

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the displayed URL with `/trivyo-solutions/` appended. `npm run build` creates `dist/`; `npm run preview` previews that build.

## Contents

- `index.html`: service copy, founder details, contact links, and search metadata.
- `src/style.css`: responsive design, self-hosted typography, and reduced-motion styles.
- `src/main.js`: accessible navigation, service accordion, and interactive Three.js sculpture.
- `public/`: favicon, actual QA project screenshot, licensed font, robots, and sitemap.
- `.github/workflows/pages.yml`: automatic GitHub Pages publishing on pushes to `main`.

The Three.js artwork supports service transformations, dragging, pause/resume, reduced-motion preferences, and a static fallback when WebGL is unavailable. It pauses rendering when outside the viewport or the tab is hidden. Contact links open an email client or LinkedIn; there is no contact backend or tracking.

The email address is from the founder's connected GitHub profile. The featured Quality Lab screenshot is genuine public project evidence. No clients, testimonials, performance claims, prices, or additional team members are invented. AI assisted the implementation.

## Custom domain later

After purchasing a domain, configure **Settings → Pages → Custom domain**, add the DNS records required by GitHub, enable HTTPS, update the Vite base to `/`, and replace the canonical, Open Graph, structured data, robots, and sitemap URLs.

Space Grotesk is distributed under the SIL Open Font License; see `public/fonts/OFL.txt`. Three.js is MIT licensed.

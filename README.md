# Trivyo Solutions

Company website for AI enablement, custom software, and quality engineering for small and medium businesses.

Production domain: https://trivyo.in/

## Local review

Requires Node.js 24.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Open the address printed by the local server. Pushes to main publish through GitHub Pages. The custom domain is configured in public/CNAME.

## Site

- index.html contains the homepage, scroll-driven workflow story, FAQs, and project brief.
- src/site.css contains shared styles and responsive layouts.
- src/site.js handles GSAP typography and scroll animations, workflow stage navigation, service enquiry selection, and the email brief.
- public/brand contains the Forward flow vector logo and mark variants.
- privacy.html and terms.html contain legal pages.

The workflow story illustrates the service approach without customer records or claimed performance results. The project brief opens the visitor’s email app and provides a clipboard fallback. There is no form backend. All content remains readable without JavaScript, and direct email contact remains available.

The site respects reduced-motion preferences. Manrope and Source Sans 3 are self-hosted under the SIL Open Font License. Their licence files are in public/fonts.

# Simon & Ratna — Wedding Website

Church-themed wedding site built with **Vite + React + Framer Motion (`motion`) + Lenis** smooth scroll, in **English and Telugu** (i18next).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in /dist
```

## Customize

- **All visible text (both languages):** `src/locales/en.js` and `src/locales/te.js` — names, venues, times, verses, captions, buttons.
- **Date, map links, RSVP form link, music:** `src/data.js`
- **Photos:** put them in `public/photos/` as `groom.jpg`, `bride.jpg`, `1.jpg` … `9.jpg`
  (missing photos show a gold monogram placeholder).

## Languages

Guests switch with the EN / తె toggle (bottom-left); their choice is remembered.
Share a link that opens straight in Telugu with `?lng=te`, e.g. `https://your-site/?lng=te`.

## WhatsApp link preview

`public/og-image.jpg` is the preview card. WhatsApp needs the site's full address to show it:

- **Netlify / Vercel:** detected automatically at build time.
- **Anywhere else:** create a `.env` file with `SITE_URL=https://your-site-address` before `npm run build`.

WhatsApp caches previews — if you shared the link before deploying, the old preview may linger for a while.

## Deploy

Drag the `dist/` folder onto [Netlify Drop](https://app.netlify.com/drop) (set `SITE_URL` first, since Drop has no build step), or import the repo on Netlify/Vercel.

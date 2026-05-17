# Aperia Visuals — Deployment Package

Production-ready static site for **aperiavisuals.com**. Drop this whole folder into Vercel, Netlify, Cloudflare Pages, or any static host.

## Quick deploy (Vercel — recommended)

1. Push this folder to a GitHub repo (or use Vercel CLI to deploy directly).
2. Connect the repo to Vercel and deploy — no build step needed.
3. Add your custom domain (`aperiavisuals.com`) in Vercel project settings.
4. Update DNS at Cloudflare Registrar to point to Vercel's nameservers (or set a CNAME).

**Vercel CLI alternative:**
```
npm i -g vercel
vercel --prod
```

## File structure

```
deploy/
├── index.html              Home — hero, river of frames, disciplines, contact
├── food.html               Food photography discipline page
├── architecture.html       Architecture & Interiors (with cinema-reel sticky scrub)
├── events.html             Events discipline page
├── portraits.html          Portraits with 5 series (Studio/Street/Yard/BTS/Field)
├── sports-brand.html       Sports & Brand (NEW — broadcast aesthetic)
├── story.html              About / studio bio
├── images/                 179 photos (~28 MB)
├── favicon.svg             A-mark favicon
├── vercel.json             Routing config (clean URLs + cache headers)
├── robots.txt              Search engine permission
├── sitemap.xml             For search engine crawling
└── README.md               This file
```

## What works out of the box

- All 7 pages link to each other consistently
- Nav menu + mobile drawer on every page
- Lightbox on photo galleries (events, portraits, food, architecture, sports-brand)
- Cinema reel sticky-scrub on Architecture
- River-of-frames parallax on Home
- Page loader animation on Home
- Smooth scroll, reveal-on-scroll, image hover effects everywhere

## What you should update before going live

### 1. Social links (currently placeholder `#`)
Find-replace in these files: `index.html`, `architecture.html`.

**Instagram is already set** to `https://instagram.com/collinsallindi`. Update:
- Behance: `<a href="#">Behance</a>` → your URL
- Vimeo: `<a href="#">Vimeo</a>` → your URL
- LinkedIn: `<a href="#">LinkedIn</a>` → your URL

### 2. Contact email
Currently the contact CTA is anchor-based (`index.html#contact`). The actual email on the contact section may also need updating — search `mailto:` to verify.

### 3. Open Graph meta (optional, recommended)
For nicer link previews on social media. Add to each page's `<head>`:
```html
<meta property="og:title" content="Aperia Visuals">
<meta property="og:image" content="https://aperiavisuals.com/images/cover-XX.jpg">
<meta property="og:url" content="https://aperiavisuals.com/">
```

### 4. Analytics (optional)
Add Plausible / Fathom / Google Analytics by inserting a single `<script>` tag in each `<head>`.

## Domain setup notes

You purchased `aperiavisuals.com` at Cloudflare Registrar. Two paths:

**Option A — Vercel + Cloudflare DNS only (recommended)**
- Keep domain at Cloudflare, point DNS records to Vercel
- Cloudflare's Nairobi PoP serves you fast locally
- Get free SSL from Vercel

**Option B — Cloudflare Pages directly**
- Push to GitHub, connect Cloudflare Pages
- Hosting AND DNS on same vendor
- Slightly trickier deploy workflow but unified billing

## Performance notes

All pages are now **under 100 KB of HTML** (down from 4-6 MB inlined previews). Images are referenced externally with `loading="lazy"` so they stream in as the user scrolls.

The `vercel.json` sets aggressive caching on `/images/` (1 year, immutable) — first visit downloads images once, all subsequent visits are instant.

## File sizes summary

| Page | Size | Image refs |
|---|---|---|
| index.html | 85 KB | 29 |
| sports-brand.html | 43 KB | 26 |
| architecture.html | 84 KB | 13 |
| portraits.html | 82 KB | 63 |
| events.html | 74 KB | 38 |
| story.html | 55 KB | 5 |
| food.html | 55 KB | 26 |
| **Total HTML** | **478 KB** | — |
| **Images** | **27.6 MB** | 179 files |
| **Grand total** | **~28 MB** | — |

## Built with

- Vanilla HTML / CSS / JS (no framework, no build step)
- Fonts: Fraunces (display), Hanken Grotesk (body), JetBrains Mono (data)
- Brand: `#0A0908` bg, `#F5F1EA` cream, `#C9A36B` gold, `#D4FF3D` chartreuse

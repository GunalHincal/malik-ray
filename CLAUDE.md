# CLAUDE.md — Malik Ray Artist Website

## Project

Build a clean, elegant, static artist website for  **MALIK RAY** , signed to Velora Records.

This site is being built primarily to satisfy a **Spotify for Artists label verification request** that explicitly asks for:

> "Any social media accounts or website links of one of the artist under your roster."
> "We also recommend to list your email address publicly."

The site must be publicly accessible, clearly identify MALIK RAY as an artist under  **Velora Records** , display the label contact email, and list all releases with UPC/ISRC data.

---

## Tech Constraints

* Static website only
* HTML, CSS, vanilla JavaScript
* No backend, no framework
* Mobile-first, fully responsive
* Must be deployable to Vercel or GitHub Pages as-is

---

## File Structure to Create

```
malik-ray/
├── index.html
├── style.css
├── script.js
├── data/
│   └── content.json          ← all release and artist data lives here
└── assets/
    ├── images/
    │   ├── malik-ray.jpg     ← artist photo (provided)
    │   ├── velvet-hours.jpg  ← album cover (provided)
    │   ├── shade-money.jpg   ← single cover (provided)
    │   ├── gold-dont-sleep.jpg ← single cover (provided)
    │   └── black-glass-heart.jpg ← single cover (provided)
    ├── brand/
    │   └── logo.png          ← Velora Records logo (provided)
    └── favicon/
        └── (copy favicon files from Velora Records project)
```

---

## Design Direction

Inherit the **exact same design system** as the Velora Records label website:

* Same CSS variables (colors, typography, spacing)
* Same dark premium aesthetic (`#0a0a0a` background, `#c8a96e` gold accent)
* Same fonts: `Playfair Display` (serif headings) + `Inter` (body/UI)
* Same card style, same button style, same section layout rhythm
* Same nav behavior (scroll shrink, mobile hamburger)
* Same fade-in on scroll via IntersectionObserver

**Feel:** This is an artist's official page, not the label page. Slightly more personal and atmospheric — the hero should feature the artist photo prominently.

---

## CSS Variables (copy these exactly)

```css
:root {
  --bg:          #0a0a0a;
  --bg-2:        #111111;
  --bg-3:        #161616;
  --bg-card:     #141414;
  --border:      rgba(255,255,255,0.08);
  --border-hi:   rgba(255,255,255,0.18);
  --gold:        #c8a96e;
  --gold-light:  #e2c898;
  --white:       #ffffff;
  --white-90:    rgba(255,255,255,0.90);
  --white-60:    rgba(255,255,255,0.60);
  --white-35:    rgba(255,255,255,0.35);
  --white-15:    rgba(255,255,255,0.15);
  --font-serif:  'Playfair Display', Georgia, serif;
  --font-sans:   'Inter', system-ui, sans-serif;
  --ease:        cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --radius:      4px;
  --radius-lg:   8px;
  --section-gap: 120px;
  --container:   1200px;
}
```

---

## Required Pages and Sections

Single-page site (`index.html`) with these sections:

### 1. NAV

* Left: `MALIK RAY` wordmark (links to #home)
* Right links: `Music`, `About`, `Label`, `Contact`
* Scroll behavior: add `.scrolled` class after 40px scroll (subtle background + border)
* Mobile: hamburger toggle

### 2. HERO

* Full-viewport hero
* Background: `assets/images/malik-ray.jpg` as a full-bleed background image with a dark overlay (gradient from `rgba(0,0,0,0.55)` to `rgba(10,10,10,0.95)`)
* Centered content:
  * Small eyebrow text: `Velora Records Artist`
  * Large heading: `MALIK RAY` in Playfair Display, very large (clamp 56px–120px)
  * Subtitle: `Hip-Hop / Rap`
  * Two CTA buttons: `[ Listen Now ]` (gold, links to #releases) and `[ About ]` (ghost, links to #about)
* Scroll indicator line at bottom

### 3. ABOUT

* Two-column layout (text left, photo right) on desktop, stacked on mobile
* Right column: `assets/images/malik-ray.jpg` displayed as a portrait card with subtle gold border
* Left column text:
  ```
  MALIK RAY is an independent hip-hop and rap artist signed to Velora Records.Drawing from raw personal experience and cinematic sound design, his music blends emotional depth with polished contemporary production. Each release is crafted with intention — built to resonate, built to last.Released under Velora Records, MALIK RAY represents the label's commitment to distinctive artist projects and high-quality sound.
  ```
* Below text: one small detail row: `Label: Velora Records`

### 4. RELEASES (id="releases", id="music")

* Section label: `Discography`
* Section title: `Music`
* Load releases from `data/content.json`
* Group by type: Albums first, then Singles
* For each type group, show a type label heading (e.g. "Album", "Singles")
* Release cards in a CSS grid (3 columns desktop, 2 tablet, 1 mobile)
* Each card:
  * Cover art (square image, fills card top)
  * Release type badge (top-left overlay on image): `ALBUM` or `SINGLE`
  * Title (Playfair Display)
  * Year
  * UPC row (if present): `UPC · 8680948182925`
  * ISRC row (if present): `ISRC · TRAKF1636353`
  * Spotify listen button (if URL present)
  * "Coming Soon" variant: show a `COMING SOON` badge overlay, release date text

### 5. LABEL (id="label") — CRITICAL FOR VERIFICATION

* This section must be clearly publicly visible
* Section label: `Label Information`
* Section title: `Velora Records`
* Short paragraph:
  ```
  MALIK RAY is an artist signed to and released under Velora Records, an independent music label. All releases are distributed through Mitas Müzik Public, a division of Mitas Müzik.
  ```
* A verification table (styled like the Velora Records label site's `.verification__table`):
  ```
  Label Name     | Velora RecordsContact Email  | hincalgunal@gmail.com  (clickable mailto link)Artist         | MALIK RAYDistributor    | Mitas Müzik Public, a division of Mitas MüzikRelease        | Shade MoneyUPC            | 8680948182925ISRC           | TRAKF1636353
  ```
* Also add a link: `Official Label Website → velorarecords.vercel.app`

### 6. CONTACT (id="contact")

* Simple centered section
* Heading: `Get in Touch`
* Text: `For bookings, features, press, or general inquiries, reach out directly.`
* Large email link: `hincalgunal@gmail.com`
* Note: `This email is used for artist and label communications.`

### 7. FOOTER

* Left: `MALIK RAY` wordmark + `Velora Records Artist`
* Right: nav links
* Bottom bar: `© 2026 MALIK RAY. Released under Velora Records. All rights reserved.`
* Email: `hincalgunal@gmail.com`

---

## data/content.json

Create this file exactly:

```json
{
  "artist": {
    "name": "MALIK RAY",
    "genre": "Hip-Hop / Rap",
    "label": "Velora Records",
    "labelUrl": "https://velorarecords.vercel.app",
    "email": "hincalgunal@gmail.com",
    "distributor": "Mitas Müzik Public, a division of Mitas Müzik",
    "photo": "assets/images/malik-ray.jpg",
    "bio": "MALIK RAY is an independent hip-hop and rap artist signed to Velora Records. Drawing from raw personal experience and cinematic sound design, his music blends emotional depth with polished contemporary production.",
    "spotifyUrl": ""
  },
  "releases": [
    {
      "id": "velvet-hours",
      "title": "Velvet Hours",
      "artist": "MALIK RAY",
      "type": "Album",
      "year": "2026",
      "releaseDate": "2026-04-30",
      "comingSoon": true,
      "cover": "assets/images/velvet-hours.jpg",
      "coverPlaceholder": false,
      "upc": "",
      "isrc": "",
      "albumSpotifyUrl": "",
      "appleMusicUrl": "",
      "youtubeMusicUrl": ""
    },
    {
      "id": "shade-money",
      "title": "Shade Money",
      "artist": "MALIK RAY",
      "type": "Single",
      "year": "2026",
      "comingSoon": false,
      "cover": "assets/images/shade-money.jpg",
      "coverPlaceholder": false,
      "upc": "8680948182925",
      "isrc": "TRAKF1636353",
      "albumSpotifyUrl": "",
      "trackSpotifyUrl": "",
      "appleMusicUrl": "",
      "youtubeMusicUrl": ""
    },
    {
      "id": "gold-dont-sleep",
      "title": "Gold Don't Sleep",
      "artist": "MALIK RAY",
      "type": "Single",
      "year": "2026",
      "comingSoon": false,
      "cover": "assets/images/gold-dont-sleep.jpg",
      "coverPlaceholder": false,
      "upc": "8680948206058",
      "isrc": "TRAKF1640041",
      "albumSpotifyUrl": "",
      "trackSpotifyUrl": "",
      "appleMusicUrl": "",
      "youtubeMusicUrl": ""
    },
    {
      "id": "black-glass-heart",
      "title": "Black Glass Heart",
      "artist": "MALIK RAY",
      "type": "Single",
      "year": "2026",
      "comingSoon": false,
      "cover": "assets/images/black-glass-heart.jpg",
      "coverPlaceholder": false,
      "upc": "8680948206065",
      "isrc": "TRAKF1640042",
      "albumSpotifyUrl": "",
      "trackSpotifyUrl": "",
      "appleMusicUrl": "",
      "youtubeMusicUrl": ""
    }
  ]
}
```

**Note:** When Spotify URLs become available, add them to the appropriate fields. The site renders Spotify listen buttons automatically when a URL is present.

---

## script.js Behavior

* `fetch('data/content.json')` on load
* Render release cards into `#releasesGrid`
* Group releases: Albums first (sorted by releaseDate desc), then Singles
* Coming soon releases: show `COMING SOON` badge, release date, no UPC/ISRC rows
* Regular releases: show UPC, ISRC, Spotify button (only if URL present)
* Fade-in via `IntersectionObserver` on `.fade-in` elements
* Nav scroll shrink on scroll > 40px
* Mobile hamburger toggle
* Footer year: `document.getElementById('year').textContent = new Date().getFullYear()`

---

## SEO Meta Tags (in `<head>`)

```html
<meta name="description" content="MALIK RAY — Official artist page. Hip-Hop / Rap artist signed to Velora Records." />
<meta name="robots" content="index, follow" />
<meta property="og:title" content="MALIK RAY — Official" />
<meta property="og:description" content="Hip-Hop / Rap artist signed to Velora Records. Listen to Shade Money, Gold Don't Sleep, Black Glass Heart, and Velvet Hours." />
<meta property="og:image" content="assets/images/malik-ray.jpg" />
<title>MALIK RAY — Official</title>
```

---

## Image Assets (already available — just copy into project)

| File                      | Use                                                  |
| ------------------------- | ---------------------------------------------------- |
| `malik-ray.jpg`         | Hero background + About section portrait             |
| `velvet-hours.jpg`      | Album cover for Velvet Hours                         |
| `shade-money.jpg`       | Single cover for Shade Money                         |
| `gold-dont-sleep.jpg`   | Single cover for Gold Don't Sleep                    |
| `black-glass-heart.jpg` | Single cover for Black Glass Heart                   |
| `logo.png`              | Velora Records logo (use in Label section or footer) |

Place all of these in `assets/images/`.

---

## Important Notes

* Do NOT invent Spotify URLs, social media handles, streaming links, or any other URLs — leave them empty strings in JSON. The site handles empty URLs gracefully by not rendering buttons.
* Do NOT add fake social media icons or links.
* The email `hincalgunal@gmail.com` must be clearly visible on the public page — both in the Label section and in the Contact section.
* The label name `Velora Records` and artist name `MALIK RAY` must appear in page text (not just metadata), clearly readable.
* UPC and ISRC for Shade Money must appear in the release card and/or the Label verification table.

---

## Deployment

This is a static site that uses `fetch()` for `content.json`, so it must be served over HTTP.

Local preview:

```bash
npx http-server . -p 8080
# or
python -m http.server 8080
```

Deploy:S

* Push to GitHub → import to Vercel → live in ~1 minute
* Suggested Vercel project name: `malik-ray` → URL will be `malik-ray.vercel.app`

---

## Output After Build

After building, confirm:

1. All files are created in correct structure
2. Site runs locally via http-server
3. Label section is visible and lists: Velora Records, hincalgunal@gmail.com, MALIK RAY, Shade Money, UPC 8680948182925, ISRC TRAKF1636353
4. Release cards render with correct covers
5. Velvet Hours shows "Coming Soon" badge
6. Mobile layout is clean at 375px width

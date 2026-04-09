# MALIK RAY — Official Artist Website

Official artist website for **MALIK RAY**, signed to **Velora Records**.  
Built as a static site for Spotify for Artists label verification and public artist presence.

---

## Live Site

> Deploy to Vercel: push to GitHub → import project → live in ~1 minute  
> Suggested URL: `malik-ray.vercel.app`

---

## Features

- Full-viewport hero with artist photo
- Discography section — albums & singles with UPC/ISRC data
- Streaming links per release — Spotify, Apple Music, YouTube Music
- Label verification section (Velora Records info, contact email, distributor)
- Dark / Light mode toggle (preference saved to localStorage)
- Fully responsive — mobile-first, tested at 375px
- Fade-in animations via IntersectionObserver
- Scroll-shrink navigation with mobile hamburger
- No framework, no build step — pure HTML/CSS/JS

---

## File Structure

```
malik-ray/
├── index.html              # Single-page site
├── style.css               # All styles + dark/light theme
├── script.js               # Release rendering, nav, theme toggle
├── data/
│   └── content.json        # Artist info + all releases (edit here)
└── assets/
    ├── images/
    │   ├── malik-ray.jpg
    │   ├── velvet-hours.jpg
    │   ├── shade-money.jpg
    │   ├── gold-dont-sleep.jpg
    │   └── black-glass-heart.jpg
    ├── brand/
    │   └── logo.png        # Velora Records logo
    └── favicon/
        └── ...
```

---

## Releases

All release data lives in `data/content.json`. To add a Spotify/Apple Music/YouTube Music link, fill in the relevant field and save — the site renders buttons automatically when a URL is present.

| Title | Type | UPC | ISRC | Status |
|---|---|---|---|---|
| Velvet Hours | Album | — | — | Coming Soon (Apr 30, 2026) |
| Shade Money | Single | 8680948182925 | TRAKF1636353 | Released |
| Gold Don't Sleep | Single | 8680948206058 | TRAKF1640041 | Released |
| Black Glass Heart | Single | 8680948206065 | TRAKF1640042 | Released |

---

## Label Info

| Field | Value |
|---|---|
| Label | Velora Records |
| Contact | hincalgunal@gmail.com |
| Distributor | Mitas Müzik Public, a division of Mitas Müzik |
| Label Website | velorarecords.vercel.app |

---

## Local Preview

This site uses `fetch()` for `content.json` — must be served over HTTP, not opened as a file.

```bash
# Option 1
npx http-server . -p 8080

# Option 2
python -m http.server 8080
```

Then open `http://localhost:8080`

---

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import
3. Select the repo — no build settings needed
4. Deploy

No `vercel.json` or config required for a static site.

---

## Design System

Inherits the Velora Records design language:

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Gold accent | `#c8a96e` |
| Heading font | Playfair Display |
| Body font | Inter |

Light mode is available via the toggle in the top nav.

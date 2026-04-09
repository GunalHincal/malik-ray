/* =========================================================
   MALIK RAY — Official Artist Site
   script.js
   ========================================================= */

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Dark / Light theme toggle
const themeToggle = document.getElementById('themeToggle');
const savedTheme  = localStorage.getItem('theme');
if (savedTheme === 'light') document.body.classList.add('light');

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Nav scroll shrink
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

// Close mobile nav on link click
navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Fade-in via IntersectionObserver
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// =========================================================
// Release card rendering
// =========================================================

function formatReleaseDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function buildCard(release) {
  const card = document.createElement('div');
  card.className = 'release-card fade-in';

  const isComingSoon = !!release.comingSoon;
  const badgeText    = isComingSoon ? 'Coming Soon' : (release.type === 'Album' ? 'Album' : 'Single');
  const badgeClass   = isComingSoon ? 'release-card__badge release-card__badge--coming-soon' : 'release-card__badge';

  // Streaming URLs
  const spotifyUrl     = release.trackSpotifyUrl || release.albumSpotifyUrl || '';
  const appleMusicUrl  = release.appleMusicUrl  || '';
  const youtubeMusicUrl = release.youtubeMusicUrl || '';

  let metaRows = '';
  if (!isComingSoon) {
    if (release.upc)  metaRows += `<p class="release-card__meta"><span>UPC ·</span>${release.upc}</p>`;
    if (release.isrc) metaRows += `<p class="release-card__meta"><span>ISRC ·</span>${release.isrc}</p>`;
  } else {
    if (release.releaseDate) {
      metaRows += `<p class="release-card__release-date">Coming ${formatReleaseDate(release.releaseDate)}</p>`;
    }
  }

  let actions = '';
  if (!isComingSoon && (spotifyUrl || appleMusicUrl || youtubeMusicUrl)) {
    const spotifyBtn = spotifyUrl
      ? `<a href="${spotifyUrl}" target="_blank" rel="noopener" class="stream-btn stream-btn--spotify" aria-label="Listen on Spotify">
           <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.297a.748.748 0 01-1.03.25c-2.819-1.723-6.365-2.112-10.542-1.157a.748.748 0 11-.333-1.459c4.571-1.044 8.492-.594 11.657 1.337a.747.747 0 01.248 1.029zm1.472-3.276a.936.936 0 01-1.288.308c-3.225-1.983-8.138-2.557-11.954-1.399a.937.937 0 01-.572-1.789c4.358-1.323 9.776-.682 13.506 1.592a.936.936 0 01.308 1.288zm.127-3.408c-3.868-2.296-10.243-2.509-13.932-1.388a1.123 1.123 0 01-.688-2.143c4.237-1.363 11.276-1.1 15.722 1.606a1.123 1.123 0 01-1.102 1.925z"/></svg>
           Spotify
         </a>` : '';
    const appleBtn = appleMusicUrl
      ? `<a href="${appleMusicUrl}" target="_blank" rel="noopener" class="stream-btn stream-btn--apple" aria-label="Listen on Apple Music">
           <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M18.151 1.012C15.836.007 14.454 0 12 0 9.546 0 8.164.007 5.849 1.012 3.575 2 2 3.575 1.012 5.849.007 8.164 0 9.546 0 12c0 2.454.007 3.836 1.012 6.151C2 20.425 3.575 22 5.849 22.988 8.164 23.993 9.546 24 12 24c2.454 0 3.836-.007 6.151-1.012C20.425 22 22 20.425 22.988 18.151 23.993 15.836 24 14.454 24 12c0-2.454-.007-3.836-1.012-6.151C22 3.575 20.425 2 18.151 1.012zm-2.974 10.497v3.808c0 .278-.039.551-.163.804-.193.393-.507.641-.925.76-.233.067-.471.105-.713.115-.634.03-1.182-.4-1.295-1.024a1.253 1.253 0 01.692-1.348c.215-.107.447-.167.679-.216.252-.055.505-.102.755-.16.183-.042.305-.153.34-.344a.603.603 0 00.01-.129c0-1.21 0-2.42-.001-3.629a.483.483 0 00-.017-.123c-.027-.1-.1-.162-.203-.156-.107.007-.212.024-.317.045-.506.1-1.013.202-1.52.304l-1.551.313-.916.185c-.01.002-.021.007-.032.009-.185.051-.267.158-.267.355-.001 1.88-.001 3.76 0 5.64v.055c0 .28-.031.557-.143.818-.186.433-.514.693-.97.8-.231.053-.467.075-.705.077-.663.002-1.209-.418-1.318-1.073-.071-.418.027-.807.313-1.133.207-.231.46-.367.748-.447.2-.054.404-.095.607-.143l.652-.132c.223-.046.366-.193.383-.423.007-.072.005-.144.005-.217V8.355c0-.047.002-.093.008-.139.035-.285.247-.466.527-.466.07 0 .142.011.213.025l3.86.783c.541.11 1.083.22 1.625.329.445.09.682.326.682.777.001.861 0 1.723 0 2.845z"/></svg>
           Apple Music
         </a>` : '';
    const youtubeBtn = youtubeMusicUrl
      ? `<a href="${youtubeMusicUrl}" target="_blank" rel="noopener" class="stream-btn stream-btn--youtube" aria-label="Listen on YouTube Music">
           <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
           YouTube Music
         </a>` : '';

    actions = `<div class="release-card__actions">${spotifyBtn}${appleBtn}${youtubeBtn}</div>`;
  }

  card.innerHTML = `
    <div class="release-card__cover-wrap">
      <img src="${release.cover}" alt="${release.title}" class="release-card__cover" loading="lazy" />
      <span class="${badgeClass}">${badgeText}</span>
    </div>
    <div class="release-card__body">
      <h3 class="release-card__title">${release.title}</h3>
      <p class="release-card__year">${release.year}</p>
      ${metaRows}
      ${actions}
    </div>
  `;

  return card;
}

function renderReleases(releases) {
  const grid = document.getElementById('releasesGrid');
  if (!grid) return;

  // Sort: albums first (by releaseDate desc), then singles
  const albums  = releases.filter(r => r.type === 'Album')
                           .sort((a, b) => (b.releaseDate || '').localeCompare(a.releaseDate || ''));
  const singles = releases.filter(r => r.type !== 'Album');

  const groups = [
    { label: albums.length === 1 ? 'Album' : 'Albums', items: albums },
    { label: 'Singles', items: singles }
  ].filter(g => g.items.length > 0);

  groups.forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.className = 'releases__group';

    const heading = document.createElement('p');
    heading.className = 'releases__type-heading fade-in';
    heading.textContent = group.label;
    groupEl.appendChild(heading);

    const cardsEl = document.createElement('div');
    cardsEl.className = 'releases__cards';
    group.items.forEach(r => cardsEl.appendChild(buildCard(r)));
    groupEl.appendChild(cardsEl);

    grid.appendChild(groupEl);
  });

  // Observe newly added fade-in elements
  grid.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Fetch content and render
fetch('data/content.json')
  .then(r => r.json())
  .then(data => {
    if (data.releases && data.releases.length) {
      renderReleases(data.releases);
    }
  })
  .catch(err => {
    console.error('Failed to load content.json:', err);
  });

/* ============================================================
   TENNIS CLUB BROC — Script principal
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────────
   DONNÉES DU COMITÉ
   Mettez à jour ce tableau avec les vrais membres.
   Champs :
     prenom  : string  — Prénom du membre
     nom     : string  — Nom de famille
     role    : string  — Rôle dans le comité
     email   : string  — Adresse email
     photo   : string|null — Chemin vers l'image (ex: "images/comite/dupont.jpg")
                             ou null pour afficher les initiales
────────────────────────────────────────────────────────────── */
const membres = [
  {
    prenom: 'Philippe',
    nom: 'Sudan',
    role: 'Président',
    email: 'president@tcbroc.ch',
    photo: 'comite/Philippe.jpeg',
  },
  {
    prenom: 'Fabian',
    nom: 'Niederhauser',
    role: 'Responsable Site & Réservations',
    email: 'infrastructure@tcbroc.ch',
    photo: 'comite/Fabian.jpeg',
  },
  {
    prenom: 'François',
    nom: 'Perritaz',
    role: 'Responsable Tournoi & Manifestations',
    email: 'manifestations@tcbroc.ch',
    photo: 'comite/Francois.jpg',
  },
  {
    prenom: 'Romain',
    nom: 'de Flaugergues',
    role: 'Responsable Formation',
    email: 'juniors@tcbroc.ch',
    photo: 'comite/Romain.jpeg',
  },
  {
    prenom: 'Christian',
    nom: 'Furrer',
    role: 'Responsable Seniors',
    email: 'seniors@tcbroc.ch',
    photo: 'comite/Christian.png',
  },
  {
    prenom: 'Fabrice',
    nom: 'Cretton',
    role: 'Responsable Finances & Caisse',
    email: 'finances@tcbroc.ch',
    photo: 'comite/Fabrice.jpeg',
  },
  {
    prenom: 'Julien',
    nom: 'Repond',
    role: 'Secrétaire',
    email: 'administration@tcbroc.ch',
    photo: 'comite/Julien.png',
  },
];

/* ──────────────────────────────────────────────────────────────
   RENDU DU COMITÉ
────────────────────────────────────────────────────────────── */
function renderComite() {
  const grid = document.getElementById('comite-grid');
  if (!grid || membres.length === 0) return;

  grid.innerHTML = membres
    .map((m) => {
      const initiales = `${m.prenom[0]}${m.nom[0]}`.toUpperCase();
      const photoEl = m.photo
        ? `<img class="membre-photo" src="${m.photo}" alt="Photo de ${m.prenom} ${m.nom}" loading="lazy">`
        : `<div class="membre-avatar" aria-hidden="true">${initiales}</div>`;

      return `
        <a class="membre-card reveal" href="mailto:${m.email}" aria-label="${m.prenom} ${m.nom} — ${m.role} — ${m.email}">
          ${photoEl}
          <div class="membre-info">
            <span class="membre-role">${m.role}</span>
            <p class="membre-name">${m.prenom} ${m.nom}</p>
            <span class="membre-email">${m.email}</span>
          </div>
        </a>
      `;
    })
    .join('');
}

/* ──────────────────────────────────────────────────────────────
   MENU MOBILE
────────────────────────────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu());

  // Fermer au clic sur un lien
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Fermer avec Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggleMenu(false);
      hamburger.focus();
    }
  });

  // Fermer au redimensionnement
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) toggleMenu(false);
  });
}

/* ──────────────────────────────────────────────────────────────
   HEADER SCROLLÉ
────────────────────────────────────────────────────────────── */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ──────────────────────────────────────────────────────────────
   ANIMATIONS AU DÉFILEMENT
────────────────────────────────────────────────────────────── */
function initReveal() {
  const elements = document.querySelectorAll('.reveal:not(.visible)');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Décalage progressif pour les éléments frères
        const parent   = entry.target.parentElement;
        const siblings = [...parent.querySelectorAll('.reveal')];
        const index    = siblings.indexOf(entry.target);
        const delay    = Math.min(index * 75, 300); // max 300ms de décalage

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ──────────────────────────────────────────────────────────────
   PARALLAX HERO
────────────────────────────────────────────────────────────── */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroSection = heroBg.closest('.section-hero');
  let ticking = false;

  const update = () => {
    const scrollY = window.scrollY;
    const heroH   = heroSection ? heroSection.offsetHeight : window.innerHeight;
    if (scrollY < heroH) {
      heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* ──────────────────────────────────────────────────────────────
   FORMULAIRE DE CONTACT (Formspree AJAX)
   Avant utilisation : remplacez "VOTRE_ID_FORMSPREE" dans index.html
   par votre identifiant Formspree (ex: xyzabc)
────────────────────────────────────────────────────────────── */
function initContactForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const originalLabel = btn.textContent;

    btn.disabled    = true;
    btn.textContent = 'Envoi en cours…';
    status.className = 'form-status';
    status.textContent = '';

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        status.className   = 'form-status success';
        status.textContent = 'Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.';
        btn.textContent    = 'Message envoyé ✓';
        btn.disabled = false;
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Erreur serveur');
      }
    } catch {
      status.className   = 'form-status error';
      status.textContent =
        'Une erreur est survenue. Veuillez réessayer ou nous écrire directement à administration@tcbroc.ch.';
      btn.disabled    = false;
      btn.textContent = originalLabel;
    }
  });
}

/* ──────────────────────────────────────────────────────────────
   MISE À JOUR DE L'ANNÉE EN PIED DE PAGE
────────────────────────────────────────────────────────────── */
function updateYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ──────────────────────────────────────────────────────────────
   INITIALISATION
────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Données dynamiques
  renderComite();
  updateYear();

  // 2. Comportements UI
  initMobileMenu();
  initStickyHeader();
  initParallax();
  initContactForm();

  // 3. Animations — après rendu du comité
  requestAnimationFrame(() => initReveal());
});

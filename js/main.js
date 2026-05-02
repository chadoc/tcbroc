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
    phone: '0762483890',
    photo: 'comite/Romain.jpeg',
  },
  {
    prenom: 'Christian',
    nom: 'Furrer',
    role: 'Responsable Seniors',
    email: 'seniors@tcbroc.ch',
    photo: 'comite/Christian.jpeg',
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
    photo: 'comite/Julien.jpg',
  },
];

/* ──────────────────────────────────────────────────────────────
   RENDU DU COMITÉ
────────────────────────────────────────────────────────────── */
function renderComite() {
  const grid = document.getElementById('comite-grid');
  if (!grid || membres.length === 0) return;

  const waIcon = `<svg class="wa-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  grid.innerHTML = membres
    .map((m) => {
      const initiales = `${m.prenom[0]}${m.nom[0]}`.toUpperCase();
      const photoEl = m.photo
        ? `<img class="membre-photo" src="${m.photo}" alt="Photo de ${m.prenom} ${m.nom}" loading="lazy">`
        : `<div class="membre-avatar" aria-hidden="true">${initiales}</div>`;

      let contactEl = '';
      if (m.email) {
        contactEl = `<span class="membre-email">${m.email}</span>`;
      } else if (m.phone) {
        const waNumber = '41' + m.phone.slice(1);
        const phoneDisplay = m.phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
        contactEl = `<span class="membre-phone"><a class="membre-tel-link" href="tel:+${waNumber}" onclick="event.stopPropagation()">${phoneDisplay}</a><a class="membre-wa-link" href="https://wa.me/${waNumber}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${waIcon}</a></span>`;
      }

      const tag = m.email ? 'a' : 'div';
      const tagAttrs = m.email
        ? `href="mailto:${m.email}" aria-label="${m.prenom} ${m.nom} — ${m.role} — ${m.email}"`
        : `aria-label="${m.prenom} ${m.nom} — ${m.role}"`;

      return `
        <${tag} class="membre-card reveal" ${tagAttrs}>
          ${photoEl}
          <div class="membre-info">
            <span class="membre-role">${m.role}</span>
            <p class="membre-name">${m.prenom} ${m.nom}</p>
            ${contactEl}
          </div>
        </${tag}>
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

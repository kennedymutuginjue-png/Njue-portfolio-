const CONTACT_CONFIG = Object.freeze({
  email: 'kennedymutuginjue@gmail.com',
  whatsappNumber: '254793553192',
  whatsappUrl: 'https://wa.me/254793553192',
  linkedinUrl: 'https://www.linkedin.com'
});

const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

const storedTheme = localStorage.getItem('portfolio-theme');
if (storedTheme === 'light') root.dataset.theme = 'light';

function updateThemeButton() {
  if (!themeToggle) return;
  const light = root.dataset.theme === 'light';
  themeToggle.textContent = light ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
}
updateThemeButton();

themeToggle?.addEventListener('click', () => {
  const light = root.dataset.theme === 'light';
  if (light) delete root.dataset.theme;
  else root.dataset.theme = 'light';
  localStorage.setItem('portfolio-theme', light ? 'dark' : 'light');
  updateThemeButton();
});

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('a[href="#home"]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', '#home');
}));

// Keep all CV links pointed at the existing asset and make them download it.
document.querySelectorAll('a[href*="CV.pdf"]').forEach((link) => {
  link.href = './assets/Njue_Kennedy_Web_CV.pdf';
  link.download = 'Njue_Kennedy_Web_CV.pdf';
});

function createContactLink(className, label, href, external = false) {
  const link = document.createElement('a');
  link.className = className;
  link.href = href;
  link.textContent = label;
  if (external) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  return link;
}

// Add a prominent Hire Me CTA to the hero without duplicating it on reloads.
const heroActions = document.querySelector('.hero .button-row, .hero-actions');
if (heroActions && !heroActions.querySelector('.hire-me-button')) {
  const hireButton = createContactLink('button secondary hire-me-button', 'Hire me ↗', '#contact');
  heroActions.append(hireButton);
}

// Ensure the contact area contains both email and WhatsApp actions.
const contactBox = document.querySelector('#contact .contact-box, #contact .contact-links');
if (contactBox) {
  const emailLink = contactBox.querySelector('a[href^="mailto:"]');
  if (emailLink) {
    emailLink.href = `mailto:${CONTACT_CONFIG.email}`;
    emailLink.textContent = 'Email me ↗';
  } else if (!contactBox.querySelector('.contact-email-button')) {
    contactBox.prepend(createContactLink('button primary contact-email-button', 'Email me ↗', `mailto:${CONTACT_CONFIG.email}`));
  }
  if (!contactBox.querySelector('.whatsapp-button')) {
    contactBox.append(createContactLink('button whatsapp-button', 'WhatsApp me ↗', CONTACT_CONFIG.whatsappUrl, true));
  }
}

// Also make any existing email text or mailto links use the requested address.
document.querySelectorAll('a[href^="mailto:"], [data-contact-email]').forEach((element) => {
  if (element.tagName === 'A') element.href = `mailto:${CONTACT_CONFIG.email}`;
  if (element.dataset) element.textContent = CONTACT_CONFIG.email;
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else revealItems.forEach((item) => item.classList.add('visible'));

const parallaxItems = document.querySelectorAll('[data-parallax]');
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax) || 0.1;
      item.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
    ticking = false;
  });
}, { passive: true });

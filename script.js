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

// Make every CV CTA download the repository PDF with a clear filename.
document.querySelectorAll('a[href*="Njue_Kennedy_Web_CV.pdf"]').forEach((link) => {
  link.setAttribute('download', 'Njue_Kennedy_Web_CV.pdf');
  link.setAttribute('aria-label', 'Download Njue Kennedy CV as a PDF');
});

// Add concise feature lists to each featured project card.
const projectFeatures = [
  ['Invoice creation and management', 'Client records and expense tracking', 'Billing activity monitoring'],
  ['Mobile-first menu browsing', 'Fast customer ordering flow', 'Clear restaurant checkout experience'],
  ['Home and apartment discovery', 'Office and commercial listings', 'Kenya-focused property browsing']
];

document.querySelectorAll('.project-card').forEach((card, index) => {
  const info = card.querySelector('.project-info');
  if (!info || !projectFeatures[index] || info.querySelector('.project-features')) return;
  const list = document.createElement('ul');
  list.className = 'project-features';
  list.setAttribute('aria-label', 'Project features');
  list.innerHTML = projectFeatures[index].map((feature) => `<li>${feature}</li>`).join('');
  const description = info.querySelector('p');
  description ? description.after(list) : info.append(list);
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

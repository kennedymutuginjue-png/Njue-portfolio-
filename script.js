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

const skillsSection = document.createElement('section');
skillsSection.className = 'section container skills-catalogue';
skillsSection.id = 'skills';
skillsSection.innerHTML = `
  <div class="section-intro reveal"><p class="section-number">02 / SKILLS</p><h2>Tools for turning<br><em>ideas into products.</em></h2><p class="section-summary">A practical toolkit spanning frontend development, web applications, business systems and integrations.</p></div>
  <div class="skills-catalogue-grid">
    <article class="skill-group reveal"><span class="skill-group-number">01</span><h3>Frontend Development</h3><ul><li>HTML5 &amp; Semantic HTML</li><li>CSS3 &amp; Responsive Design</li><li>JavaScript (ES6+)</li><li>React.js</li><li>UI/UX Implementation</li></ul></article>
    <article class="skill-group reveal"><span class="skill-group-number">02</span><h3>Web Application Development</h3><ul><li>Interactive Dashboards</li><li>Authentication &amp; User Management</li><li>CRUD Systems</li><li>Forms &amp; Workflow Automation</li><li>Responsive Web Applications</li></ul></article>
    <article class="skill-group reveal"><span class="skill-group-number">03</span><h3>Business &amp; E-Commerce Solutions</h3><ul><li>E-Commerce Platforms</li><li>Restaurant Ordering Systems</li><li>Invoicing &amp; Expense Management</li><li>Client &amp; Data Management</li><li>Sales &amp; Analytics Dashboards</li></ul></article>
    <article class="skill-group reveal"><span class="skill-group-number">04</span><h3>APIs &amp; Integrations</h3><ul><li>REST API Integration</li><li>Payment API Integration</li><li>Third-Party Service Integration</li><li>Checkout &amp; Payment Flows</li></ul></article>
    <article class="skill-group reveal"><span class="skill-group-number">05</span><h3>Development Tools</h3><ul><li>Git &amp; GitHub</li><li>GitHub Pages</li><li>Cross-Browser Testing</li><li>Performance Optimization</li><li>Mobile-First Development</li></ul></article>
  </div>`;

const servicesSection = document.querySelector('#services');
servicesSection?.parentNode.insertBefore(skillsSection, servicesSection);

if (servicesSection) {
  const serviceList = servicesSection.querySelector('.service-list');
  if (serviceList) {
    serviceList.innerHTML = [
      ['01', 'Website Development', 'Professional, responsive websites for businesses, portfolios, agencies and personal brands.'],
      ['02', 'Web Application Development', 'Interactive web applications, dashboards, authentication systems and custom business workflows.'],
      ['03', 'E-Commerce & Ordering Platforms', 'Online stores, restaurant ordering systems, product management, carts, checkout and order management.'],
      ['04', 'Business Management Systems', 'Custom platforms for invoicing, expense tracking, client management, reporting and everyday business operations.'],
      ['05', 'Payment & API Integrations', 'Integration of supported payment providers, APIs and third-party services into websites and web applications.'],
      ['06', 'Website & Application Maintenance', 'Bug fixing, performance improvements, feature updates, responsive improvements and ongoing technical support.']
    ].map(([number, title, description]) => `<article class="service-item reveal"><span>${number}</span><div><h3>${title}</h3><p>${description}</p></div><b>↗</b></article>`).join('');
  }
  const label = servicesSection.querySelector('.section-number');
  if (label) label.textContent = '03 / SERVICES';
}

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

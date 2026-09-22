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

// Close the mobile navigation for every link, including dynamically added links such as Skills.
navLinks?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});

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

// Add a polished Skills destination and section without duplicating either on reloads.
const skills = [
  ['Frontend Development', 'HTML5 & Semantic HTML', 'CSS3 & Responsive Design', 'JavaScript (ES6+)', 'React.js', 'UI/UX Implementation'],
  ['Web Application Development', 'Interactive Dashboards', 'Authentication & User Management', 'CRUD Systems', 'Forms & Workflow Automation', 'Responsive Web Applications'],
  ['Business & E-Commerce Solutions', 'E-Commerce Platforms', 'Restaurant Ordering Systems', 'Invoicing & Expense Management', 'Client & Data Management', 'Sales & Analytics Dashboards'],
  ['APIs & Integrations', 'REST API Integration', 'Payment API Integration', 'Third-Party Service Integration', 'Checkout & Payment Flows'],
  ['Development Tools', 'Git & GitHub', 'GitHub Pages', 'Cross-Browser Testing', 'Performance Optimization', 'Mobile-First Development']
];

if (navLinks && !navLinks.querySelector('a[href="#skills"]')) {
  const skillsLink = document.createElement('a');
  skillsLink.href = '#skills';
  skillsLink.textContent = 'Skills';
  skillsLink.className = 'nav-skill';
  navLinks.insertBefore(skillsLink, navLinks.querySelector('.nav-cv'));
}

if (!document.querySelector('#skills')) {
  const skillsSection = document.createElement('section');
  skillsSection.className = 'section container skills-section';
  skillsSection.id = 'skills';
  skillsSection.innerHTML = `
    <div class="section-intro reveal">
      <p class="section-number">02 / SKILLS</p>
      <h2>Built for ideas<br>that <em>move forward.</em></h2>
    </div>
    <div class="skills-grid">
      ${skills.map(([title, ...items]) => `
        <article class="skill-card reveal">
          <div class="skill-card-heading"><span class="skill-icon">✦</span><h3>${title}</h3></div>
          <ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>
        </article>
      `).join('')}
    </div>`;
  document.querySelector('#services')?.before(skillsSection);
}

// Add payment integrations to Services with a clear client-focused explanation.
const serviceList = document.querySelector('#services .service-list');
if (serviceList && !serviceList.querySelector('.payment-service')) {
  const paymentService = document.createElement('article');
  paymentService.className = 'service-item reveal payment-service';
  paymentService.innerHTML = `
    <span>04</span>
    <div>
      <h3>Payment & API integrations</h3>
      <p>Secure, user-friendly payment flows that connect your website or application to supported payment providers. I can integrate checkout pages, payment requests, order confirmation, transaction status updates and third-party APIs so customers can pay smoothly while your business keeps reliable records.</p>
    </div>`;
  serviceList.append(paymentService);
}

// Rename the Work navigation item without changing the projects section itself.
const workLink = navLinks?.querySelector('a[href="#projects"]');
if (workLink) workLink.textContent = 'My Projects';

// Replace the small approach summary with a more detailed, client-friendly process.
const processGrid = document.querySelector('.process-grid');
if (processGrid) {
  processGrid.innerHTML = `
    <div class="process-step reveal"><span>01</span><h3>Discover & define</h3><p>We discuss your goals, audience, current challenges and the result you want to achieve. I turn the conversation into a clear project scope, priorities and practical next steps.</p></div>
    <div class="process-step reveal"><span>02</span><h3>Plan the experience</h3><p>I map the content, user journeys and key features before development begins. This creates a simple structure that keeps the product easy to understand on both mobile and desktop.</p></div>
    <div class="process-step reveal"><span>03</span><h3>Design & build</h3><p>I create the interface and develop the functionality with responsive layouts, accessible interactions, clean components and reliable integrations where your business needs them.</p></div>
    <div class="process-step reveal"><span>04</span><h3>Test & refine</h3><p>The product is checked across screen sizes and modern browsers. I refine spacing, forms, navigation, performance and important user flows so everything feels polished and dependable.</p></div>
    <div class="process-step reveal"><span>05</span><h3>Launch with confidence</h3><p>After final review, I prepare the project for launch, connect the required services and help ensure the live experience matches the agreed goals.</p></div>
    <div class="process-step reveal"><span>06</span><h3>Support & improve</h3><p>Once your site or application is live, I can help with updates, bug fixes, new features, performance improvements and ongoing technical support.</p></div>`;
}

// Put the existing portrait image in the top navigation avatar only; hero orbit circles remain unchanged.
const brandMark = document.querySelector('.brand-mark');
if (brandMark && !brandMark.querySelector('img')) {
  brandMark.textContent = '';
  const avatar = document.createElement('img');
  avatar.src = 'assets/file_0000000081e0722faa3d6a44e258e15b.png';
  avatar.alt = 'Njue Kennedy';
  brandMark.append(avatar);
}

if (!document.querySelector('#portfolio-enhancements')) {
  const enhancementStyles = document.createElement('style');
  enhancementStyles.id = 'portfolio-enhancements';
  enhancementStyles.textContent = `
    .nav-links { gap: 1.25rem; }
    .nav-links a { position: relative; font-size: .92rem; font-weight: 600; }
    .nav-links a:not(.nav-cv)::after { content: ''; position: absolute; left: 0; right: 0; bottom: -.45rem; height: 2px; background: var(--lime); transform: scaleX(0); transform-origin: center; transition: transform .2s ease; }
    .nav-links a:not(.nav-cv):hover::after, .nav-links a.active::after { transform: scaleX(1); }
    .nav-cv { padding: .58rem .9rem !important; border-color: var(--lime) !important; background: color-mix(in srgb, var(--lime) 12%, transparent); }
    .brand-mark { overflow: hidden; padding: 0; }
    .brand-mark img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }
    .skills-section { scroll-margin-top: 90px; }
    .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 3rem; }
    .skill-card { padding: 1.35rem; border: 1px solid var(--line); border-radius: 16px; background: color-mix(in srgb, var(--surface) 78%, transparent); transition: transform .25s, border-color .25s, box-shadow .25s; }
    .skill-card:hover { transform: translateY(-5px); border-color: color-mix(in srgb, var(--lime) 65%, var(--line)); box-shadow: var(--shadow); }
    .skill-card-heading { display: flex; align-items: flex-start; gap: .7rem; min-height: 3.2rem; }
    .skill-icon { color: var(--lime); font-size: 1.1rem; }
    .skill-card h3 { margin: 0; font: 600 1.08rem/1.2 "Space Grotesk", sans-serif; }
    .skill-card ul { display: flex; flex-wrap: wrap; gap: .45rem; margin: 1.1rem 0 0; padding: 0; list-style: none; }
    .skill-card li { padding: .35rem .55rem; border: 1px solid var(--line); border-radius: 999px; color: var(--muted); font-size: .76rem; line-height: 1.25; }
    .process-grid { grid-template-columns: repeat(3, 1fr); }
    .process-step p { line-height: 1.55; }
    @media (max-width: 850px) { .skills-grid, .process-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 650px) { .skills-grid, .process-grid { grid-template-columns: 1fr; } .nav-links a:not(.nav-cv)::after { display: none; } }
  `;
  document.head.append(enhancementStyles);
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

// Highlight the current navigation destination as the visitor scrolls.
const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const navigableSections = sectionLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  navigableSections.forEach((section) => sectionObserver.observe(section));
}

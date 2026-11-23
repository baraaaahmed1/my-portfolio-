// 1. Theme Toggle (Dark / Light) with LocalStorage Persistence
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
  } else {
    root.removeAttribute('data-theme');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
  }
}

// Load saved preference on startup
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    const nextTheme = isLight ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  });
}

// 2. Subtle Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// 3. One-Click Email Copy with Feedback
const copyBtn = document.getElementById('copy-email-btn');
const copyText = document.getElementById('copy-text');

if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const email = copyBtn.getAttribute('data-email');
    navigator.clipboard.writeText(email).then(() => {
      const original = copyText.textContent;
      copyText.textContent = 'تم نسخ الإيميل بنجاح';
      setTimeout(() => {
        copyText.textContent = original;
      }, 2200);
    });
  });
}

// 4. Subtle Interactive Tilt on Hero Browser Preview
const mockup = document.getElementById('hero-mockup');

if (mockup && window.innerWidth > 880) {
  mockup.addEventListener('mousemove', (e) => {
    const rect = mockup.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mockup.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  });

  mockup.addEventListener('mouseleave', () => {
    mockup.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  });
}
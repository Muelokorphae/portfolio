// =======================
// Theme Toggle
// =======================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Apply saved theme or default to light
let currentTheme = localStorage.getItem('theme') || 'light';
body.dataset.theme = currentTheme;
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
  currentTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = currentTheme;
  localStorage.setItem('theme', currentTheme);
  updateThemeIcon(currentTheme);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// =======================
// Mobile Menu Toggle
// =======================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = mobileMenuToggle.querySelector('i');
  icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
});

// Close menu on link click
navLinks.forEach(link =>
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
  })
);

// =======================
// Smooth Scrolling
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// =======================
// Scroll Progress Bar
// =======================
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = `${scrollPercent}%`;
});

// =======================
// Typing Animation
// =======================
const typingText = document.getElementById('typing-text');
const texts = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];
  typingText.textContent = currentText.substring(0, charIndex);

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    speed = 500;
  }

  setTimeout(typeWriter, speed);
}
typeWriter();

// =======================
// Scroll Animations
// =======================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      if (entry.target.id === 'skills') {
        animateSkillBars();
      }
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// =======================
// Skill Bar Animation
// =======================
function animateSkillBars() {
  document.querySelectorAll('.skill-progress').forEach(bar => {
    const width = bar.dataset.width;
    setTimeout(() => {
      bar.style.width = `${width}%`;
    }, 200);
  });
}

// =======================
// Particles Animation
// =======================
function createParticles(count = 50) {
  const container = document.getElementById('particles');
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particle.style.animationDuration = `${Math.random() * 3 + 3}s`;
    container.appendChild(particle);
  }
}
createParticles();

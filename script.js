/* =============================================
   SCRIPT — CV Website Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initParticles();
    initScrollReveal();
    initNavigation();
    initNavHighlight();
});

/* =============================================
   TYPING EFFECT
   ============================================= */
function initTypingEffect() {
    const typingEl = document.getElementById('typingText');
    if (!typingEl) return;

    const phrases = [
        'whoami',
        'Cloud Engineer',
        'DevOps Enthusiast',
        'Infrastructure Builder',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 100;

    function type() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typingEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            delay = 50;
        } else {
            typingEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            delay = 120;
        }

        if (!isDeleting && charIndex === current.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 1000);
}

/* =============================================
   PARTICLES
   ============================================= */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = [
        'rgba(143, 245, 255, 0.5)',
        'rgba(209, 188, 255, 0.4)',
        'rgba(188, 255, 95, 0.3)',
    ];

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

/* =============================================
   SCROLL REVEAL
   ============================================= */
function initScrollReveal() {
    // Add reveal class to animatable elements
    const selectors = [
        '.info-card',
        '.skill-card',
        '.timeline-item',
        '.project-card',
        '.cert-card',
        '.contact-card',
        '.tech-stack',
        '.about-text',
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = (i * 0.1) + 's';
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* =============================================
   NAVIGATION
   ============================================= */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const scrollIndicator = document.getElementById('scrollIndicator');

    // Scroll effects
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add scrolled class for bg change
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide scroll indicator
        if (scrollIndicator && currentScroll > 200) {
            scrollIndicator.style.opacity = '0';
        } else if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
        }

        lastScroll = currentScroll;
    });

    // Mobile toggle
    if (toggle && mobileMenu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }
}

/* =============================================
   ACTIVE NAV HIGHLIGHT
   ============================================= */
function initNavHighlight() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px',
    });

    sections.forEach(section => observer.observe(section));
}

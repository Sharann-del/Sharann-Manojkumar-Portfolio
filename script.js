// Custom Cursor
const createCustomCursor = () => {
    // Only create cursor on desktop
    if (window.innerWidth <= 768) return;

    // Create yellow square cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Update cursor position
    function updateCursorPosition(x, y) {
        cursor.style.left = (x - 10) + 'px';  // -10 is half of 20px width
        cursor.style.top = (y - 10) + 'px';
    }

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        updateCursorPosition(e.clientX, e.clientY);
    });

    // Interactive elements - cursor becomes translucent
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .project-card, .skill-badge, .back-to-top, .mobile-menu-toggle, .project-link, .nav-logo a, .experience-item, .dev-box, .resume-preview');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            el.classList.add('cursor-target-active');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            el.classList.remove('cursor-target-active');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
};

// Initialize cursor
createCustomCursor();

// Scroll-Spy Navigation Highlighting
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroImage = document.querySelector('.hero-image-wrapper');
    
    // Function to get current section
    function getCurrentSection() {
        let currentSection = 'home';
        const scrollPosition = window.scrollY + 150; // Offset for navbar height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        return currentSection;
    }
    
    // Function to update active nav link
    function updateActiveNavLink() {
        const currentSection = getCurrentSection();
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Subtle Parallax Effect
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px) rotate(0deg)`;
        }
    }
    
    // Scroll Progress Bar
    const progressBar = document.getElementById('scrollProgress');
    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Update on scroll with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveNavLink();
            parallaxEffect();
            updateScrollProgress();
            toggleBackToTop();
        });
    }, { passive: true });
    
    // Initial update
    updateActiveNavLink();

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.project-card, .skill-badge, .experience-item, .section-title, .hero-text, .hero-image-wrapper, .hero-description, .resume-preview');
    
    let projectIndex = 0;
    let skillIndex = 0;
    
    revealElements.forEach((el) => {
        el.classList.add('reveal');
        if (el.classList.contains('project-card')) {
            el.style.transitionDelay = `${projectIndex * 0.1}s`;
            projectIndex++;
        } else if (el.classList.contains('skill-badge')) {
            el.style.transitionDelay = `${skillIndex * 0.05}s`;
            skillIndex++;
        } else if (el.classList.contains('section-title')) {
            el.style.transitionDelay = '0.1s';
        }
        observer.observe(el);
    });

    // Typewriter Effect
    const typeTarget = document.getElementById('typewriter-text');
    if (typeTarget) {
        const phrases = ['IOS APP DEVELOPER', 'FULL-STACK WEB DEVELOPER'];
        let phraseIndex = 0;
        let charIndex = phrases[0].length;
        let isDeleting = true;
        let typeSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typeTarget.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 80;
            } else {
                typeTarget.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        }

        // Start after a short delay
        setTimeout(type, 1000);
    }
});

// Smooth Scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log("SYSTEM READY");
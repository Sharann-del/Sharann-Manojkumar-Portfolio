// Highlight Active Nav Link
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.project-card, .skill-badge, .experience-item, .section-title, .hero-text, .hero-image-wrapper');
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        if (el.classList.contains('project-card') || el.classList.contains('skill-badge')) {
            el.style.transitionDelay = `${(index % 3) * 0.15}s`;
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

// Simple Smooth Scroll for internal anchors
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

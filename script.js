// ================================
// MODERN PORTFOLIO INTERACTIONS
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // ================================
    // SCROLL PROGRESS BAR
    // ================================
    const progressBar = document.getElementById('scrollProgress');
    
    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }
    
    // ================================
    // THEME TOGGLE
    // ================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            // Save theme preference
            const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            
            // Update navbar background immediately
            const isLightMode = body.classList.contains('light-mode');
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                navbar.style.background = isLightMode ? 'rgba(250, 250, 250, 0.95)' : 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.background = isLightMode ? 'rgba(250, 250, 250, 0.8)' : 'rgba(10, 10, 10, 0.8)';
            }
        });
    }
    
    // ================================
    // TYPING ANIMATION
    // ================================
    const typedTextElement = document.getElementById('typedText');
    const text = 'iOS Developer and Full-Stack Web Developer';
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeText() {
        if (!typedTextElement) return;
        
        if (isPaused) {
            setTimeout(typeText, 2000);
            isPaused = false;
            return;
        }
        
        if (!isDeleting && charIndex < text.length) {
            typedTextElement.textContent = text.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeText, 80);
        } else if (!isDeleting && charIndex === text.length) {
            isPaused = true;
            isDeleting = true;
            setTimeout(typeText, 2000);
        } else if (isDeleting && charIndex > 0) {
            typedTextElement.textContent = text.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeText, 40);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            isPaused = true;
            setTimeout(typeText, 500);
        }
    }
    
    typeText();
    
    // ================================
    // MOBILE MENU TOGGLE
    // ================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            });
        });
    }
    
    // ================================
    // SMOOTH SCROLL WITH OFFSET
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ================================
    // BACK TO TOP BUTTON
    // ================================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ================================
    // INTERSECTION OBSERVER FOR REVEALS
    // ================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe elements with reveal class
    const revealElements = document.querySelectorAll('.about-section, .work-section, .contact-section, .project-item, .timeline-item');
    
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // ================================
    // NAVBAR BACKGROUND ON SCROLL
    // ================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;
        const isLightMode = document.body.classList.contains('light-mode');
        
        if (currentScroll > 100) {
            navbar.style.background = isLightMode ? 'rgba(250, 250, 250, 0.95)' : 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = isLightMode ? 'rgba(250, 250, 250, 0.8)' : 'rgba(10, 10, 10, 0.8)';
        }
        
        lastScroll = currentScroll;
    }
    
    // ================================
    // PARALLAX EFFECT FOR ABOUT IMAGE
    // ================================
    const aboutImage = document.querySelector('.about-image-wrapper');
    
    function parallaxEffect() {
        if (!aboutImage) return;
        const scrolled = window.pageYOffset;
        const rect = aboutImage.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.1;
            aboutImage.style.transform = `translateY(${offset}px)`;
        }
    }
    
    // ================================
    // SMOOTH CARD ANIMATIONS
    // ================================
    const cards = document.querySelectorAll('.project-card-expanded, .detail-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });
    
    // ================================
    // OPTIMIZED SCROLL EVENT HANDLER
    // ================================
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                handleNavbarScroll();
                parallaxEffect();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // ================================
    // INITIAL CALLS
    // ================================
    updateScrollProgress();
    handleNavbarScroll();
    
    // ================================
    // PRELOAD CRITICAL FONTS
    // ================================
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('400 1rem "Fira Code"')
        ]).then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
    
    // ================================
    // CUSTOM CURSOR (ALWAYS ON)
    // ================================
    let cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 65px;
        height: 65px;
        background: white;
        border: 1px solid white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease, background 0.3s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
    });
    
    function animateCursor() {
        dotX += (mouseX - dotX) * 0.22;
        dotY += (mouseY - dotY) * 0.22;
        
        cursorDot.style.left = (dotX - 32.5) + 'px';
        cursorDot.style.top = (dotY - 32.5) + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // ================================
    // PERFORMANCE: REDUCE MOTION
    // ================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }
    
    // ================================
    // TYPING ANIMATION ON BOX HOVER
    // ================================
    const boxes = document.querySelectorAll('.detail-card, .project-card-expanded, .timeline-item-expanded, .skill-tag, .contact-link');
    
    boxes.forEach(box => {
        const textElements = box.querySelectorAll('h5, p, h3, .project-name-expanded, .project-description, .project-type, .project-year, .timeline-year, .timeline-content h5, .timeline-content p, .timeline-company, span:not(.project-tech-stack span), .link-label, .link-text');
        const originalTexts = new Map();
        
        // Store original text content
        textElements.forEach(el => {
            if (el.textContent.trim()) {
                originalTexts.set(el, el.textContent);
            }
        });
        
        let typingTimeout;
        let isTyping = false;
        
        box.addEventListener('mouseenter', () => {
            if (isTyping) return;
            isTyping = true;
            
            textElements.forEach((el, index) => {
                const originalText = originalTexts.get(el);
                if (!originalText) return;
                
                setTimeout(() => {
                    el.textContent = '';
                    let charIndex = 0;
                    
                    const typeChar = () => {
                        if (charIndex < originalText.length) {
                            el.textContent += originalText[charIndex];
                            charIndex++;
                            typingTimeout = setTimeout(typeChar, 10);
                        }
                    };
                    
                    typeChar();
                }, index * 100);
            });
        });
        
        box.addEventListener('mouseleave', () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            isTyping = false;
            
            // Restore original text immediately
            textElements.forEach(el => {
                const originalText = originalTexts.get(el);
                if (originalText) {
                    el.textContent = originalText;
                }
            });
        });
    });
    
    // ================================
    // LOG READY STATE
    // ================================
    console.log('✨ Portfolio loaded successfully');
});

// ================================
// PAGE VISIBILITY API
// ================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('👋 Page hidden');
    } else {
        console.log('👀 Page visible');
    }
});

// ================================
// PREVENT SCROLL JUMP ON LOAD
// ================================
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

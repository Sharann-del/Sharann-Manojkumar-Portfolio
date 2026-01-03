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
    const html = document.documentElement;
    const themeIcon = document.querySelector('.theme-icon');
    
    // Function to update cursor for theme (will be defined after cursor creation)
    let updateCursorForTheme = null;
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light' && themeIcon) {
        themeIcon.textContent = '◑';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            if (themeIcon) {
                themeIcon.textContent = newTheme === 'dark' ? '◐' : '◑';
            }
            
            // Update cursor if function exists
            if (updateCursorForTheme) {
                updateCursorForTheme();
            }
            
            // Update navbar background
            const navbar = document.getElementById('navbar');
            if (navbar) {
                navbar.style.background = newTheme === 'light' ? '#FFFFFF' : '#000000';
            }
            
            // Flash effect
            const flashColor = newTheme === 'dark' ? '#FFFFFF' : '#000000';
            document.body.style.outline = `3px solid ${flashColor}`;
            setTimeout(() => {
                document.body.style.outline = '';
            }, 100);
        });
    }
    
    // ================================
    // FIT NAME TO WIDTH
    // ================================
    function fitNameToWidth() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const container = heroTitle;
        const containerWidth = container.offsetWidth;
        const padding = 8 * 16; // 4rem left + 4rem right = 8rem = 128px
        const border = 6; // 3px left + 3px right = 6px
        const availableWidth = containerWidth - padding - border;
        
        // Get both name lines
        const nameLines = heroTitle.querySelectorAll('.name-line');
        if (nameLines.length === 0) return;
        
        // Find the longest line
        let longestLine = '';
        nameLines.forEach(line => {
            const text = line.textContent.trim();
            if (text.length > longestLine.length) {
                longestLine = text;
            }
        });
        
        // Create a temporary element to measure text width
        const temp = document.createElement('span');
        temp.style.visibility = 'hidden';
        temp.style.position = 'absolute';
        temp.style.whiteSpace = 'nowrap';
        temp.style.fontFamily = getComputedStyle(heroTitle).fontFamily;
        temp.style.fontWeight = getComputedStyle(heroTitle).fontWeight;
        temp.style.letterSpacing = getComputedStyle(heroTitle).letterSpacing;
        temp.style.textTransform = getComputedStyle(heroTitle).textTransform;
        temp.textContent = longestLine;
        document.body.appendChild(temp);
        
        // Binary search for optimal font size
        let minSize = 10;
        let maxSize = 80; // Reduced max size for better fit
        let optimalSize = minSize;
        
        while (minSize <= maxSize) {
            const midSize = Math.floor((minSize + maxSize) / 2);
            temp.style.fontSize = midSize + 'px';
            const textWidth = temp.offsetWidth;
            
            if (textWidth <= availableWidth) {
                optimalSize = midSize;
                minSize = midSize + 1;
            } else {
                maxSize = midSize - 1;
            }
        }
        
        document.body.removeChild(temp);
        heroTitle.style.fontSize = optimalSize + 'px';
    }
    
    // Fit name on load and resize (with debounce)
    let resizeTimeout;
    fitNameToWidth();
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(fitNameToWidth, 100);
    });
    
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
    // INTERSECTION OBSERVER FOR GLITCHY REVEALS
    // ================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class first to reset animation
                entry.target.classList.remove('active');
                // Force reflow
                void entry.target.offsetWidth;
                // Add active class to trigger glitch animation
                entry.target.classList.add('active');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with reveal class - including individual cards and items
    const revealElements = document.querySelectorAll(
        '.about-section, .work-section, .contact-section, .footer, ' +
        '.detail-card, .project-card-expanded, .timeline-item-expanded, ' +
        '.detail-section, .section-heading, .about-intro, .skill-tag, .contact-link'
    );
    
    revealElements.forEach((el) => {
        el.classList.add('reveal');
        observer.observe(el);
    });
    
    // ================================
    // NAVBAR BACKGROUND ON SCROLL
    // ================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    function handleNavbarScroll() {
        if (!navbar) return;
        const currentScroll = window.pageYOffset;
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const bgColor = currentTheme === 'light' ? '#FFFFFF' : '#000000';
        
        if (currentScroll > 100) {
            navbar.style.background = bgColor;
            navbar.style.borderBottomWidth = '2px';
        } else {
            navbar.style.background = bgColor;
            navbar.style.borderBottomWidth = '2px';
        }
        
        lastScroll = currentScroll;
    }
    
    // Update navbar on theme change
    const navbarThemeObserver = new MutationObserver(() => {
        handleNavbarScroll();
    });
    if (navbar) {
        navbarThemeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        
        // Initialize navbar background for current theme
        const initialTheme = document.documentElement.getAttribute('data-theme');
        navbar.style.background = initialTheme === 'light' ? '#FFFFFF' : '#000000';
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
    // CUSTOM CURSOR
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
    
    // Make cursor transparent when hovering over profile image (works in both modes)
    const heroImageContainer = document.querySelector('.hero-image-container');
    if (heroImageContainer) {
        heroImageContainer.addEventListener('mouseenter', () => {
            cursorDot.style.mixBlendMode = 'normal';
            cursorDot.style.background = 'transparent';
            cursorDot.style.border = '1px solid transparent';
        });
        
        heroImageContainer.addEventListener('mouseleave', () => {
            // Restore cursor with mix-blend-mode: difference for both modes
            cursorDot.style.mixBlendMode = 'difference';
            cursorDot.style.background = 'white';
            cursorDot.style.border = '1px solid white';
        });
    }
    
    // Update cursor on theme change
    updateCursorForTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        // Use mix-blend-mode: difference in both modes for opposite color effect
        cursorDot.style.mixBlendMode = 'difference';
        cursorDot.style.background = 'white';
        cursorDot.style.border = '1px solid white';
    };
    
    // Listen for theme changes
    const themeObserver = new MutationObserver(() => {
        if (updateCursorForTheme) {
            updateCursorForTheme();
        }
    });
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    // Initialize cursor for current theme
    updateCursorForTheme();
    
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
    const boxes = document.querySelectorAll('.detail-card, .project-card-expanded, .timeline-item-expanded, .skill-tag');
    
    boxes.forEach(box => {
        const textElements = box.querySelectorAll('h5, p, h3, .project-name-expanded, .project-description, .project-type, .project-year, .timeline-year, .timeline-content h5, .timeline-content p, .timeline-company, span:not(.project-tech-stack span), .link-label, .link-text');
        const originalTexts = new Map();
        
        // Store original text content
        textElements.forEach(el => {
            if (el.textContent.trim()) {
                originalTexts.set(el, el.textContent);
            }
        });
        
        let allTimeouts = [];
        let isTyping = false;
        let currentBox = null;
        
        box.addEventListener('mouseenter', () => {
            // Cancel any previous animation on other boxes
            if (currentBox && currentBox !== box) {
                // Clear all timeouts from previous box
                allTimeouts.forEach(timeout => clearTimeout(timeout));
                allTimeouts = [];
                
                // Restore previous box immediately
                const prevTextElements = currentBox.querySelectorAll('h5, p, h3, .project-name-expanded, .project-description, .project-type, .project-year, .timeline-year, .timeline-content h5, .timeline-content p, .timeline-company, span:not(.project-tech-stack span), .link-label, .link-text');
                prevTextElements.forEach(el => {
                    const originalText = el.getAttribute('data-original');
                    if (originalText) {
                        el.textContent = originalText;
                    }
                });
            }
            
            // Clear any existing timeouts for this box
            allTimeouts.forEach(timeout => clearTimeout(timeout));
            allTimeouts = [];
            isTyping = false;
            
            currentBox = box;
            isTyping = true;
            
            textElements.forEach((el, index) => {
                const originalText = originalTexts.get(el);
                if (!originalText) return;
                
                // Store original text in data attribute for quick restoration
                el.setAttribute('data-original', originalText);
                
                const delay = index * 20; // Minimal delay between elements for simultaneous effect
                
                const timeoutId = setTimeout(() => {
                    if (!isTyping || currentBox !== box) return;
                    
                    el.textContent = '';
                    let charIndex = 0;
                    
                    // Fast typing speed - complete in ~800ms max for glitch effect
                    const totalChars = originalText.length;
                    const typingDuration = 800; // Max 800ms for glitch effect
                    const delayPerChar = Math.max(1, Math.floor(typingDuration / totalChars));
                    
                    const typeChar = () => {
                        if (!isTyping || currentBox !== box || charIndex >= originalText.length) {
                            return;
                        }
                        
                        el.textContent += originalText[charIndex];
                        charIndex++;
                        
                        if (charIndex < originalText.length) {
                            const timeout = setTimeout(typeChar, delayPerChar);
                            allTimeouts.push(timeout);
                        }
                    };
                    
                    typeChar();
                }, delay);
                
                allTimeouts.push(timeoutId);
            });
        });
        
        box.addEventListener('mouseleave', () => {
            // Clear all timeouts immediately
            allTimeouts.forEach(timeout => clearTimeout(timeout));
            allTimeouts = [];
            isTyping = false;
            
            // Restore original text instantly
            textElements.forEach(el => {
                const originalText = originalTexts.get(el);
                if (originalText) {
                    el.textContent = originalText;
                }
            });
            
            if (currentBox === box) {
                currentBox = null;
            }
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

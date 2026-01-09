// Advanced Site Loader Animation
document.addEventListener('DOMContentLoaded', () => {
    const siteLoader = document.getElementById('siteLoader');
    const body = document.body;

    // Check if this is a page transition (via sessionStorage)
    const isPageTransition = sessionStorage.getItem('pageTransition') === 'true';
    
    if (isPageTransition && siteLoader) {
        // Hide loader immediately for page transitions
        siteLoader.style.display = 'none';
        body.classList.add('loaded');
        sessionStorage.removeItem('pageTransition');
    } else if (siteLoader) {
        // Terminal-themed loader animations
        const terminalCommand = document.getElementById('terminalCommand');
        const terminalOutput = document.getElementById('terminalOutput');
        const loaderPercentage = document.getElementById('loaderPercentage');
        const loaderProgress = document.getElementById('loaderProgress');
        
        // Typewriter effect for terminal command
        if (terminalCommand) {
            const commands = ['npm run dev', 'yarn build', 'tsc --watch'];
            let commandIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            
            const typeCommand = () => {
                const currentCommand = commands[commandIndex];
                
                if (!isDeleting && charIndex < currentCommand.length) {
                    terminalCommand.textContent = currentCommand.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeCommand, 100);
                } else if (isDeleting && charIndex > 0) {
                    terminalCommand.textContent = currentCommand.substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(typeCommand, 50);
                } else if (!isDeleting && charIndex === currentCommand.length) {
                    setTimeout(() => {
                        isDeleting = true;
                        typeCommand();
                    }, 1000);
                } else {
                    isDeleting = false;
                    commandIndex = (commandIndex + 1) % commands.length;
                    setTimeout(typeCommand, 500);
                }
            };
            
            setTimeout(typeCommand, 500);
        }
        
        // Animate percentage counter with terminal style
        if (loaderPercentage && loaderProgress) {
            let progress = 0;
            const duration = 2000; // 2 seconds
            const startTime = Date.now() + 2000; // Start after 2s delay
            
            const updateProgress = () => {
                const elapsed = Date.now() - startTime;
                if (elapsed < 0) {
                    requestAnimationFrame(updateProgress);
                    return;
                }
                
                progress = Math.min((elapsed / duration) * 100, 100);
                const roundedProgress = Math.floor(progress);
                
                if (loaderPercentage) {
                    loaderPercentage.textContent = `${roundedProgress}%`;
                }
                
                if (progress < 100) {
                    requestAnimationFrame(updateProgress);
                } else {
                    loaderPercentage.textContent = '100%';
                }
            };
            
            requestAnimationFrame(updateProgress);
        }
        
        // Show full loader animation on first load
        setTimeout(() => {
            if (siteLoader) {
                body.classList.add('loaded');
            }
        }, 3500);

        // Remove loader from DOM after transition completes
        setTimeout(() => {
            if (siteLoader) {
                siteLoader.style.display = 'none';
            }
        }, 4800);
    }
});

// Advanced Custom Cursor - Dev Theme with Trailing Effects
const createCustomCursor = () => {
    // Only create cursor on desktop
    if (window.innerWidth <= 768) return;

    // Create main cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Cursor position tracking
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailCount = 0;
    let lastTrailTime = 0;

    // Smooth cursor following with easing
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        // Smooth easing
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Create trail dots with throttling
        const now = Date.now();
        if (now - lastTrailTime > 30) { // Create trail every 30ms
            createTrail(e.clientX, e.clientY);
            lastTrailTime = now;
        }
    });

    // Create trailing effect dots
    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);

        // Remove trail after animation
        setTimeout(() => {
            trail.remove();
        }, 600);
    }

    // Start animation loop
    animateCursor();

    // Interactive elements - cursor expands and changes color
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .project-card, .project-card-expanded, .about-card-expanded, .experience-card-expanded, .skill-badge, .back-to-top, .mobile-menu-toggle, .project-link, .project-link-expanded, .nav-logo a, .experience-item, .dev-box, .resume-preview');

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

    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-click');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
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
        const scrollPosition = window.scrollY + 200; // Offset for navbar height

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

    const revealElements = document.querySelectorAll('.project-card, .project-card-expanded, .about-card-expanded, .experience-card-expanded, .skill-badge, .experience-item, .section-title, .hero-text, .hero-image-wrapper, .hero-description, .resume-preview, .dev-box');

    let projectIndex = 0;
    let skillIndex = 0;

    revealElements.forEach((el) => {
        el.classList.add('reveal');
        if (el.classList.contains('project-card') || el.classList.contains('project-card-expanded')) {
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

    // Typewriter Effect with Dev Theme
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

    // Removed code particle effects for cleaner look

    // Terminal-style Notification System
    function showTerminalNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'terminal-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: rgba(26, 27, 38, 0.9);
            backdrop-filter: blur(20px) saturate(180%);
            border: 2px solid ${type === 'success' ? 'rgba(158, 206, 106, 0.4)' : 'rgba(122, 162, 247, 0.4)'};
            padding: 1rem 1.5rem;
            font-family: 'Space Mono', monospace;
            font-size: 0.9rem;
            color: ${type === 'success' ? '#9ece6a' : '#7aa2f7'};
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8), 0 0 20px ${type === 'success' ? 'rgba(158, 206, 106, 0.2)' : 'rgba(122, 162, 247, 0.2)'};
            z-index: 10001;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            border-radius: 4px;
        `;
        notification.innerHTML = `<span style="color: #9ece6a; margin-right: 0.5rem;">✓</span>${message}`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }

    // Removed section scroll notifications for cleaner experience

    // Removed button click notifications for cleaner experience

    // Removed glitch animation for cleaner look

    // Removed line numbers for cleaner look

    // Removed status indicator for cleaner look

    // Code-like Variable Declaration Effect
    document.querySelectorAll('.project-name-expanded, .about-card-name-expanded, .experience-name-expanded').forEach(name => {
        name.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px currentColor, 0 0 30px currentColor';
        });

        name.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
        });
    });

    // Terminal-style Command History
    const commandHistory = [];
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'k') {
                e.preventDefault();
                showTerminalNotification('Terminal cleared', 'info');
            }
        }
    });

    // IDE-style Auto-complete on Nav Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            const section = this.getAttribute('data-section');
            if (section) {
                this.setAttribute('title', `Navigate to ${section} section`);
            }
        });
    });

    // Code-like Function Call Animation
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.animation = 'successFlash 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });

    // Removed process indicators for cleaner look
});

// Add process pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes processPulse {
        0%, 100% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.5;
            transform: scale(1.2);
        }
    }
`;
document.head.appendChild(style);

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
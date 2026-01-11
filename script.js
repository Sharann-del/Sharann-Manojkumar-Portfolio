// Code Typing Loader Animation
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
        const codeEditorWindow = document.getElementById('codeEditorWindow');
        const buildWindow = document.getElementById('buildWindow');
        const chromeWindow = document.getElementById('chromeWindow');
        const codeText = document.getElementById('codeText');
        const typingCursor = document.getElementById('typingCursor');
        const buildOutput = document.getElementById('buildOutput');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const chromeUrlText = document.getElementById('chromeUrlText');
        const chromeContent = document.getElementById('chromeContent');
        const chromeLoading = document.getElementById('chromeLoading');
        
        // Initialize: Show code editor window
        codeEditorWindow.classList.add('active');
        
        // Get the HTML content (excluding the loader)
        const htmlContent = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sharann Manojkumar | iOS & Full-Stack Developer</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="scroll-progress" id="scrollProgress"></div>
    <nav class="navbar">
        <div class="container nav-container">
            <div class="nav-logo">
                <a href="#home">Sharann Manojkumar</a>
            </div>
            <div class="mobile-menu-toggle" id="mobileMenuToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul class="nav-menu" id="navMenu">
                <li><a href="#home" class="nav-link" data-section="home">Home</a></li>
                <li><a href="#about" class="nav-link" data-section="about">About</a></li>
                <li><a href="#tools" class="nav-link" data-section="tools">Tools</a></li>
                <li><a href="#work" class="nav-link" data-section="work">Work</a></li>
                <li><a href="#experience" class="nav-link" data-section="experience">Exp</a></li>
                <li><a href="#resume" class="nav-link" data-section="resume">Resume</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section v-center">
        <div class="container hero-content">
            <div class="hero-text">
                <span class="hero-greeting">HELLO. I'M SHARANN MANOJKUMAR</span>
                <h1 class="hero-title"><span id="typewriter-text">IOS APP DEVELOPER</span><span
                        class="typewriter-caret">_</span></h1>
                <p class="hero-description">
                    Creating innovative solutions through code, design, and passion for technology.
                    Specializing in Web Applications and iOS Development.
                </p>
                <div class="hero-actions">
                    <a href="#work" class="btn btn-primary">See My Work</a>
                    <a href="#about" class="btn btn-secondary">About Me</a>
                </div>
            </div>
            <div class="hero-image-wrapper">
                <img src="picture.jpg" alt="Sharann" class="hero-image">
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section-full">
        <div class="container">
            <h2 class="section-title">About Me</h2>
            <div class="experience-item">
                <p style="margin-bottom: 2rem; font-size: 1.2rem;">
                    Creating useful and user-centered applications is something I really enjoy doing, and alongside
                    that, I am developing my skills in iOS app development and web development.
                </p>
                <p style="margin-bottom: 1.5rem;">
                    I am a member of the web/app development department of the <strong>iSpace Club</strong> at my
                    college. In this position, I work with other developers, help out in the student tech initiatives,
                    and constantly work on getting my technical skills up to par through project-based learning.
                </p>
                <div class="about-cards-grid">
                    <article class="about-card-expanded">
                        <div class="about-card-header-expanded">
                            <div class="about-card-meta-expanded">
                                <span class="about-card-type">Development Focus</span>
                            </div>
                            <h3 class="about-card-name-expanded">iOS Development</h3>
                        </div>
                        <p class="about-card-description-expanded">
                            Xcode is my primary development environment, and I am developing iOS applications using both
                            Swift and SwiftUI. Currently working on productivity-focused apps including Notion Widgets
                            and
                            Student Planner.
                        </p>
                        <div class="about-card-tech-stack">
                            <span>Swift</span>
                            <span>SwiftUI</span>
                            <span>Xcode</span>
                            <span>WidgetKit</span>
                        </div>
                    </article>

                    <article class="about-card-expanded">
                        <div class="about-card-header-expanded">
                            <div class="about-card-meta-expanded">
                                <span class="about-card-type">Development Focus</span>
                            </div>
                            <h3 class="about-card-name-expanded">Full-Stack Web Development</h3>
                        </div>
                        <p class="about-card-description-expanded">
                            Experienced in building web-based systems with Node.js, TypeScript, and PostgreSQL. Worked
                            on a
                            centralized billing and stock management system during my internship at Geo Pacific
                            Solutions.
                        </p>
                        <div class="about-card-tech-stack">
                            <span>React</span>
                            <span>Node.js</span>
                            <span>TypeScript</span>
                            <span>PostgreSQL</span>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>

    <!-- Tools Section -->
    <section id="tools" class="section-full v-center">
        <div class="container">
            <h2 class="section-title">Tools & Skills</h2>
            <div class="skills-grid">
                <div class="skill-badge">C</div>
                <div class="skill-badge">C++</div>
                <div class="skill-badge">Java</div>
                <div class="skill-badge">Swift</div>
                <div class="skill-badge">Python</div>
                <div class="skill-badge">JavaScript</div>
                <div class="skill-badge">TypeScript</div>
                <div class="skill-badge">HTML/CSS</div>
                <div class="skill-badge skill-react">React</div>
                <div class="skill-badge skill-node">Node.js</div>
                <div class="skill-badge skill-postgres">PostgreSQL</div>
                <div class="skill-badge">Git</div>
                <div class="skill-badge">Xcode</div>
                <div class="skill-badge">Figma</div>
                <div class="skill-badge">Postman</div>
            </div>
        </div>
    </section>

    <!-- Work Section -->
    <section id="work" class="section-full">
        <div class="container">
            <h2 class="section-title">Selected Work</h2>
            <div class="projects-grid-expanded">
                <!-- Projects content here -->
            </div>
        </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="section-full v-center">
        <div class="container">
            <h2 class="section-title">Experience</h2>
            <!-- Experience content here -->
        </div>
    </section>

    <!-- Resume Section -->
    <section id="resume" class="section-full">
        <div class="container">
            <h2 class="section-title">My Resume</h2>
            <!-- Resume content here -->
        </div>
    </section>

    <footer>
        <div class="container">
        </div>
    </footer>

    <button class="back-to-top" id="backToTop" aria-label="Back to top">↑</button>

    <script src="script.js"></script>
</body>

</html>`;
        
        let currentIndex = 0;
        const charsPerFrame = 15; // Type 15 characters per frame for ultra-fast typing
        
        // Type the code character by character
        function typeCode() {
            if (currentIndex < htmlContent.length) {
                // Type multiple characters at once
                const endIndex = Math.min(currentIndex + charsPerFrame, htmlContent.length);
                const typedText = htmlContent.substring(0, endIndex);
                currentIndex = endIndex;
                
                // Escape HTML for display, then apply basic highlighting
                const escapedText = typedText
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;');
                
                // Apply syntax highlighting
                let highlightedText = escapedText;
                
                // Highlight HTML tags
                highlightedText = highlightedText.replace(/&lt;(\/?)([\w-]+)([^&]*?)&gt;/g, (match, closing, tag, attrs) => {
                    const tagColor = closing ? 'var(--red)' : 'var(--blue)';
                    return `<span style="color: ${tagColor}">${match}</span>`;
                });
                
                // Highlight comments
                highlightedText = highlightedText.replace(/&lt;!--[\s\S]*?--&gt;/g, (match) => {
                    return `<span style="color: var(--text-tertiary)">${match}</span>`;
                });
                
                // Highlight attributes
                highlightedText = highlightedText.replace(/([\w-]+)=&quot;/g, (match, attr) => {
                    return `<span style="color: var(--yellow)">${attr}</span>=&quot;`;
                });
                
                // Highlight strings
                highlightedText = highlightedText.replace(/&quot;([^&]*?)&quot;/g, (match, content) => {
                    return `<span style="color: var(--green)">&quot;${content}&quot;</span>`;
                });
                
                codeText.innerHTML = highlightedText;
                
                // Auto-scroll to bottom
                const codeContent = document.querySelector('.code-content');
                if (codeContent) {
                    codeContent.scrollTop = codeContent.scrollHeight;
                }
                
                // Use requestAnimationFrame for smooth, fast typing
                requestAnimationFrame(typeCode);
            } else {
                // Typing complete - hide cursor
                typingCursor.style.display = 'none';
                
                // Step 1: Hide code editor, show build terminal
                setTimeout(() => {
                    codeEditorWindow.style.opacity = '0';
                    codeEditorWindow.style.transform = 'scale(0.95) translateY(-20px)';
                    
                    setTimeout(() => {
                        codeEditorWindow.style.display = 'none';
                        buildWindow.classList.add('active');
                        
                        // Build messages
                        const buildMessages = [
                            { text: '$ npm run build', type: 'info', delay: 0 },
                            { text: '> Building portfolio...', type: 'info', delay: 300 },
                            { text: '✓ HTML compiled', type: 'success', delay: 600 },
                            { text: '✓ CSS processed', type: 'success', delay: 900 },
                            { text: '✓ JavaScript bundled', type: 'success', delay: 1200 },
                            { text: '✓ Assets optimized', type: 'success', delay: 1500 },
                            { text: '✓ Build complete!', type: 'success', delay: 1800 },
                        ];
                        
                        // Display build messages
                        buildMessages.forEach((msg, index) => {
                            setTimeout(() => {
                                const line = document.createElement('div');
                                line.className = `build-line ${msg.type}`;
                                line.textContent = msg.text;
                                buildOutput.appendChild(line);
                                
                                // Auto-scroll
                                buildOutput.scrollTop = buildOutput.scrollHeight;
                                
                                // Update progress
                                const progress = ((index + 1) / buildMessages.length) * 100;
                                progressFill.style.width = progress + '%';
                                progressText.textContent = Math.round(progress) + '%';
                            }, msg.delay);
                        });
                        
                        // Step 2: After build, show Chrome browser
                        setTimeout(() => {
                            buildWindow.style.opacity = '0';
                            buildWindow.style.transform = 'scale(0.95)';
                            
                            setTimeout(() => {
                                buildWindow.style.display = 'none';
                                chromeWindow.classList.add('active');
                                
                                // Step 3: Type URL in address bar
                                setTimeout(() => {
                                    const url = 'sharann.dev';
                                    let urlIndex = 0;
                                    
                                    function typeUrl() {
                                        if (urlIndex < url.length) {
                                            chromeUrlText.textContent = url.substring(0, urlIndex + 1);
                                            urlIndex++;
                                            setTimeout(typeUrl, 80);
                                        } else {
                                            // URL typed, press enter
                                            setTimeout(() => {
                                                // Simulate pressing enter
                                                setTimeout(() => {
                                                    chromeLoading.style.display = 'flex';
                                                    
                                                    // Show website loading
                                                    setTimeout(() => {
                                                        chromeLoading.style.opacity = '0';
                                                        
                                                        setTimeout(() => {
                                                            chromeLoading.style.display = 'none';
                                                            
                                                            // Move all website content into Chrome content area
                                                            const allContent = Array.from(body.children).filter(
                                                                el => el.id !== 'siteLoader' && !el.classList.contains('site-loader')
                                                            );
                                                            
                                                            // Append all content to Chrome content area
                                                            allContent.forEach(el => {
                                                                // Reset any styles that might block interaction
                                                                el.style.pointerEvents = 'auto';
                                                                el.style.position = 'relative';
                                                                el.style.zIndex = '1';
                                                                chromeContent.appendChild(el);
                                                            });
                                                            
                                                            // Show website content
                                                            body.classList.add('loaded');
                                                            
                                                            // Ensure site loader doesn't block interaction
                                                            siteLoader.style.pointerEvents = 'none';
                                                            
                                                            // Cursor is already visible
                                                            document.body.style.cursor = '';
                                                            
                                                            // Re-initialize any event listeners that might need re-binding
                                                            // This ensures all interactive elements work
                                                            setTimeout(() => {
                                                                const links = chromeContent.querySelectorAll('a, button, .btn, .nav-link');
                                                                links.forEach(link => {
                                                                    link.style.pointerEvents = 'auto';
                                                                    link.style.cursor = 'pointer';
                                                                });
                                                            }, 100);
                                                        }, 500);
                                                    }, 2000);
                                                }, 500);
                                            }, 500);
                                        }
                                    }
                                    
                                    typeUrl();
                                }, 800);
                            }, 500);
                        }, 2500);
                    }, 500);
                }, 1000);
            }
        }
        
        // Start typing after a short delay
        setTimeout(() => {
            codeEditorWindow.classList.add('active');
            typeCode();
        }, 500);
    }
});

// Advanced Custom Cursor - Dev Theme with Trailing Effects
const createCustomCursor = () => {
    // Only create cursor on desktop
    if (window.innerWidth <= 768) return;

    // Create main cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = 'position: fixed !important; z-index: 999999 !important; pointer-events: none !important; opacity: 1 !important; visibility: visible !important; display: block !important;';
    document.body.appendChild(cursor);

    // Cursor position tracking
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
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
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .project-card, .project-card-expanded, .about-card-expanded, .experience-card-expanded, .skill-badge, .back-to-top, .mobile-menu-toggle, .project-link, .project-link-expanded, .nav-logo a, .experience-item, .dev-box, .resume-preview, .chrome-nav-btn, .chrome-menu, .chrome-address-bar, .macos-controls, .macos-close, .macos-minimize, .macos-maximize');

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
};

// Initialize cursor after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createCustomCursor);
} else {
    createCustomCursor();
}

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

    // Scroll Progress Bar removed
    const chromeWindow = document.getElementById('chromeWindow');
    const chromeContent = document.getElementById('chromeContent');

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
    
    function handleScroll() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveNavLink();
            parallaxEffect();
            toggleBackToTop();
        });
    }
    
    // Listen to both window scroll and Chrome content scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also listen to Chrome content scroll if it exists
    if (chromeContent) {
        chromeContent.addEventListener('scroll', handleScroll, { passive: true });
    }

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
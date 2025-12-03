// Page Navigation System
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize: Show home section and hide others
function initNavigation() {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    const homeSection = document.querySelector('#home');
    if (homeSection) {
        homeSection.classList.add('active');
    }
    updateActiveNavLink('home');
    document.body.style.overflow = 'hidden';
}

// Show specific section and hide others
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
        updateActiveNavLink(sectionId);
        
        // Reset and observe elements for animation
        setTimeout(() => {
            const animateElements = targetSection.querySelectorAll('.skill-card, .project-card, .experience-item');
            animateElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(el);
            });
        }, 100);
    }
}

// Update active navigation link
function updateActiveNavLink(activeId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${activeId}`) {
            link.classList.add('active');
        }
    });
}

// Navigation link click handlers
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1); // Remove #
        
        showSection(targetId);
        
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'hidden';
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    const sectionId = window.location.hash.substring(1) || 'home';
    showSection(sectionId);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    
    // Handle initial hash if present
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    }
});

// Add active class styling to nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-white);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Intersection Observer for Fade-in Animations (for elements within active section)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);



// Add hover effect to skill cards with delay
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
});

// Project cards stagger animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Smooth reveal animation for about text
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    aboutText.style.opacity = '0';
    aboutText.style.transform = 'translateY(20px)';
    aboutText.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    aboutObserver.observe(aboutText);
}

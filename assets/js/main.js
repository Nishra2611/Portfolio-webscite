/**
 * Main JavaScript File
 * Handles animations and UI interactions for the portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .hidden-onload');
    
    // Reveal everything that is in view on load, hide others
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                entry.target.classList.remove('hidden-onload');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initial check for navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // 3. Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-links a[href^="#"], .hero-ctas a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed navbar
                const navbarHeight = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

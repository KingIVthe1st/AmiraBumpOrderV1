/**
 * Optimized JavaScript for AmiraBumpOrderV1
 * Includes anchor fix and scroll effects
 */
(function() {
    'use strict';
    
    // Configuration
    const config = {
        targetSection: 'masterabstract',
        maxScrollAttempts: 20,
        scrollDelay: 100,
        scrollOffset: 80,
        debug: false
    };

    // Debug helper
    function debug(...args) {
        if (config.debug) {
            console.log('[AnchorFix]', ...args);
        }
    }

    // Main scroll function
    function scrollToTarget() {
        const hash = window.location.hash.substring(1);
        if (hash !== config.targetSection) return;

        debug('Attempting to scroll to target section');
        
        // Try to find the target element
        let target = document.getElementById(config.targetSection);
        
        // Fallback: Find by heading text
        if (!target) {
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            for (let heading of headings) {
                if (heading.textContent && heading.textContent.includes('Master Abstract')) {
                    target = heading.closest('section, div, header') || heading;
                    break;
                }
            }
        }

        // If target found, scroll to it
        if (target) {
            const rect = target.getBoundingClientRect();
            const offsetTop = window.pageYOffset + rect.top - config.scrollOffset;
            
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
            
            debug('Successfully scrolled to target');
            return true;
        }
        
        debug('Target not found');
        return false;
    }

    // Handle initial page load
    function handleInitialLoad() {
        if (window.location.hash.includes(config.targetSection)) {
            // Small delay to ensure all elements are loaded
            setTimeout(() => {
                if (!scrollToTarget()) {
                    // If first attempt fails, try again after a delay
                    setTimeout(scrollToTarget, 500);
                }
            }, 100);
        }
    }

    // Initialize
    function init() {
        // Handle hash changes
        window.addEventListener('hashchange', () => {
            if (window.location.hash.includes(config.targetSection)) {
                setTimeout(scrollToTarget, 100);
            }
        });

        // Handle initial load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', handleInitialLoad);
        } else {
            handleInitialLoad();
        }

        // Expose function for manual triggering if needed
        window.scrollToMasterAbstract = scrollToTarget;
        
        debug('Initialized');
    }

    // Logo fade effect on scroll
    function initLogoFadeEffect() {
        const logo = document.querySelector('.site-logo img');
        if (!logo) return;
        
        // Initial state
        logo.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        
        // Scroll handler
        function handleScroll() {
            const scrollPosition = window.scrollY;
            const fadeStart = 100; // Start fading at this scroll position
            const fadeEnd = 300;   // Fully faded at this scroll position
            
            if (scrollPosition <= fadeStart) {
                // Fully visible
                logo.style.opacity = '1';
                logo.style.transform = 'scale(1)';
            } else if (scrollPosition >= fadeEnd) {
                // Fully faded
                logo.style.opacity = '0.6';
                logo.style.transform = 'scale(0.9)';
            } else {
                // Partial fade
                const fadePercent = (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
                const opacity = 1 - (fadePercent * 0.4); // Only fade to 0.6 opacity
                const scale = 1 - (fadePercent * 0.1);   // Only scale down to 0.9
                
                logo.style.opacity = opacity.toString();
                logo.style.transform = `scale(${scale})`;
            }
        }
        
        // Add scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial call to set correct state
        handleScroll();
    }
    
    // Start the script
    init();
    
    // Initialize logo fade effect after DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLogoFadeEffect);
    } else {
        initLogoFadeEffect();
    }
})();

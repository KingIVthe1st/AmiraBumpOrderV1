/**
 * Optimized Anchor Fix for AmiraBumpOrderV1
 * Combines functionality from anchor-fix.js and immediate-anchor-fix.js
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

    // Start the script
    init();
})();

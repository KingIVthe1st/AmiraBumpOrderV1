// Enhanced Anchor Link Fix - Handles initial page load timing issues
(function() {
    'use strict';
    
    let scrollAttempts = 0;
    const maxScrollAttempts = 20;
    const scrollDelay = 100;
    
    function scrollToAnchor() {
        // Get the hash without the #
        const hash = window.location.hash.substring(1);
        
        if (hash !== 'masterabstract') {
            return;
        }
        
        scrollAttempts++;
        
        // First try to find the section by ID
        let target = document.getElementById('masterabstract');
        
        if (!target) {
            // If section doesn't exist, find the heading with "Master Abstract"
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            for (let heading of headings) {
                if (heading.textContent.includes('Master Abstract')) {
                    target = heading.closest('section, div, header') || heading;
                    break;
                }
            }
        }
        
        if (!target && scrollAttempts < maxScrollAttempts) {
            // If target not found and we haven't reached max attempts, try again
            setTimeout(scrollToAnchor, scrollDelay);
            return;
        }
        
        if (target) {
            // Calculate the optimal scroll position
            const rect = target.getBoundingClientRect();
            const absoluteTop = window.pageYOffset + rect.top;
            
            // Scroll with an offset to account for any fixed headers
            const offsetTop = Math.max(0, absoluteTop - 50);
            
            // Use smooth scrolling
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            console.log('✅ Scrolled to Master Abstract section (attempt ' + scrollAttempts + ')');
            
            // Update the URL without triggering another hash change
            if (window.history && window.history.replaceState) {
                window.history.replaceState(null, null, '#masterabstract');
            }
        } else if (scrollAttempts >= maxScrollAttempts) {
            console.log('❌ Could not find Master Abstract section after ' + maxScrollAttempts + ' attempts');
        }
    }
    
    function handleInitialLoad() {
        if (window.location.hash === '#masterabstract') {
            // Wait for images, videos, and other content to load
            if (document.readyState === 'complete') {
                // Page already loaded, scroll immediately
                setTimeout(scrollToAnchor, 50);
            } else {
                // Wait for page to fully load
                window.addEventListener('load', function() {
                    // Additional delay to ensure Vimeo player is loaded
                    setTimeout(scrollToAnchor, 500);
                });
            }
        }
    }
    
    // Handle hash changes (when clicking anchor links)
    window.addEventListener('hashchange', function() {
        scrollAttempts = 0; // Reset attempts for new hash
        setTimeout(scrollToAnchor, 50);
    });
    
    // Handle initial page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleInitialLoad);
    } else {
        handleInitialLoad();
    }
    
    // Additional check for Vimeo player load
    function waitForVimeoPlayer() {
        const vimeoContainer = document.getElementById('vimeo-player');
        if (vimeoContainer && window.location.hash === '#masterabstract') {
            const iframe = vimeoContainer.querySelector('iframe');
            if (iframe) {
                iframe.addEventListener('load', function() {
                    setTimeout(scrollToAnchor, 200);
                });
            }
        }
    }
    
    // Check for Vimeo player after a delay
    setTimeout(waitForVimeoPlayer, 1000);
    
    // Global function for manual testing
    window.testAnchorScroll = scrollToAnchor;
    
})();

// Anchor Link Fix Script
// This script will work even if the masterabstract section doesn't exist yet

(function() {
    // Function to scroll to the Master Abstract section
    function scrollToMasterAbstract() {
        // First try to find the section by ID
        let target = document.getElementById('masterabstract');
        
        if (!target) {
            // If section doesn't exist, find the text "Master Abstract"
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            for (let heading of headings) {
                if (heading.textContent.includes('Master Abstract')) {
                    target = heading;
                    break;
                }
            }
        }
        
        if (!target) {
            // Last resort: find any element containing "Master Abstract"
            const allElements = document.querySelectorAll('*');
            for (let element of allElements) {
                if (element.textContent && element.textContent.includes('Master Abstract') && element.children.length === 0) {
                    target = element.closest('section, div, header');
                    break;
                }
            }
        }
        
        if (target) {
            // Smooth scroll to the target
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
            });
            
            // Add some top offset to account for any fixed headers
            setTimeout(() => {
                window.scrollBy(0, -50);
            }, 100);
            
            console.log('Scrolled to Master Abstract section');
            return true;
        } else {
            console.log('Master Abstract section not found');
            return false;
        }
    }
    
    // Check if we have the anchor in the URL
    if (window.location.hash === '#masterabstract') {
        // Wait for page to load then scroll
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', scrollToMasterAbstract);
        } else {
            scrollToMasterAbstract();
        }
    }
    
    // Also handle hashchange events
    window.addEventListener('hashchange', function() {
        if (window.location.hash === '#masterabstract') {
            scrollToMasterAbstract();
        }
    });
    
    // Add a global function for manual testing
    window.testAnchor = scrollToMasterAbstract;
})();

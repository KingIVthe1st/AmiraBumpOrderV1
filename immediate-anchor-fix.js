// IMMEDIATE ANCHOR FIX - Copy and paste this into browser console or add to your site

// Method 1: Manual JavaScript Fix (Use this RIGHT NOW)
function fixAnchorLink() {
    // Find the Master Abstract heading
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, span');
    let target = null;
    
    for (let heading of headings) {
        if (heading.textContent && heading.textContent.includes('Master Abstract')) {
            target = heading;
            break;
        }
    }
    
    if (target) {
        // Get the section or parent container
        const section = target.closest('section, div, header') || target;
        
        // Scroll to it with offset
        const rect = section.getBoundingClientRect();
        const offsetTop = window.pageYOffset + rect.top - 80;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        console.log('✅ Manually scrolled to Master Abstract section');
        return true;
    }
    
    console.log('❌ Master Abstract section not found');
    return false;
}

// Method 2: URL-based fix that runs automatically
(function() {
    function checkAndScroll() {
        if (window.location.hash === '#masterabstract') {
            fixAnchorLink();
        }
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(checkAndScroll, 1000);
        });
    } else {
        setTimeout(checkAndScroll, 1000);
    }
    
    // Run on hash change
    window.addEventListener('hashchange', function() {
        setTimeout(checkAndScroll, 100);
    });
})();

// Method 3: Create working anchor link programmatically
function createWorkingAnchor() {
    // Find Master Abstract text
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (let heading of headings) {
        if (heading.textContent.includes('Master Abstract')) {
            const section = heading.closest('section, div, header') || heading.parentElement;
            if (section && !section.id) {
                section.id = 'masterabstract';
                section.style.scrollMarginTop = '80px';
                console.log('✅ Created masterabstract ID on:', section.tagName);
                return true;
            }
        }
    }
    return false;
}

// Run the fixes
console.log('🔧 Running anchor fixes...');
createWorkingAnchor();
if (window.location.hash === '#masterabstract') {
    setTimeout(fixAnchorLink, 500);
}

console.log('🎯 Anchor fix ready! Test with: https://passioncolorjoy.com#masterabstract');

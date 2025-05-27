/**
 * Test script for logo fade effect
 * This script will help debug the logo fade functionality
 */
console.log('Test script loaded!');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Try to find the logo with various selectors
    const selectors = [
        '.site-logo img',
        'header img',
        'picture img[alt*="Amira"]',
        'picture img'
    ];
    
    selectors.forEach(selector => {
        const element = document.querySelector(selector);
        console.log(`Selector "${selector}": ${element ? 'FOUND' : 'NOT FOUND'}`);
        
        if (element) {
            console.log('Element details:', {
                tagName: element.tagName,
                src: element.src,
                alt: element.alt,
                classes: element.className,
                parentClasses: element.parentElement ? element.parentElement.className : 'no parent'
            });
        }
    });
    
    // Test applying the effect manually
    const testLogo = document.querySelector('picture img');
    if (testLogo) {
        console.log('Applying test effect to first picture img element');
        testLogo.style.transition = 'all 0.5s ease';
        testLogo.style.opacity = '0.7';
        
        // Restore after 2 seconds
        setTimeout(() => {
            testLogo.style.opacity = '1';
        }, 2000);
    }
});

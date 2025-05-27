/**
 * Simple and Reliable Loading Animation
 * Shows loading screen immediately, completes after 2 seconds
 */

// Complete loading function
function completeLoading() {
  console.log('🎨 Completing loading animation');
  
  const overlay = document.getElementById('instant-loading-overlay');
  if (overlay) {
    // Fade out
    overlay.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(1.02)';
    
    // Remove after animation
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      console.log('✅ Loading complete - site visible');
    }, 600);
  }
  
  // Always restore scroll as backup
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

// Wait for DOM, then complete loading after 2 seconds
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 DOM loaded, starting 2-second loading timer');
    setTimeout(completeLoading, 2000);
  });
} else {
  // DOM already loaded
  console.log('🎨 DOM already ready, starting 2-second loading timer');
  setTimeout(completeLoading, 2000);
}

// Safety fallbacks
setTimeout(() => {
  console.log('🔧 Safety fallback at 4 seconds');
  completeLoading();
}, 4000);

setTimeout(() => {
  console.log('🚨 Emergency fallback at 6 seconds');
  const overlay = document.getElementById('instant-loading-overlay');
  if (overlay) overlay.remove();
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}, 6000);

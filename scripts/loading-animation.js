/**
 * Ultra-Simple Loading Animation - Guaranteed Scroll Fix
 * No complex logic, just show loading briefly then restore scroll
 */

console.log('🎨 Loading animation starting...');

// Force restore scroll function
function forceRestoreScroll() {
  console.log('🔧 Force restoring scroll...');
  
  // Remove loading overlay
  const overlay = document.getElementById('instant-loading-overlay');
  if (overlay) {
    overlay.style.display = 'none';
    overlay.remove();
  }
  
  // AGGRESSIVELY restore scroll
  document.body.style.overflow = '';
  document.body.style.overflowY = '';
  document.body.style.height = '';
  document.documentElement.style.overflow = '';
  document.documentElement.style.overflowY = '';
  document.documentElement.style.height = '';
  
  // Remove any problematic classes
  document.body.classList.remove('loading-active');
  document.body.classList.add('site-loaded');
  
  // Force reflow
  document.body.offsetHeight;
  
  console.log('✅ Scroll forcefully restored');
}

// Simple timer - complete loading after 1.5 seconds
setTimeout(() => {
  console.log('🎨 Completing loading after 1.5 seconds');
  forceRestoreScroll();
}, 1500);

// Safety fallback at 3 seconds
setTimeout(() => {
  console.log('🔧 Safety fallback at 3 seconds');
  forceRestoreScroll();
}, 3000);

// Emergency fallback at 5 seconds
setTimeout(() => {
  console.log('🚨 Emergency fallback at 5 seconds');
  forceRestoreScroll();
}, 5000);

// Ultimate fallback - always restore scroll
setTimeout(() => {
  console.log('💥 Ultimate fallback - forcing scroll no matter what');
  const overlay = document.getElementById('instant-loading-overlay');
  if (overlay) overlay.remove();
  
  // Nuclear option - remove ALL overflow restrictions
  document.body.removeAttribute('style');
  document.documentElement.removeAttribute('style');
  document.body.style.overflow = 'visible';
  document.body.style.overflowY = 'auto';
  
  console.log('🎯 Nuclear scroll restoration complete');
}, 7000);

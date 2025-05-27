/**
 * Premium Loading Animation - Instant Display with Background Loading
 * Shows immediately while site loads in background
 */

// PHASE 1: Instant loading screen (already visible via inline HTML/CSS)
// PHASE 2: Enhanced loading with full animations
// PHASE 3: Smooth transition to site content

document.addEventListener('DOMContentLoaded', function() {
  console.log('🎨 Initializing Enhanced Loading Experience');
  
  // Get the instant loading overlay
  const instantOverlay = document.getElementById('instant-loading-overlay');
  
  if (!instantOverlay) {
    console.error('Instant loading overlay not found');
    return;
  }
  
  // Wait a moment for initial paint, then enhance with full animation
  setTimeout(() => {
    enhanceLoadingAnimation();
  }, 500);
  
  function enhanceLoadingAnimation() {
    // Create enhanced loading content
    const enhancedContent = `
      <!-- Artistic Background Canvas -->
      <div class="loading-canvas">
        <!-- Flowing Paint Streams -->
        <div class="paint-stream paint-stream-1"></div>
        <div class="paint-stream paint-stream-2"></div>
        <div class="paint-stream paint-stream-3"></div>
        <div class="paint-stream paint-stream-4"></div>
        
        <!-- Color Bloom Effects -->
        <div class="color-bloom bloom-1"></div>
        <div class="color-bloom bloom-2"></div>
        <div class="color-bloom bloom-3"></div>
        
        <!-- Floating Paint Particles -->
        <div class="paint-particle particle-1"></div>
        <div class="paint-particle particle-2"></div>
        <div class="paint-particle particle-3"></div>
        <div class="paint-particle particle-4"></div>
        <div class="paint-particle particle-5"></div>
        <div class="paint-particle particle-6"></div>
      </div>
      
      <!-- Enhanced Loading Content -->
      <div class="loading-content">
        <!-- Logo Container -->
        <div class="loading-logo">
          <img src="images/AR_FineArt_Primary_Logo_2_3.webp" alt="Amira Rahim Fine Art" class="logo-image">
        </div>
        
        <!-- Loading Text -->
        <div class="loading-text">
          <h1 class="loading-brand">Amira Rahim</h1>
          <h3 class="loading-subtitle">Fine Art</h3>
        </div>
        
        <!-- Artistic Progress Indicator -->
        <div class="paint-brush-loader">
          <div class="brush-handle"></div>
          <div class="brush-ferrule"></div>
          <div class="brush-bristles">
            <div class="bristle bristle-1"></div>
            <div class="bristle bristle-2"></div>
            <div class="bristle bristle-3"></div>
            <div class="bristle bristle-4"></div>
            <div class="bristle bristle-5"></div>
          </div>
          <div class="paint-drop"></div>
        </div>
        
        <!-- Color Flow Progress Bar -->
        <div class="color-flow-progress">
          <div class="flow-track">
            <div class="flow-fill"></div>
            <div class="flow-shimmer"></div>
          </div>
          <div class="progress-text">Loading your artistic journey...</div>
        </div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="loading-decorations">
        <div class="palette-circle palette-1"></div>
        <div class="palette-circle palette-2"></div>
        <div class="palette-circle palette-3"></div>
        <div class="palette-circle palette-4"></div>
      </div>
    `;
    
    // Transform instant overlay to enhanced overlay
    instantOverlay.id = 'premium-loading-overlay';
    instantOverlay.className = 'premium-loading-container';
    instantOverlay.innerHTML = enhancedContent;
    
    // Start progress simulation
    simulateProgress();
  }
  
  function simulateProgress() {
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 25 + 15; // Fast progress
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        
        // Complete loading
        setTimeout(() => {
          completeLoading();
        }, 300);
      }
      
      // Update progress bar
      const flowFill = document.querySelector('.flow-fill');
      if (flowFill) {
        flowFill.style.width = progress + '%';
      }
    }, 150);
  }
  
  function completeLoading() {
    console.log('🎨 Loading complete - revealing site');
    const overlay = document.getElementById('premium-loading-overlay');
    
    if (overlay) {
      // Add completion animation
      overlay.classList.add('loading-complete');
      
      // Restore body scroll and remove overlay
      setTimeout(() => {
        document.body.style.overflow = '';
        overlay.remove();
        document.body.classList.add('site-loaded');
        
        // Trigger any other initialization
        initializeSite();
      }, 1200);
    }
  }
  
  function initializeSite() {
    // Site is now fully loaded and visible
    console.log('🎨 Site initialization complete');
    
    // Initialize other components if needed
    // Video player, logo fade, etc. should work normally now
  }
  
  // Fallback safety - ensure loading never hangs
  setTimeout(() => {
    const overlay = document.getElementById('premium-loading-overlay') || 
                   document.getElementById('instant-loading-overlay');
    if (overlay) {
      console.log('🎨 Fallback loading completion');
      completeLoading();
    }
  }, 4000);
  
  // Handle page visibility changes
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // Page hidden - pause animations if needed
    } else {
      // Page visible - resume if needed
    }
  });
});

// Immediate execution for fastest possible display
(function() {
  // Ensure body overflow is hidden from the start
  document.documentElement.style.overflow = 'hidden';
  
  // Add early class for styling
  if (document.body) {
    document.body.classList.add('loading-active');
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('loading-active');
    });
  }
})();

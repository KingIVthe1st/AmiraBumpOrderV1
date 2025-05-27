/**
 * Premium Loading Animation - Color Bridges™ Paint Flow
 * Matches the sophisticated artistic aesthetic of AmiraBumpOrderV1
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎨 Initializing Premium Loading Animation');
  
  // Create the loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'premium-loading-overlay';
  loadingOverlay.innerHTML = `
    <!-- Main Loading Container -->
    <div class="premium-loading-container">
      
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
      
      <!-- Central Loading Content -->
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
    </div>
  `;
  
  // Add to page
  document.body.appendChild(loadingOverlay);
  
  // Simulate loading progress (much faster - 75% reduction)
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 25 + 15; // 15-40% increments (much faster)
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      
      // Complete loading after a brief pause
      setTimeout(() => {
        completeLoading();
      }, 300); // Much shorter pause
    }
    
    // Update progress
    const flowFill = document.querySelector('.flow-fill');
    if (flowFill) {
      flowFill.style.width = progress + '%';
    }
  }, 150); // Much faster intervals
  
  // Function to complete loading and hide overlay
  function completeLoading() {
    console.log('🎨 Loading complete - revealing site');
    loadingOverlay.classList.add('loading-complete');
    
    setTimeout(() => {
      loadingOverlay.remove();
      document.body.classList.add('site-loaded');
    }, 1200);
  }
  
  // Fallback - ensure loading doesn't hang (reduced time)
  setTimeout(() => {
    if (document.getElementById('premium-loading-overlay')) {
      console.log('🎨 Fallback loading completion');
      completeLoading();
    }
  }, 4000); // 4 seconds max (75% reduction)
});

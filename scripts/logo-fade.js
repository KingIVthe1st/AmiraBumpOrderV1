/**
 * Premium Logo Fade Effect - Bottom-Up Artistic Dissolve
 * Creates a sophisticated fade that starts from the bottom immediately on scroll
 * Matches the premium artistic aesthetic of the AmiraBumpOrderV1 design
 */
document.addEventListener('DOMContentLoaded', function() {
  const logo = document.getElementById('site-logo');
  
  if (!logo) {
    console.error('Logo element with ID "site-logo" not found');
    return;
  }
  
  // Create a mask container for the bottom-up fade effect
  const logoContainer = logo.parentElement;
  logoContainer.style.position = 'relative';
  logoContainer.style.overflow = 'hidden';
  
  // Set initial styles for premium smooth transition
  logo.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'; // Premium easing curve
  logo.style.willChange = 'opacity, transform, filter';
  logo.style.transformOrigin = 'center bottom'; // Transform from bottom
  
  // Create a gradient mask overlay for bottom-up fade
  const fadeOverlay = document.createElement('div');
  fadeOverlay.style.position = 'absolute';
  fadeOverlay.style.top = '0';
  fadeOverlay.style.left = '0';
  fadeOverlay.style.width = '100%';
  fadeOverlay.style.height = '100%';
  fadeOverlay.style.pointerEvents = 'none';
  fadeOverlay.style.opacity = '0';
  fadeOverlay.style.background = 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)';
  fadeOverlay.style.transition = 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
  fadeOverlay.style.zIndex = '10';
  fadeOverlay.style.borderRadius = 'inherit';
  
  logoContainer.appendChild(fadeOverlay);
  
  // Configuration for the artistic fade effect
  const config = {
    startFadeAt: 0,           // Start immediately on scroll
    fullEffectAt: 200,        // Complete effect after 200px of scrolling
    minOpacity: 0.15,         // Nearly invisible at full scroll (15%)
    scaleReduction: 0.08,     // Subtle scale reduction (92% of original)
    blurIntensity: 1.5,       // Gentle blur for artistic effect
    yTranslation: -8          // Slight upward movement for elegance
  };
  
  // Premium scroll handler with bottom-up artistic fade
  function handlePremiumScroll() {
    const scrollPosition = window.scrollY;
    
    // Calculate fade progression (0 to 1)
    let fadeProgress = 0;
    if (scrollPosition > config.startFadeAt) {
      fadeProgress = Math.min(1, (scrollPosition - config.startFadeAt) / (config.fullEffectAt - config.startFadeAt));
    }
    
    // Smooth easing function for more natural fade
    const easedProgress = fadeProgress * fadeProgress * (3 - 2 * fadeProgress); // Smoothstep function
    
    // Calculate artistic transformation values
    const opacity = 1 - (easedProgress * (1 - config.minOpacity));
    const scale = 1 - (easedProgress * config.scaleReduction);
    const yOffset = easedProgress * config.yTranslation;
    const blurAmount = easedProgress * config.blurIntensity;
    
    // Apply premium transformations
    logo.style.opacity = opacity.toString();
    logo.style.transform = `scale(${scale}) translateY(${yOffset}px)`;
    logo.style.filter = blurAmount > 0 ? `blur(${blurAmount}px)` : 'none';
    
    // Control the gradient overlay for bottom-up effect
    fadeOverlay.style.opacity = (easedProgress * 0.7).toString(); // Max 70% overlay opacity
    
    // Add subtle color desaturation at higher scroll values
    if (easedProgress > 0.6) {
      const desaturation = (easedProgress - 0.6) * 2.5; // 0 to 1 range for the final 40% of scroll
      logo.style.filter = `blur(${blurAmount}px) saturate(${1 - (desaturation * 0.3)})`;
    }
    
    // Optional: Add artistic rotation for premium feel
    const rotation = easedProgress * 1.5; // Subtle 1.5 degree rotation
    logo.style.transform = `scale(${scale}) translateY(${yOffset}px) rotate(${rotation}deg)`;
  }
  
  // Optimized scroll listener with throttling for smooth performance
  let ticking = false;
  function requestScrollUpdate() {
    if (!ticking) {
      requestAnimationFrame(handlePremiumScroll);
      ticking = true;
      setTimeout(() => { ticking = false; }, 16); // ~60fps throttling
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  
  // Initialize with current scroll position
  handlePremiumScroll();
  
  // Add premium effect class to body
  document.body.classList.add('premium-logo-fade-active');
  
  // Add CSS for additional premium styling
  const premiumStyles = document.createElement('style');
  premiumStyles.textContent = `
    .premium-logo-fade-active .site-logo {
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.1));
    }
    
    .premium-logo-fade-active .site-logo:hover {
      transform: scale(1.02) !important;
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1) !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
      .premium-logo-fade-active .site-logo {
        transition: opacity 0.8s ease-out !important;
        transform: none !important;
        filter: none !important;
      }
    }
  `;
  document.head.appendChild(premiumStyles);
  
  console.log('🎨 Premium bottom-up logo fade effect initialized with artistic sophistication');
});

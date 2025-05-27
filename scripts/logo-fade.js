/**
 * Logo Fade Effect
 * Makes the logo subtly fade away upon scroll
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get the logo element by ID
  const logo = document.getElementById('site-logo');
  
  if (!logo) {
    console.error('Logo element with ID "site-logo" not found');
    return;
  }
  
  // Set initial styles
  logo.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
  logo.style.opacity = '1';
  logo.style.transform = 'scale(1)';
  
  // Scroll handler function
  function handleScroll() {
    const scrollPosition = window.scrollY;
    const fadeStart = 100; // Start fading at this scroll position
    const fadeEnd = 300;   // Fully faded at this scroll position
    
    if (scrollPosition <= fadeStart) {
      // Fully visible
      logo.style.opacity = '1';
      logo.style.transform = 'scale(1)';
    } else if (scrollPosition >= fadeEnd) {
      // Partially faded (to 60% opacity and 90% size)
      logo.style.opacity = '0.6';
      logo.style.transform = 'scale(0.9)';
    } else {
      // Partial fade based on scroll position
      const fadePercent = (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
      const opacity = 1 - (fadePercent * 0.4); // Only fade to 0.6 opacity
      const scale = 1 - (fadePercent * 0.1);   // Only scale down to 0.9
      
      logo.style.opacity = opacity.toString();
      logo.style.transform = `scale(${scale})`;
    }
  }
  
  // Add scroll event listener with passive option for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial call to set correct state
  handleScroll();
  
  console.log('Logo fade effect initialized');
});

/**
 * YouTube Video Fix
 * Ensures YouTube videos stay visible and prevent other scripts from removing them
 */

(function() {
  'use strict';
  
  console.log('🎬 YouTube video fix initializing...');
  
  // Configuration
  const config = {
    youtubeContainerId: 'youtube-video-container',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/qGVPoRua7dI',
    checkInterval: 1000,  // Check every second
    maxChecks: 10,        // Check for 10 seconds
    debug: true
  };
  
  // Debug helper
  function debug(...args) {
    if (config.debug) {
      console.log('[YouTubeFix]', ...args);
    }
  }
  
  // Function to check and restore the YouTube video if it's missing
  function checkAndRestoreYouTubeVideo() {
    const container = document.getElementById(config.youtubeContainerId);
    
    if (!container) {
      debug('YouTube container not found in the DOM');
      return false;
    }
    
    // Check if the iframe exists in the container
    let iframe = container.querySelector('iframe');
    
    // If iframe is missing or empty, restore it
    if (!iframe || !iframe.src || iframe.style.display === 'none') {
      debug('YouTube iframe is missing or hidden, restoring it');
      
      // Remove any existing iframe that might be hidden
      if (iframe) {
        container.removeChild(iframe);
      }
      
      // Create a new iframe with the correct YouTube embed
      iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.src = config.youtubeEmbedUrl;
      iframe.title = 'Real Raw Abstracts - 3 Part Video Training by Amira Rahim';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.setAttribute('loading', 'lazy');
      iframe.className = 'w-full h-full';
      
      // Add the iframe back to the container
      container.appendChild(iframe);
      
      debug('YouTube iframe restored successfully');
      return true;
    }
    
    debug('YouTube iframe is present and visible');
    return true;
  }
  
  // Initialize periodic checking
  function init() {
    let checksRemaining = config.maxChecks;
    
    // Initial check
    checkAndRestoreYouTubeVideo();
    
    // Set up periodic checking
    const checkInterval = setInterval(() => {
      checkAndRestoreYouTubeVideo();
      
      checksRemaining--;
      if (checksRemaining <= 0) {
        clearInterval(checkInterval);
        debug('Periodic checking completed');
      }
    }, config.checkInterval);
    
    // Also check when the window loads and on visibility change
    window.addEventListener('load', checkAndRestoreYouTubeVideo);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        checkAndRestoreYouTubeVideo();
      }
    });
    
    debug('YouTube video fix initialized');
  }
  
  // Run the script
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

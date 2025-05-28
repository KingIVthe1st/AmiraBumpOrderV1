/**
 * Video Player Diagnostics and Reliability Enhancement
 * Helps identify and resolve video loading issues
 */

(function() {
    console.log('🎬 Video diagnostics starting...');
    
    // Check if video container exists
    function checkVideoContainer() {
        const container = document.getElementById('vimeo-player');
        if (!container) {
            console.error('❌ Video container #vimeo-player not found');
            return false;
        }
        console.log('✅ Video container found');
        return container;
    }
    
    // Check if iframe is loaded
    function checkVideoIframe(container) {
        const iframe = container.querySelector('iframe');
        if (!iframe) {
            console.error('❌ Vimeo iframe not found in container');
            return false;
        }
        console.log('✅ Vimeo iframe found:', iframe.src);
        return iframe;
    }
    
    // Monitor video loading
    function monitorVideoLoading(iframe) {
        iframe.addEventListener('load', function() {
            console.log('✅ Vimeo iframe loaded successfully');
        });
        
        iframe.addEventListener('error', function() {
            console.error('❌ Vimeo iframe failed to load');
        });
    }
    
    // Add video interaction helpers
    function addVideoHelpers(container) {
        // Add a play button overlay for browsers that block autoplay
        const playButton = document.createElement('button');
        playButton.innerHTML = '▶️ Click to Play Video';
        playButton.style = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8);
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 50px;
            font-size: 16px;
            cursor: pointer;
            z-index: 1000;
            display: none;
        `;
        
        // Show play button if video doesn't autoplay after 3 seconds
        setTimeout(() => {
            const iframe = container.querySelector('iframe');
            if (iframe) {
                // Check if video is playing by checking if it's muted and has autoplay
                if (iframe.src.includes('autoplay=1')) {
                    console.log('📹 Video should be autoplaying');
                } else {
                    playButton.style.display = 'block';
                    container.appendChild(playButton);
                }
            }
        }, 3000);
        
        playButton.addEventListener('click', function() {
            playButton.style.display = 'none';
            // Try to interact with iframe to trigger autoplay
            const iframe = container.querySelector('iframe');
            if (iframe) {
                iframe.contentWindow.postMessage('{"method":"play"}', '*');
            }
        });
    }
    
    // Main diagnostic function
    function runDiagnostics() {
        console.log('🔍 Running video diagnostics...');
        
        const container = checkVideoContainer();
        if (!container) return;
        
        const iframe = checkVideoIframe(container);
        if (!iframe) return;
        
        monitorVideoLoading(iframe);
        addVideoHelpers(container);
        
        console.log('✅ Video diagnostics complete');
        
        // Report final status
        setTimeout(() => {
            console.log('📊 Final Video Status:');
            console.log('- Container:', !!container);
            console.log('- Iframe:', !!iframe);
            console.log('- Iframe src:', iframe ? iframe.src : 'N/A');
            console.log('- Video ID:', iframe ? iframe.src.match(/video\/(\d+)/)?.[1] || 'Not found' : 'N/A');
        }, 1000);
    }
    
    // Run diagnostics when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runDiagnostics);
    } else {
        runDiagnostics();
    }
    
})();

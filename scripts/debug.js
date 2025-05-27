// Debug script to check for errors
console.log('Debug script loaded');
window.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  
  // Check if the page is rendering
  document.body.style.backgroundColor = '#f0f0f0';
  
  // Add a visible element to the page
  const debugElement = document.createElement('div');
  debugElement.style.position = 'fixed';
  debugElement.style.top = '10px';
  debugElement.style.right = '10px';
  debugElement.style.padding = '10px';
  debugElement.style.backgroundColor = 'red';
  debugElement.style.color = 'white';
  debugElement.style.zIndex = '9999';
  debugElement.textContent = 'Debug Mode';
  document.body.appendChild(debugElement);
});

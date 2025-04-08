// Script for clearing cache during development
document.addEventListener('DOMContentLoaded', function() {
  console.log('Cache clearing script loaded');
  
  // Function to clear all site caches
  function clearAllCaches() {
    // Clear localStorage
    localStorage.clear();
    console.log('LocalStorage cleared');
    
    // Clear sessionStorage
    sessionStorage.clear();
    console.log('SessionStorage cleared');
    
    // Clear service worker caches
    if ('caches' in window) {
      caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
          caches.delete(cacheName).then(function() {
            console.log('Cache deleted:', cacheName);
          });
        });
      });
    }
    
    // Unregister service workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (let registration of registrations) {
          registration.unregister();
          console.log('ServiceWorker unregistered');
        }
      });
    }
    
    alert('Cache cleared! Reloading the page...');
    
    // Reload the page after a small delay
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  }
  
  // Create a hidden button that can be activated with a keyboard shortcut (Alt+Shift+C)
  document.addEventListener('keydown', function(e) {
    if (e.altKey && e.shiftKey && e.code === 'KeyC') {
      console.log('Cache clear shortcut detected');
      clearAllCaches();
    }
  });
  
  // For mobile debugging, add a hidden button
  const clearCacheButton = document.createElement('button');
  clearCacheButton.style.position = 'fixed';
  clearCacheButton.style.top = '0';
  clearCacheButton.style.right = '0';
  clearCacheButton.style.zIndex = '10000';
  clearCacheButton.style.width = '20px';
  clearCacheButton.style.height = '20px';
  clearCacheButton.style.padding = '0';
  clearCacheButton.style.margin = '0';
  clearCacheButton.style.fontSize = '0';
  clearCacheButton.style.opacity = '0.1';
  clearCacheButton.style.backgroundColor = 'transparent';
  clearCacheButton.style.border = 'none';
  clearCacheButton.style.cursor = 'pointer';
  clearCacheButton.textContent = 'Clear Cache';
  clearCacheButton.addEventListener('click', clearAllCaches);
  document.body.appendChild(clearCacheButton);
  
  console.log('Cache clearing tools initialized. Use Alt+Shift+C to clear cache.');
});

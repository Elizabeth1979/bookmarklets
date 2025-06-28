(function(){
  var removedCount = 0;
  
  // Remove focus indicator styles
  var focusStyle = document.getElementById('focus-indicator-bookmarklet');
  if (focusStyle) {
    focusStyle.remove();
    removedCount++;
  }
  
  // Remove heading highlight styles
  var headingStyle = document.getElementById('highlight-headings-bookmarklet');
  if (headingStyle) {
    headingStyle.remove();
    removedCount++;
  }
  
  // Remove heading overlay
  var headingOverlay = document.getElementById('headings-overlay-bookmarklet');
  if (headingOverlay) {
    headingOverlay.remove();
    removedCount++;
  }
  
  // Remove alt text styles
  var altTextStyle = document.getElementById('alt-text-bookmarklet');
  if (altTextStyle) {
    altTextStyle.remove();
    removedCount++;
  }
  
  // Remove alt text overlay
  var altTextOverlay = document.getElementById('alt-text-overlay-bookmarklet');
  if (altTextOverlay) {
    altTextOverlay.remove();
    removedCount++;
  }
  
  // Remove alt text badges and classes
  var badgedElements = document.querySelectorAll('.alt-missing, .alt-empty, .alt-present, .alt-svg');
  badgedElements.forEach(function(el) {
    el.classList.remove('alt-missing', 'alt-empty', 'alt-present', 'alt-svg');
    var badge = el.querySelector('.alt-text-badge');
    if (badge) {
      badge.remove();
      removedCount++;
    }
  });
  
  // Show notification
  var notification = document.createElement('div');
  notification.style.cssText = 'position:fixed;top:20px;right:20px;z-index:10000;background:#e74c3c;color:white;padding:12px 20px;border-radius:6px;font-family:sans-serif;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
  notification.textContent = removedCount > 0 ? '🔴 Bookmarklets deactivated!' : '⚠️ No active bookmarklets found';
  document.body.appendChild(notification);
  setTimeout(function(){notification.remove();}, 3000);
})();
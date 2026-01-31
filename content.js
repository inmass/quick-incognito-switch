// Early check: ensure we're in a valid extension context
if (typeof chrome === 'undefined' || !chrome.runtime) {
  console.warn('Chrome extension APIs not available');
  // Exit early if chrome APIs aren't available
}

// Track if backtick key is pressed
let backtickPressed = false;

// Ensure chrome.runtime is available
function isChromeRuntimeAvailable() {
  try {
    return typeof chrome !== 'undefined' && 
           chrome !== null &&
           chrome.runtime && 
           chrome.runtime !== null &&
           typeof chrome.runtime.sendMessage === 'function';
  } catch (e) {
    return false;
  }
}

// Listen for backtick key press - use multiple detection methods
document.addEventListener('keydown', (event) => {
  // Check for backtick key using multiple methods
  // event.key can be '`' or 'Backquote'
  // event.code is 'Backquote' 
  // event.keyCode is 192 (US layout)
  if (event.key === '`' || 
      event.key === 'Backquote' || 
      event.code === 'Backquote' ||
      event.keyCode === 192) {
    backtickPressed = true;
    // Prevent any default behavior
    event.preventDefault();
  }
}, true);

// Listen for backtick key release
document.addEventListener('keyup', (event) => {
  if (event.key === '`' || 
      event.key === 'Backquote' || 
      event.code === 'Backquote' ||
      event.keyCode === 192) {
    backtickPressed = false;
  }
}, true);

// Also track on window blur to reset state
window.addEventListener('blur', () => {
  backtickPressed = false;
});

// Detect click with backtick key
document.addEventListener('click', (event) => {
  // Find the closest link element
  const link = event.target.closest('a');
  
  // Check if link exists and has a valid href
  if (!link || !link.href || link.href.startsWith('javascript:')) {
    return;
  }
  
  // Check if backtick key is pressed
  if (backtickPressed) {
    // Stop normal browser behavior
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    // Check if chrome.runtime is available before sending message
    if (!isChromeRuntimeAvailable()) {
      backtickPressed = false;
      return;
    }
    
    try {
      // Send message to background script to open in opposite tab type
      chrome.runtime.sendMessage({ 
        action: 'openLinkInOppositeTab', 
        url: link.href 
      }, (response) => {
        // Reset backtick state after use
        backtickPressed = false;
      });
    } catch (error) {
      // If sendMessage fails, reset state
      console.error('Error sending message to background script:', error);
      backtickPressed = false;
    }
  }
}, true); // Use capture phase to intercept early

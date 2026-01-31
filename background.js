// Create context menu items on extension installation
chrome.runtime.onInstalled.addListener(() => {
  // Context menu for links
  chrome.contextMenus.create({
    id: "open-opposite-tab",
    title: "Open in opposite tab",
    contexts: ["link"]
  });
  
  // Context menu for selected text (search)
  chrome.contextMenus.create({
    id: "search-opposite-tab",
    title: "Search in opposite tab",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-opposite-tab" && info.linkUrl) {
    // Open link in opposite tab
    openInOppositeTab(info.linkUrl, tab);
  } else if (info.menuItemId === "search-opposite-tab" && info.selectionText) {
    // Search selected text in opposite tab
    const searchText = info.selectionText.trim();
    if (searchText) {
      // Create Google search URL (you can customize this to use default search engine)
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
      openInOppositeTab(searchUrl, tab);
    }
  }
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === "open-opposite-tab") {
    // Get the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url) {
        openInOppositeTab(tabs[0].url, tabs[0]);
      }
    });
  }
});

// Handle messages from content script (modifier key + Click)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openLinkInOppositeTab' && request.url) {
    // Get the current tab info
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        openInOppositeTab(request.url, tabs[0]);
      }
    });
    sendResponse({ success: true });
  }
  return true; // Keep the message channel open for async response
});

// Function to open URL in opposite tab type
function openInOppositeTab(url, currentTab) {
  // Check if current tab is incognito
  const isIncognito = currentTab.incognito;
  
  if (isIncognito) {
    // Current tab is incognito, open in normal tab
    // Find an existing normal window, or create a new one
    chrome.windows.getAll({}, (windows) => {
      const normalWindows = windows.filter(w => !w.incognito);
      if (normalWindows.length > 0) {
        // Add tab to existing normal window
        chrome.tabs.create({
          windowId: normalWindows[0].id,
          url: url
        });
      } else {
        // Create new normal window
        chrome.windows.create({
          url: url,
          incognito: false
        });
      }
    });
  } else {
    // Current tab is normal, open in incognito tab
    // Check if there's an existing incognito window
    chrome.windows.getAll({}, (windows) => {
      const incognitoWindows = windows.filter(w => w.incognito);
      if (incognitoWindows.length > 0) {
        // Add tab to existing incognito window
        chrome.tabs.create({
          windowId: incognitoWindows[0].id,
          url: url
        });
      } else {
        // Create new incognito window
        chrome.windows.create({
          url: url,
          incognito: true
        });
      }
    });
  }
}

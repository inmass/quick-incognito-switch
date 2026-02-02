// Check incognito access status and display appropriate message
async function checkAndDisplayStatus() {
  const statusMessage = document.getElementById('status-message');
  
  try {
    const isAllowed = await chrome.extension.isAllowedIncognitoAccess();
    
    if (!isAllowed) {
      // Show warning message
      statusMessage.innerHTML = `
        <div class="warning">
          <div class="warning-title">⚠️ Enable for Incognito Mode</div>
          <div class="warning-text">
            <p style="margin-bottom: 12px;">
              To use this extension in <strong>incognito (private) browsing windows</strong>, you need to enable it first.
            </p>
            <p style="margin-bottom: 8px;"><strong>Quick Steps:</strong></p>
            <ol style="text-align: left; padding-left: 20px; margin: 8px 0; font-size: 12px;">
              <li style="margin-bottom: 6px;">Click the button below</li>
              <li style="margin-bottom: 6px;">Find "Quick Incognito Switch"</li>
              <li style="margin-bottom: 6px;">Click <strong>"Details"</strong> on the extension</li>
              <li style="margin-bottom: 6px;">Turn on "Allow in incognito"</li>
            </ol>
            <p style="margin-top: 10px; padding: 8px; background-color: #e8f5e9; border-radius: 4px; font-size: 11px; color: #2e7d32;">
              <strong>🔒 Privacy:</strong> This extension does not record or track your browsing history.
            </p>
          </div>
        </div>
        <button class="button" id="open-extensions">Open Extensions Settings</button>
      `;
      
      // Add click handler for button
      document.getElementById('open-extensions').addEventListener('click', () => {
        chrome.tabs.create({ url: 'chrome://extensions' });
      });
    } else {
      // Show success message
      statusMessage.innerHTML = `
        <div class="message success">
          ✓ Ready to Use
        </div>
        <div class="message" style="text-align: left;">
          <strong>Quick Ways to Use:</strong><br><br>
          • Right-click any link and choose "Open in opposite tab"<br><br>
          • Hold the backtick key (\`) and click any link
        </div>
      `;
    }
  } catch (error) {
    console.error('Error checking incognito access:', error);
    statusMessage.innerHTML = `
      <div class="message">
        Error checking extension status. Please try again.
      </div>
    `;
  }
}

// Check status when popup opens
checkAndDisplayStatus();

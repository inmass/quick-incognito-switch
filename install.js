// Check incognito access status and display appropriate message
async function checkAndDisplayStatus() {
  const statusMessage = document.getElementById('status-message');
  
  try {
    const isAllowed = await chrome.extension.isAllowedIncognitoAccess();
    
    if (!isAllowed) {
      // Show warning message
      statusMessage.innerHTML = `
        <div class="warning">
          <div class="warning-title">⚠️ One More Step Required</div>
          <div class="warning-text">
            <p style="margin-bottom: 12px;">
              To use this extension in <strong>incognito (private) browsing windows</strong>, you need to enable it first. 
              This is a security feature that Chrome requires for all extensions.
            </p>
            <p style="margin-bottom: 8px;"><strong>Here's how to enable it:</strong></p>
            <ol style="text-align: left; padding-left: 20px; margin: 8px 0;">
              <li style="margin-bottom: 8px;">Click the button below to open your Extensions page</li>
              <li style="margin-bottom: 8px;">Find "Quick Incognito Switch" in the list</li>
              <li style="margin-bottom: 8px;">Click <strong>"Details"</strong> on the extension card</li>
              <li style="margin-bottom: 8px;">Turn on the switch next to <strong>"Allow in incognito"</strong></li>
              <li>That's it! The extension will now work in both regular and private browsing windows</li>
            </ol>
            <p style="margin-top: 12px; font-size: 12px; color: #666;">
              <strong>Note:</strong> If you only use regular browsing windows, you can skip this step. 
              The extension will still work in regular windows without this setting.
            </p>
            <p style="margin-top: 12px; padding: 10px; background-color: #e8f5e9; border-radius: 4px; font-size: 12px; color: #2e7d32;">
              <strong>🔒 Privacy Note:</strong> Don't worry - this extension does not record, track, or store your browsing history. 
              It only helps you switch between regular and incognito windows. Your privacy is protected.
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
        <div class="message success" style="font-size: 16px; margin-bottom: 24px;">
          ✓ All Set! Extension is Ready to Use
        </div>
        <h2>What This Extension Does</h2>
        <div class="message" style="text-align: left; margin-bottom: 20px;">
          This extension helps you quickly switch between <strong>regular browsing</strong> and <strong>incognito (private) browsing</strong>. 
          If you're on a regular page, it can open it in an incognito window, and vice versa.
        </div>
        <h2>How to Use It</h2>
        <div class="info-box">
          <div class="message">
            <strong>Method 1: Right-Click Menu</strong><br><br>
            Right-click on any link on a webpage, then select:<br>
            • <strong>"Open in opposite tab"</strong> - Opens the link in the opposite window type<br>
            • <strong>"Search in opposite tab"</strong> - If you've selected text, searches it in the opposite window type
          </div>
        </div>
        <div class="info-box">
          <div class="message">
            <strong>Method 2: Backtick Key + Click</strong><br><br>
            Hold down the <strong>backtick key</strong> (the \` key, usually above Tab) and click any link. 
            The link will open in the opposite window type.
          </div>
        </div>
        <div class="message" style="margin-top: 20px; font-size: 13px; color: #666; text-align: left;">
          <strong>Note:</strong> The extension icon will show a red exclamation mark (!) if incognito access is not enabled. 
          Once enabled, the mark will disappear.
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

// Check status when page loads
checkAndDisplayStatus();

# Opposite Tab Opener - Chrome Extension

A Chrome extension that allows you to open links in the opposite tab type (incognito if in normal, normal if in incognito).

## Features

- **Right-click context menu** - Most reliable method (right-click any link → "Open in opposite tab")
- **Keyboard shortcut** - `Ctrl+Shift+I` (Windows/Linux) or `Command+Shift+I` (Mac) to open current page in opposite tab type
- **Modifier key + Click** - Configurable modifier keys + click (default: Command+Option+Shift / Ctrl+Alt+Shift)
  - *Note: Chrome's native modifier behaviors may interfere. If modifier+click doesn't work, use the context menu or keyboard shortcut instead.*

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked"
4. Select the extension directory
5. **Important:** Click "Details" on the extension, then toggle **"Allow in incognito"** to enable the extension in incognito windows

## Icons

Icons have been generated and are located in the `icons/` directory. If you need to regenerate them, run:
```bash
node generate_icons.js
```

Alternatively, you can open `generate_icons.html` in your browser to generate icons using a visual interface.

## Usage

### Context Menu (Most Reliable)
1. Right-click on any link on a webpage
2. Select "Open in opposite tab" from the context menu
3. The link will open in a new tab with the opposite incognito setting

### Keyboard Shortcut
1. Navigate to any page
2. Press `Ctrl+Shift+I` (or `Command+Shift+I` on Mac)
3. The current page will open in a new tab with the opposite incognito setting

### Modifier Key + Click (May Have Limitations)
1. Hold down the configured modifier keys (default: **Command+Option+Shift** on Mac, **Ctrl+Alt+Shift** on Windows/Linux)
2. Click on any link
3. The link should open in a new tab with the opposite incognito setting

**Note:** Chrome's native modifier key behaviors (Command+Click, Ctrl+Click) may interfere with this method. If it doesn't work, use the **context menu** or **keyboard shortcut** instead - they are more reliable.

**Configure the shortcut:** Right-click the extension icon → Options, or go to `chrome://extensions` → find "Opposite Tab Opener" → click "Options"

#### Configuring the Keyboard Shortcut

**Option 1: Change in Chrome Settings (Recommended)**
1. Go to `chrome://extensions/shortcuts`
2. Find "Opposite Tab Opener" extension
3. Click on the shortcut field next to "Open current page in opposite tab type"
4. Press your desired key combination
5. The shortcut is saved automatically

**Option 2: Change in manifest.json**
Edit the `commands` section in `manifest.json`:
```json
"commands": {
  "open-opposite-tab": {
    "suggested_key": {
      "default": "Ctrl+Shift+Y",  // Change to your preferred shortcut
      "mac": "Command+Shift+Y"     // Change to your preferred shortcut
    },
    "description": "Open current page in opposite tab type"
  }
}
```
Then reload the extension in Chrome.

**Note:** Available modifier keys: `Ctrl` (or `Command` on Mac), `Alt`, `Shift`. You can combine them with any letter, number, or function key.

#### Configuring the Click Modifier Keys

1. Right-click the extension icon and select "Options", or
2. Go to `chrome://extensions` → find "Opposite Tab Opener" → click "Options"
3. Select which modifier keys you want to use (Command/Ctrl, Option/Alt, Shift)
4. Click "Save Settings"
5. The new shortcut will work immediately on all pages

**Default:** Command+Option (Mac) / Ctrl+Alt (Windows/Linux)

## How It Works

- If you're in a **normal tab**, clicking the context menu item or using the shortcut opens the link/page in a new **incognito tab**
- If you're in an **incognito tab**, clicking the context menu item or using the shortcut opens the link/page in a new **normal tab**

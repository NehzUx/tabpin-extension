// Listen for when a new window is created
chrome.windows.onCreated.addListener(async (window) => {
  // Get the pinned URLs from storage
  chrome.storage.sync.get(
    { pinnedUrls: "" },
    async (items) => {
      // Split the URLs by new line
      const urls = items.pinnedUrls.split('\n').filter(url => url.trim() !== '');
      
      // Create and pin each tab
      for (const url of urls) {
        if (url.trim()) {
          await chrome.tabs.create({
            url: url.trim(),
            windowId: window.id,
            active: false, // Don't make it the active tab
            pinned: true   // Pin the tab immediately during creation
          });
        }
      }
    }
  );
});
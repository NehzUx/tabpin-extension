// Listen for when a new window is created
chrome.windows.onCreated.addListener(async (window) => {
  // Get existing tabs in the window first
  const existingTabs = await chrome.tabs.query({ windowId: window.id });
  
  // Get the pinned URLs from storage
  chrome.storage.sync.get(
    { pinnedUrls: "" },
    async (items) => {
      const urls = items.pinnedUrls.split('\n').filter(url => url.trim() !== '');
      
      // Check which URLs are already open in this window
      const existingUrls = existingTabs.map(tab => tab.url);
      
      // Create and pin only tabs that don't already exist
      for (const url of urls) {
        if (url.trim() && !existingUrls.includes(url.trim())) {
          await chrome.tabs.create({
            url: url.trim(),
            windowId: window.id,
            active: false,
            pinned: true
          });
        }
      }
    }
  );
});
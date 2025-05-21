// Save options to chrome.storage
function saveOptions() {
  const urls = document.getElementById('urls').value;
  
  chrome.storage.sync.set(
    { pinnedUrls: urls },
    () => {
      // Update status to let user know options were saved
      const status = document.getElementById('status');
      status.style.display = 'inline';
      setTimeout(() => {
        status.style.display = 'none';
      }, 1500);
    }
  );
}

// Restore options from chrome.storage
function restoreOptions() {
  chrome.storage.sync.get(
    { pinnedUrls: "" },
    (items) => {
      document.getElementById('urls').value = items.pinnedUrls;
    }
  );
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions); 
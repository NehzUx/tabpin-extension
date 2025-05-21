document.addEventListener('DOMContentLoaded', function() {
  // Get the options button
  const optionsButton = document.getElementById('options');
  
  // Add click event listener
  optionsButton.addEventListener('click', function() {
    // Open the options page
    chrome.runtime.openOptionsPage();
  });
}); 
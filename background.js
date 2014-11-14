chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function() {
    chrome.tabs.executeScript(null, {file: "content.js"}); 
  });
});

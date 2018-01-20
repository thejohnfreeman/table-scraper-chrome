chrome.browserAction.onClicked.addListener((tab) => {
  // Called whenever the extension icon is clicked.
  chrome.tabs.sendMessage(tab.id, {})
})

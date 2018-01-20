var console = chrome.extension.getBackgroundPage().console

chrome.browserAction.onClicked.addListener(function (tab) {
  console.log('Hello, world!')
})

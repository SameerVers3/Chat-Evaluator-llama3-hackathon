console.log("Hello from background script");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message', message);
  sendResponse('Hello from background');
});

console.log("Here it is")
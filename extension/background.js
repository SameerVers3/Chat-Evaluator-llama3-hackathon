chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "loadScript") {
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        files: [`content/${message.scriptName}.js`],
      },
      () => {
        console.log(`Injected script: ${message.scriptName}.js`);
      }
    );
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "displayScore") {
    chrome.runtime.sendMessage(message);
  }
});

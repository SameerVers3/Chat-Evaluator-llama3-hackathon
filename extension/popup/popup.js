document.getElementById("evaluateBtn").addEventListener("click", () => {
  console.log("Evaluate button clicked.");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: extractAndSendChats,
      },
      () => {
        document.getElementById("status").innerText = "Chat evaluation triggered.";
      }
    );
  });
});

function extractAndSendChats() {
  console.log("extractAndSendChats function executed");

  if (window.location.hostname.includes("web.whatsapp.com")) {
    chrome.runtime.sendMessage({ action: "loadScript", scriptName: "whatsapp" });
  } else if (window.location.hostname.includes("linkedin.com")) {
    chrome.runtime.sendMessage({ action: "loadScript", scriptName: "linkedin" });
  } else if (window.location.hostname.includes("instagram.com")) {
    chrome.runtime.sendMessage({ action: "loadScript", scriptName: "instagram" });
  } else if (window.location.hostname.includes("discord.com")) {
    chrome.runtime.sendMessage({ action: "loadScript", scriptName: "discord" });
  } else if (window.location.hostname.includes("slack.com")) {
    chrome.runtime.sendMessage({ action: "loadScript", scriptName: "slack" });
  }
}

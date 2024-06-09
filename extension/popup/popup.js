document.getElementById("evaluateBtn").addEventListener("click", () => {
  console.log("Evaluate button clicked.");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: extractAndSendChats,
      },
      () => {
        document.getElementById("status").innerText =
          "Chat evaluation triggered.";
      }
    );
  });
});

function extractAndSendChats() {
  console.log("extractAndSendChats function executed");
  console.log("---------------------");

  if (window.extractWhatsAppChats) {
    console.log("WhatsApp script already loaded");

    runWhatsappScript();
  } else if (window.linkedinScriptLoaded) {
    console.log("LinkedIn script already loaded");
    extractLinkedInChats();
  } else if (window.instagramScriptLoaded) {
    console.log("Instagram script already loaded");
    extractInstagramChats();
  } else if (window.discordScriptLoaded) {
    console.log("Discord script already loaded");
    extractDiscordChats();
  } else if (window.slackScriptLoaded) {
    console.log("Slack script already loaded");
    extractSlackChats();
  } else {
    if (window.location.hostname.includes("web.whatsapp.com")) {
      chrome.runtime.sendMessage({
        action: "loadScript",
        scriptName: "whatsapp",
      });
    } else if (window.location.hostname.includes("linkedin.com")) {
      chrome.runtime.sendMessage({
        action: "loadScript",
        scriptName: "linkedin",
      });
    } else if (window.location.hostname.includes("instagram.com")) {
      chrome.runtime.sendMessage({
        action: "loadScript",
        scriptName: "instagram",
      });
    } else if (window.location.hostname.includes("discord.com")) {
      chrome.runtime.sendMessage({
        action: "loadScript",
        scriptName: "discord",
      });
    } else if (window.location.hostname.includes("slack.com")) {
      chrome.runtime.sendMessage({ action: "loadScript", scriptName: "slack" });
    }
  }
}

function renderScore(score) {
  const scoreElement = document.getElementById("score");
  scoreElement.innerText = `Chat Score: ${score}/10`;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "displayScore") {
    renderScore(message.score);
  }
});

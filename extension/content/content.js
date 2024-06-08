function loadScript(scriptName) {
  let script = document.createElement('script');
  script.src = chrome.runtime.getURL(`content/${scriptName}.js`);
  script.onload = () => script.remove(); // Remove the script element after loading
  (document.head || document.documentElement).appendChild(script);
}
  

function extractAndSendChats() {
  console.log("extractAndSendChats");
  console.log(window.location.hostname);
  if (window.location.hostname.includes("web.whatsapp.com")) {
    console.log("we are in whatsapp");
    loadScript('whatsapp');
  } else if (window.location.hostname.includes("linkedin.com")) {
    console.log("we are in Linkedin");
    loadScript('linkedin');
  } else if (window.location.hostname.includes("instagram.com")) {
    console.log("we are in Instagram");
    loadScript('instagram');
  } else if (window.location.hostname.includes("discord.com")) {
    console.log("we are in Discord");
    loadScript('discord');
  } else if (window.location.hostname.includes("slack.com")) {
    console.log("we are in Slack");
    loadScript('slack');
  }
}

// Execute immediately to ensure the correct script is loaded
extractAndSendChats();

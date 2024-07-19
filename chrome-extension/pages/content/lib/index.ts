import {runWhatsappScript,runLinkedInScript} from "./whatsapp";

console.log("hello frion content/lib/index.ts");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'callit') {
    fun();
  };
});

console.log(window.location.href);

if (window.location.href === "linkedin.com") {
  console.log('linkedin page');
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'callit') {
      console.log("runnig the func tion");
      runLinkedInScript();
      console.log("called it");
    };
  })

}


else if  (window.location.href === "https://web.whatsapp.com/") {
  console.log('whatsapp page');
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'callit') {
      console.log("runnig the func tion");
      runWhatsappScript();
      console.log("called it");
    };
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'add_event_delegator') {
      console.log("runnig the func tion");
      runWhatsappScript();
      console.log("called it");
    };
  });
}
const fun = () => {
  console.log('function called');
}
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



//Check if message count Increases or not If message increases it run the script


let isActive = false;
let lastMessageCount = 0;

function checkNewMessages () {

  let isWhatsapp = window.location.href.includes('web.whatsapp.com');
  let isLinkedin = window.location.href.includes('linkedin.com/messaging');

  if(!isWhatsapp && !isLinkedin){
    console.log('Website Not Valid')
    return 
  }

  let messageElements;
  if (isWhatsapp) {
    messageElements = document.querySelectorAll(".message-in, .message-out");
    //
}else if(isLinkedin){
    messageElements = document.querySelectorAll('.msg-s-message-list__event');
}

if(messageElements && messageElements.length > lastMessageCount){


  if(isWhatsapp){
    runWhatsappScript()
  }

  if(isLinkedin){
    runLinkedInScript()
  }

  lastMessageCount = messageElements.length;


}

}


function startMonitoring(){ setInterval(checkNewMessages,2000);}


//Run only First time when Extension is opened

chrome.storage.sync.get('isExtensionActive', function(data) {
  const isActive = data.isExtensionActive;
  if (isActive) {
    startMonitoring();
  }
});
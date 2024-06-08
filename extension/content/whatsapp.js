function extractWhatsAppChats() {
  console.log("extractWhatsAppChats executed");

  let chats = document.querySelectorAll(".message-in, .message-out");
  let chatHistory = [];
  chats.forEach((chat) => {
    let message = chat.querySelector("span.selectable-text");
    if (message) {
      chatHistory.push(message.innerText);
    }
  });
  return chatHistory;
}

function sendChatHistoryToBackend(history) {
  console.log("sendChatHistoryToBackend executed", history);

  // will send data to backend from here
  
}

console.log("WhatsApp script injected");
let chatHistoryExtracted = extractWhatsAppChats();
sendChatHistoryToBackend(chatHistoryExtracted);

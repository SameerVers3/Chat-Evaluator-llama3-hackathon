function extractLinkedInChats() {
    let chats = document.querySelectorAll(".msg-s-message-list-content .msg-s-event-listitem__body");
    let chatHistory = [];
    chats.forEach(chat => {
      let message = chat.querySelector(".msg-s-event-listitem__message-bubble span");
      if (message) {
        chatHistory.push(message.innerText);
      }
    });
    return chatHistory;
  }
  
  function sendChatHistoryToBackend(chatHistory) {
    fetch('https://your-backend-url.com/api/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ chatHistory })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Response from backend:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }
  
  let chatHistory = extractLinkedInChats();
  sendChatHistoryToBackend(chatHistory);
  
function extractSlackChats() {
    let chats = document.querySelectorAll(".c-message__content");
    let chatHistory = [];
    chats.forEach(chat => {
      let message = chat.querySelector(".c-message__body");
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
  
  let chatHistory = extractSlackChats();
  sendChatHistoryToBackend(chatHistory);
  
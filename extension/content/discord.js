function extractDiscordChats() {
    let chats = document.querySelectorAll(".messageContent-2t3eCI");
    let chatHistory = [];
    chats.forEach(chat => {
      chatHistory.push(chat.innerText);
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
  
  let chatHistory = extractDiscordChats();
  sendChatHistoryToBackend(chatHistory);
  
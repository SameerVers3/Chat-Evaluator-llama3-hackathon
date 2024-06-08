function extractInstagramChats() {
    let chats = document.querySelectorAll(".JI_ht");
    let chatHistory = [];
    chats.forEach(chat => {
      let message = chat.querySelector(".Mr508 ._7UhW9");
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
  
  let chatHistory = extractInstagramChats();
  sendChatHistoryToBackend(chatHistory);
  
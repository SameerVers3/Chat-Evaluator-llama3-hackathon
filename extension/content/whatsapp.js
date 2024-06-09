function formateMessage(message, lastSender) {
  let name = "";
  if (message.classList.contains("message-in")) {
    let nameElement = message.querySelector("span._ahx_");
    name = nameElement ? nameElement.innerText : "Unknown Phone Number";

    // If nameElement is not available, check the alternative div
    if (name === "Unknown Phone Number") {
      let altNameElement = message.querySelector("div._ahxj._ahxz span._ahxt");
      name = altNameElement ? altNameElement.innerText : lastSender;
    }
  } else {
    name = "ME";
  }

  let messageElement = message.querySelector(
    "span._ao3e.selectable-text.copyable-text span"
  );
  let messageText = messageElement
    ? messageElement.innerText
    : "Unknown Message";

  let timeElement = message.querySelector(
    "div.x1n2onr6.x1n327nk.x18mqm2i.xhsvlbd.x11i5rnm.xz62fqu.xsgj6o6 span.x1rg5ohu.x16dsc37"
  );
  let messageTime = timeElement ? timeElement.innerText : "Unknown Time";

  return {
    formattedMessage: `${name}: ${messageText} (${messageTime})`,
    message: {
      name,
      messageText,
      messageTime,
    },
    sender: name,
  };
}

function extractWhatsAppChats() {
  let chats = document.querySelectorAll(".message-in, .message-out");
  let chatHistory = [];
  let lastSender = "Unknown Phone Number";
  let chatString = "";

  chats.forEach((chat) => {
    let { formattedMessage, sender, message } = formateMessage(
      chat,
      lastSender
    );
    chatHistory.push(message);
    chatString += formattedMessage + "\n";

    if (
      chat.classList.contains("message-in") &&
      sender !== "Unknown Phone Number"
    ) {
      lastSender = sender;
    }
  });

  console.log(chatString);
  return {
    chatHistory,
    chatString,
  };
}

async function sendChatHistoryToBackend(history) {
  console.log("Initiating..");
  fetch("https://ashad001-llama3hackathon.hf.space/call/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: history,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Extract the EVENT_ID from the response
      console.log(data);
      const EVENT_ID = data.event_id;
      console.log(EVENT_ID);

      // Make a GET request to retrieve the output result
      fetch(
        `https://ashad001-llama3hackathon.hf.space/call/predict/${EVENT_ID}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text(); // Parse response as text
        })
        .then((data) => {
          console.log("Response body:", data);
          const responseData = data.split("\n");
          console.log(responseData);
          const score = responseData[1].match(/\d+/)[0];
          console.log("Score:", score);

          sendScoreToBackground(score);
        })
        .catch((error) => {
          console.error("Error fetching result:", error);
        });
    })
    .catch((error) => {
      console.error("Error making prediction:", error);
    });
}

function runWhatsappScript() {
  console.log("WhatsApp script injected");
  let chatHistoryExtracted = extractWhatsAppChats();
  sendChatHistoryToBackend(chatHistoryExtracted.chatHistory);
}

runWhatsappScript();

function sendScoreToBackground(score) {
  chrome.runtime.sendMessage({ action: "displayScore", score: score });
}

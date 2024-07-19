type MessageDetails = {
  name: string;
  messageText: string;
  messageTime: string;
};

type FormattedMessage = {
  formattedMessage: string;
  message: MessageDetails;
  sender: string;
};

type ChatHistory = {
  chatHistory: MessageDetails[];
  chatString: string;
};

function formatMessage(message: Element, lastSender: string): FormattedMessage {
  let name = "";
  if (message.classList.contains("message-in")) {
    const nameElement = message.querySelector("span._ahx_");
    name = nameElement ? (nameElement as HTMLElement).innerText : "Unknown Phone Number";

    // If nameElement is not available, check the alternative div
    if (name === "Unknown Phone Number") {
      const altNameElement = message.querySelector("div._ahxj._ahxz span._ahxt");
      name = altNameElement ? (altNameElement as HTMLElement).innerText : lastSender;
    }
  } else {
    name = "ME";
  }

  const messageElement = message.querySelector(
    "span._ao3e.selectable-text.copyable-text span"
  );
  const messageText = messageElement ? (messageElement as HTMLElement).innerText : "Unknown Message";

  const timeElement = message.querySelector(
    "div.x1n2onr6.x1n327nk.x18mqm2i.xhsvlbd.x11i5rnm.xz62fqu.xsgj6o6 span.x1rg5ohu.x16dsc37"
  ) as HTMLElement;
  const messageTime = timeElement ? timeElement.innerText : "Unknown Time";

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

function extractWhatsAppChats(): ChatHistory {
  const chats = document.querySelectorAll(".message-in, .message-out");
  const chatHistory: MessageDetails[] = [];
  let lastSender = "Unknown Phone Number";
  let chatString = "";

  chats.forEach((chat) => {
    const { formattedMessage, sender, message } = formatMessage(chat, lastSender);
    chatHistory.push(message);
    chatString += formattedMessage + "\n";

    if (chat.classList.contains("message-in") && sender !== "Unknown Phone Number") {
      lastSender = sender;
    }
  });

  console.log(chatString);
  return {
    chatHistory,
    chatString,
  };
}

function extractLinkedInMsg(node:any) {
  // Extract the context information
  const contextSpan = node.querySelector('.msg-s-event-listitem--group-a11y-heading');
  const context = contextSpan ? contextSpan.textContent.trim() : '';

  // Extract the message content
  const messageElement = node.querySelector('.msg-s-event-listitem__body');
  const message = messageElement ? messageElement.textContent.trim() : '';

  // Create the object with the extracted data
  const messageData = {
    context: context,
    message: message
  };

  return messageData;
}

function extractLinkedInChat(): any[] {
      let chat = document.querySelectorAll('.msg-s-message-list__event');
      let fullChat:any[] = [];
      if(chat.length > 0){

       chat.forEach((node:any) => {
            let data =  extractLinkedInMsg(node)
            fullChat.push(data);
        })
      }
      return fullChat;
}

async function sendChatHistoryToBackend(history: MessageDetails[]): Promise<void> {
  console.log("Initiating..");
  try {
    const response = await fetch("https://ashad001-llama3hackathon.hf.space/call/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: history }),
    });
    const data = await response.json();
    console.log(data);
    const EVENT_ID = data.event_id;
    console.log(EVENT_ID);

    const resultResponse = await fetch(`https://ashad001-llama3hackathon.hf.space/call/predict/${EVENT_ID}`);
    if (!resultResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const resultText = await resultResponse.text();
    console.log("Response body:", resultText);
    const responseData = resultText.split("\n");
    console.log(responseData);
    const scoreMatch = responseData[1].match(/\d+/);
    if (scoreMatch) {
      const score = scoreMatch[0];
      console.log("Score:", score);

      console.log("Score:", score);
    } else {
      console.error("No score found in the response");
    }
  } catch (error) {
    console.error("Error making prediction or fetching result:", error);
  }
}

export function runWhatsappScript(): void {
  console.log("WhatsApp script injected");
  const chatHistoryExtracted = extractWhatsAppChats();
  console.log(`chatHistory=`,chatHistoryExtracted)
  // sendChatHistoryToBackend(chatHistoryExtracted.chatHistory);
}

export function runLinkedInScript():void {
  console.log(`Linkedin Script Injected`)
  const linkedinChatHistory = extractLinkedInChat();
  console.log(`chatHistory=`,linkedinChatHistory)
}


const add_event_delegator = () => {

  console.log("Adding event delegator");
  const chatList = document.querySelector("div._1ays2");
  if (chatList) {
    chatList.addEventListener("DOMNodeInserted", () => {
      console.log("Node inserted");
      runWhatsappScript();
    });
  } else {
    console.error("Chat list not found");
  }

  
};
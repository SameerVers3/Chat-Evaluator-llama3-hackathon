import { Client } from "@gradio/client";

interface Message {
  context: string | null;
  message: string | null;
  replyTo?: string | null;
}


interface FormattedMessage {
  messageId: string;
  messageSender: string;
  messageContent: string;
  time: string;
  replyTo: string | null;
}

interface FormattedChat {
  text: FormattedMessage[];
  isGroupChat: boolean;
}

interface ChatSuggestion {
  messages: Message[];
  score: number;
  description: string;
}

// Replace with your own identifier (e.g., phone number or name)
const SELF_IDENTIFIER = "Your Name";

function filterMessage(node: Element): Message | null {
  const textNode = node.querySelectorAll('.copyable-text');
  const context = textNode[0]?.getAttribute('data-pre-plain-text') ?? null;
  const message = textNode[1]?.textContent ?? null;
  let replyTo: string | null = null;

  // Check if there is a quoted message indicating a reply
  const quotedMessage = node.querySelector('.quoted-mention, .quoted-text');
  if (quotedMessage) {
    replyTo = quotedMessage.textContent?.trim() || null;
  }

  if (!context || !textNode || !message) {
    return null;
  }

  console.log(node);

  if (node.classList.contains('message-out')) {
    console.log("it's a message out");
    let self = context.split("]")[0] + "] " + "self" + ":";
    console.log(self);
    return { context: self, message, replyTo };
  }
  else {
    return { context, message, replyTo };
  }

}

function extractWhatsappChat(): Message[] {
  const chat = document.querySelectorAll('.message-in, .message-out');
  const fullChat: Message[] = [];

  if (chat.length > 0) {
    chat.forEach(node => {
      const data = filterMessage(node);
      if (data) {
        fullChat.push(data);
      }
    });
  }
  return fullChat;
}

function injectWhatsappSuggestions(messages: Message[]): void {

  console.log(messages);

  const footer: HTMLElement | null = document.querySelector('footer');

  if (!footer) {
    console.error('Footer element not found');
    return;
  }

  const injectSpot: HTMLElement | null = footer.querySelector('.copyable-area');

  if (!injectSpot) {
    console.error('Copyable area not found inside footer');
    return;
  }

  Object.assign(injectSpot.style, { display: "block" });

  const existingSuggestionDiv = injectSpot.querySelector('.whatsapp-suggestions');
  if (existingSuggestionDiv) {
    existingSuggestionDiv.remove();
  }

  const suggestionDiv = document.createElement('div');
  suggestionDiv.className = 'whatsapp-suggestions';
  Object.assign(suggestionDiv.style, {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: 'center',
    gap: "5px",
    maxHeight: "150px",
  });

  for (const message of messages) {
    const div = document.createElement('div');
    Object.assign(div.style, {
      display: "flex",
      justifyContent: "center",
      alignItems: 'center',
      color: "black",
      fontSize: "14px",
      padding: "6px 16px",
      border: "2px solid #d9fdd3",
      backgroundColor: "#d9fdd3",
      borderRadius: "6px",
      minWidth: "fit-content",
      cursor: 'pointer',
      transition: "all 0.3s ease"
    });

    div.addEventListener('mouseenter', () => {
      Object.assign(div.style, {
        backgroundColor: "#008069",
        border: "2px solid #008069",
        color: "white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
      });
    });

    div.addEventListener('mouseleave', () => {
      Object.assign(div.style, {
        backgroundColor: "#d9fdd3",
        color: "black",
        border: "2px solid #d9fdd3",
        boxShadow: "none"
      });
    });

    div.textContent = `${message}`;

    div.addEventListener('click', () => {
      handleMessageClick(message);
    });

    suggestionDiv.appendChild(div);
  }
  injectSpot.insertBefore(suggestionDiv, injectSpot.firstChild);
}

function handleMessageClick(message: Message): void {
  console.log('Sending message:', message);

  const nodeList = document.querySelectorAll('.selectable-text.copyable-text.x15bjb6t.x1n2onr6');

  if (nodeList.length === 0) {
    console.error('No elements found with the specified classes.');
    return;
  }

  const lastElement = nodeList[nodeList.length - 1] as HTMLParagraphElement;


  const span = document.createElement('span');
  span.classList.add('selectable-text', 'copyable-text');
  span.dataset.lexicalText = 'true';
  span.innerText = `${message}`;

  console.log(lastElement);

  lastElement.innerHTML = ''; 
  lastElement.appendChild(span);
  
  console.log(lastElement);

  console.log('Sending message:', message);
  console.log(span);
  console.log(lastElement);
}



function convertChatToDesiredFormat(chat: Message[]): FormattedChat {
  const formattedChat: FormattedChat = {
    text: [],
    isGroupChat: false
  };

  const participants = new Set<string>();

  chat.forEach((message, index) => {

    console.log("-----------------------------")
    console.log(message);
    console.log("-----------------------------")

    const messageId = `msg${String(index + 1).padStart(3, '0')}`;
    const rawSender = message.context!.split("] ")[1].split(":")[0];
    const messageSender = rawSender === SELF_IDENTIFIER ? "self" : rawSender;
    participants.add(messageSender);
    let time = message.context!.split("] ")[0].substring(1);
    time = new Date(time).toISOString();

    let replyToId: string | null = null;
    if (message.replyTo) {
      // Find the messageId of the original message being replied to
      const replyToMessage = chat.find(m => m.message === message.replyTo);
      if (replyToMessage) {
        replyToId = `msg${String(chat.indexOf(replyToMessage) + 1).padStart(3, '0')}`;
      }
    }

    formattedChat.text.push({
      messageId: messageId,
      messageSender: messageSender,
      messageContent: message.message!,
      time: time,
      replyTo: replyToId
    });
  });

  formattedChat.isGroupChat = participants.size > 2;

  return formattedChat;
}

async function sendToGradio(chat: FormattedChat): Promise<ChatSuggestion> {
  console.log("Sending chat to Gradio");

  const client = await Client.connect("Ashad001/llama3hackathon");
  const result = await client.predict("/predict", { 		
      text: JSON.stringify(chat, null, 2), 
  });

  const apiResponse = (result.data as any[])[0];

  console.log(apiResponse);

  let jsonString = apiResponse
    .replace(/'/g, '"') // Replace single quotes with double quotes
    .replace(/(\w)\"(\w)/g, "$1\\\"$2");

  console.log(jsonString);

  const res = JSON.parse(jsonString);

  console.log(res);

  return res;
}

export async function runWhatsappScript(): Promise<void> {
  console.log("WhatsApp script injected");
  const chatHistoryExtracted = extractWhatsappChat();
  console.log(`chatHistory=`, chatHistoryExtracted);

  const formattedChat = convertChatToDesiredFormat(chatHistoryExtracted);

  console.log(`formattedChat=`, JSON.stringify(formattedChat, null, 2));

  const chatSuggestion = await sendToGradio(formattedChat);


  injectWhatsappSuggestions(chatSuggestion.messages);
}

// const add_event_delegator = () => {
//   console.log("Adding event delegator");
//   const chatList = document.querySelector("div._1ays2");
//   if (chatList) {
//     chatList.addEventListener("DOMNodeInserted", () => {
//       console.log("Node inserted");
//       runWhatsappScript();
//     });
//   } else {
//     console.error("Chat list not found");
//   }
// };

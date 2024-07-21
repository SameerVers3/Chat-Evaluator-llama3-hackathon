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
  time: Date | string;
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

function extractLinkedInMsg(node: any): Message | null {
  const contextSpan = node.querySelector('.msg-s-event-listitem--group-a11y-heading');
  const context = contextSpan ? contextSpan.textContent.trim() : '';
  const messageElement = node.querySelector('.msg-s-event-listitem__body');
  const message = messageElement ? messageElement.textContent.trim() : '';

  if (!context && !message) {
    return null;
  }

  return { context, message };
}

function extractLinkedInChat(): Message[] {
  const chat = document.querySelectorAll('.msg-s-message-list__event');
  const fullChat: Message[] = [];

  if (chat.length > 0) {
    chat.forEach((node: any) => {
      const data = extractLinkedInMsg(node);
      if (data) {
        fullChat.push(data);
      }
    });
  }
  return fullChat;
}

function injectLinkedinSuggestions(messages: Message[]): void {
  const footer: HTMLElement | null = document.querySelector('footer');

  if (!footer) {
    console.error('Footer not found');
    return;
  }

  Object.assign(footer.style, {
    display: 'flex',
    flexWrap: 'wrap',
  });

  const existingSuggestionDiv = footer.querySelector('.linkedin-suggestions');
  if (existingSuggestionDiv) {
    existingSuggestionDiv.remove();
  }

  const suggestionDiv = document.createElement('div');
  suggestionDiv.className = 'linkedin-suggestions';
  Object.assign(suggestionDiv.style, {
    flexBasis: '100%',
    display: "flex",
  });

  const nestedDiv = document.createElement('div');
  Object.assign(nestedDiv.style, {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: 'center',
    gap: "5px",
    maxHeight: "150px",
    overflow: 'auto',
  });

  for (const message of messages) {
    const div = document.createElement('div');
    Object.assign(div.style, {
      display: "flex",
      justifyContent: "center",
      alignItems: 'center',
      color: "#0a66c2",
      fontSize: "12px",
      padding: "6px 12px",
      border: "2px solid #0a66c2",
      backgroundColor: "white",
      borderRadius: "12px",
      minWidth: "fit-content",
      cursor: 'pointer',
      transition: "all 0.3s ease"
    });

    div.addEventListener('mouseenter', () => {
      Object.assign(div.style, {
        backgroundColor: "#0a66c2",
        color: "white",
        border: "2px solid white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
      });
    });

    div.addEventListener('mouseleave', () => {
      Object.assign(div.style, {
        backgroundColor: "white",
        color: "#0a66c2",
        border: "2px solid #0a66c2",
        boxShadow: "none"
      });
    });

    div.textContent = `${message}`;

    div.addEventListener('click', () => {
      handleMessageClick(message);
    });

    nestedDiv.appendChild(div);
  }

  suggestionDiv.appendChild(nestedDiv);
  footer.insertBefore(suggestionDiv, footer.firstChild);
}

function handleMessageClick (message: Message): void {
  console.log("clicked")
  const input = document.querySelector('.msg-form__contenteditable');
  const sendButton = document.querySelector('.msg-form__send-btn')
  const placeholder = document.querySelector(`.msg-form__placeholder`);


  placeholder?.setAttribute(`aria-hidden`,'true');
  placeholder?.classList.remove('msg-form__placeholder')
  sendButton?.removeAttribute(`disabled`)
  sendButton?.classList.remove(`artdeco-button--disabled`);
  console.log(sendButton);
  
  

  // console.log(input)

  if (input) {
    input.setAttribute('data-artdeco-is-focused','true')
    console.log("input found")

    const p = document.createElement('p');
    p.innerText = `${message}`
    input.innerHTML = '';
    input.appendChild(p);
    console.log("added successfully")
  }

}


function convertChatToDesiredFormat(chat: Message[]): FormattedChat {

  const talkingToElement = document.querySelector("#thread-detail-jump-target");
  const talkingTo = talkingToElement ? talkingToElement.textContent : "Unknown";

  const formattedChat: FormattedChat = {
    text: [],
    isGroupChat: false
  };

  const participants = new Set<string>();

  function isValidDate(date: Date): boolean {
    return !isNaN(date.getTime());
  }

  chat.forEach((message, index) => {

    const messageId = `msg${String(index + 1).padStart(3, '0')}`;
    const rawSender = message.context?.split("sent the following message at")[0].trim();
    const messageSender = rawSender === SELF_IDENTIFIER ? "self" : rawSender || "unknown";
    participants.add(messageSender);

    const timeString = message.context?.split("at")[1]?.trim();
    const time = timeString ? new Date(timeString) : new Date();
    const formattedTime = isValidDate(time) ? time.toISOString() : new Date().toISOString();

    let replyToId: string | null = null;

    formattedChat.text.push({
      messageId: messageId,
      messageSender: messageSender,
      messageContent: message.message || "",
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

  const res = JSON.parse(jsonString);

  console.log(res);

  return res;
}

export async function runLinkedInScript(): Promise<void> {
  console.log("LinkedIn script injected");
  const chatHistoryExtracted = extractLinkedInChat();
  console.log(`chatHistory=`, chatHistoryExtracted);

  const formattedChat = convertChatToDesiredFormat(chatHistoryExtracted);

  console.log(`formattedChat=`, JSON.stringify(formattedChat, null, 2));

  const chatSuggestion = await sendToGradio(formattedChat);

  injectLinkedinSuggestions(chatSuggestion.messages);
}

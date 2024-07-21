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
  context?: Context | null;
}

interface ChatSuggestion {
  messages: Message[];
  score: number;
  description: string;
}

interface Context {
  context: string | null;
  SuggestionTone: string | null;
  MyCurrentEmotion: string | null;
  FrankLevel: string | null;
}

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
      insertTextIntoLinkedIn(message);
    });

    nestedDiv.appendChild(div);
  }

  suggestionDiv.appendChild(nestedDiv);
  footer.insertBefore(suggestionDiv, footer.firstChild);
}

function insertTextIntoLinkedIn(text:any) {
  //select message input field
  const inputField = document.querySelector('div[contenteditable="true"][aria-label*="message"]');
  
  if (inputField) {
      // Focus on the input field
      //@ts-ignore
      inputField.focus();

      // Insert the text
      document.execCommand('insertText', false, text);

      // Dispatch input event
      const inputEvent = new Event('input', { bubbles: true, composed: true });
      inputField.dispatchEvent(inputEvent);

      // Dispatch a change event
      const changeEvent = new Event('change', { bubbles: true });
      inputField.dispatchEvent(changeEvent);


  } else {
      console.error('LinkedIn message input field not found');
  }
}



function convertChatToDesiredFormat(chat: Message[]): FormattedChat {
  const talkingToElement = document.querySelector("#thread-detail-jump-target");
  const talkingTo = talkingToElement?.textContent?.trim() || "Unknown";

  console.log(`Talking to: ${talkingTo}`); 
  console.log("----------------------------s")

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

    // Extract sender and time from the context
    let rawSender = "";
    let timeString = "";

    if (message.context) {
      const senderMatch = message.context.match(/^(.*?)(?= sent the following message| at )/);
      const timeMatch = message.context.match(/at (.*)$/);

      if (senderMatch) {
        rawSender = senderMatch[1].trim();
      }

      if (timeMatch) {
        timeString = timeMatch[1].trim();
      }
    }

    let messageSender = rawSender === talkingTo ? rawSender : "self";

    console.log(`Sender: ${messageSender}`);
    console.log(rawSender)

    if (rawSender === talkingTo && rawSender !== "") {
      messageSender = rawSender;
    }

    participants.add(messageSender);

    const time = timeString ? new Date(timeString) : new Date();
    const formattedTime = isValidDate(time) ? time.toISOString() : new Date().toISOString();

    formattedChat.text.push({
      messageId: messageId,
      messageSender: messageSender,
      messageContent: message.message || "",
      time: formattedTime,
      replyTo: null
    });
  });

  formattedChat.isGroupChat = participants.size > 2;

  console.log(formattedChat);
  return formattedChat;
}


async function sendToGradio(chat: FormattedChat): Promise<ChatSuggestion> {

  const context = await getContextFromStorage();
  console.log(context);

  const con = context as Context;

  chat.context = con;

  console.log(chat);

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

function getContextFromStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('context', function(data) {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(data.context || '');
    });
  });
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

const SetScore = (score: number, description: string) => {
  
}
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

  if (node.classList.contains('message-out')) {
    let self = context.split("]")[0] + "] " + "self" + ":";
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

function injectWhatsappSuggestions(messages: any[]): void {

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


function createMessageDiv(text:any) {
  // Create the outer div
  const outerDiv = document.createElement('div');
  outerDiv.className = 'x1hx0egp x6ikm8r x1odjw0f x1k6rcq7 x6prxxf';
  outerDiv.contentEditable = 'true';
  outerDiv.role = 'textbox';
  outerDiv.spellcheck = true;
  outerDiv.setAttribute('aria-label', 'Type a message');
  outerDiv.tabIndex = 10;
  outerDiv.setAttribute('data-tab', '10');
  outerDiv.setAttribute('data-lexical-editor', 'true');
  outerDiv.style.maxHeight = '11.76em';
  outerDiv.style.minHeight = '1.47em';
  outerDiv.style.userSelect = 'text';
  outerDiv.style.whiteSpace = 'pre-wrap';
  outerDiv.style.wordBreak = 'break-word';

  // Create the paragraph element
  const paragraph = document.createElement('p');
  paragraph.className = 'selectable-text copyable-text x15bjb6t x1n2onr6';
  paragraph.dir = 'ltr';
  paragraph.style.textIndent = '0px';
  paragraph.style.marginTop = '0px';
  paragraph.style.marginBottom = '0px';

  // Create the span element
  const span = document.createElement('span');
  span.className = 'selectable-text copyable-text';
  span.setAttribute('data-lexical-text', 'true');
  span.textContent = text;

  // Assemble the elements
  paragraph.appendChild(span);
  outerDiv.appendChild(paragraph);

  return outerDiv;
}

function createSendButton() {
  // Create the outer div
  const outerDiv = document.createElement('div');
  outerDiv.className = '_ak1t _ak1u';

  // Create the button
  const button = document.createElement('button');
  button.setAttribute('data-tab', '11');
  button.setAttribute('aria-label', 'Send');
  button.className = 'x1c4vz4f x2lah0s xdl72j9 xfect85 x1iy03kw x1lfpgzf';

  // Create the span
  const span = document.createElement('span');
  span.setAttribute('data-icon', 'send');

  // Create the SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('height', '24');
  svg.setAttribute('width', '24');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.setAttribute('version', '1.1');
  svg.setAttribute('x', '0px');
  svg.setAttribute('y', '0px');
  svg.setAttribute('enable-background', 'new 0 0 24 24');

  // Create the title
  const title = document.createElement('title');
  title.textContent = 'send';

  // Create the path
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'currentColor');
  path.setAttribute('d', 'M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z');

  // Assemble the elements
  svg.appendChild(title);
  svg.appendChild(path);
  span.appendChild(svg);
  button.appendChild(span);
  outerDiv.appendChild(button);

  return outerDiv;
}


function handleMessageClick(message: Message): void {

// targetElement?.focus();
   const node = document.querySelectorAll('.lexical-rich-text-input')[1];
   const parent  = node.parentNode;
   const mega = parent?.parentNode;
  // const bigNode = node.parentElement
  // const parentNode = node.parentElement
   if(node && mega){
     node.innerHTML =''
     const whatsappInput = createMessageDiv(message)
     node.appendChild(whatsappInput);
  

    while(mega.firstChild){
      mega.removeChild(mega.firstChild);
    }
  
    mega.appendChild(createSendButton())
  mega.insertBefore(parent,mega.firstChild);
  // mega.appendChild(createSendButton())


  //   console.log(parentNode?.childElementCount)
  //   const whatsappSendButton = createSendButton();

  //   // if(parentNode && bigNode){
  //   //   parentNode.innerHTML = ''
  //   //   parentNode.appendChild(bigNode);
  //   //   parentNode?.appendChild(whatsappSendButton)

    const sendButton = document.querySelector('.x1c4vz4f.x2lah0s.xdl72j9.xfect85.x1iy03kw.x1lfpgzf') as HTMLButtonElement;
    
    if (sendButton) {
      console.log("found button, clicking");
      console.log(sendButton);
      sendButton.click();
    }

   }
 }







  // console.log(lastElement);

  // const span = document.createElement('span');
  // span.classList.add('selectable-text', 'copyable-text');
  // span.dataset.lexicalText = 'true';
  // span.innerText = `${message}`;

  // console.log(lastElement);

  // lastElement.innerHTML = ''; 
  // lastElement.appendChild(span);
  
  // console.log(lastElement);

  // console.log('Sending message:', message);
  // console.log(span);
  // console.log(lastElement);




function convertChatToDesiredFormat(chat: Message[]): FormattedChat {
  const formattedChat: FormattedChat = {
    text: [],
    isGroupChat: false
  };

  const participants = new Set<string>();

  chat.forEach((message, index) => {

    const messageId = `msg${String(index + 1).padStart(3, '0')}`;
    const rawSender = message.context!.split("] ")[1].split(":")[0];
    let messageSender = rawSender;

    const messageOut = document.querySelector(".message-out");

    if (messageOut) {
      messageSender = "self";
    }

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

  console.log("Formatted chat:", formattedChat);

  return formattedChat;
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


async function sendToGradio(chat: FormattedChat): Promise<ChatSuggestion> {
  const context = await getContextFromStorage();
  console.log(context);

  const con = context as Context;

  chat.context = con;

  console.log(chat);
  

  console.log(JSON.stringify(chat, null, 2));
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

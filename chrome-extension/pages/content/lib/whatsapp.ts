

function filterMessage(node:any){

  let textNode = node?.querySelectorAll(' .copyable-text')
  let context = textNode[0]?.getAttribute('data-pre-plain-text') ?? null;
  let message = textNode[1]?.textContent;
  
  if(!context || !textNode || !message){
    return null;
  }

  return {
    context,
    message

  }

}

function extractWhatsappChat(){
  let chat = document.querySelectorAll('.message-in , .message-out');
    let fullChat:any[] = []
    // console.log(chat);
    if(chat.length > 0){

      chat.forEach(node => {
        const data =  filterMessage(node);
        if(data){
          fullChat.push(data);
        }
      })

    }
    return fullChat;

}

// async function sendChatHistoryToBackend(history: MessageDetails[]): Promise<void> {
//   console.log("Initiating..");
//   try {
//     const response = await fetch("https://ashad001-llama3hackathon.hf.space/call/predict", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data: history }),
//     });
//     const data = await response.json();
//     console.log(data);
//     const EVENT_ID = data.event_id;
//     console.log(EVENT_ID);

//     const resultResponse = await fetch(`https://ashad001-llama3hackathon.hf.space/call/predict/${EVENT_ID}`);
//     if (!resultResponse.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const resultText = await resultResponse.text();
//     console.log("Response body:", resultText);
//     const responseData = resultText.split("\n");
//     console.log(responseData);
//     const scoreMatch = responseData[1].match(/\d+/);
//     if (scoreMatch) {
//       const score = scoreMatch[0];
//       console.log("Score:", score);

//       console.log("Score:", score);
//     } else {
//       console.error("No score found in the response");
//     }
//   } catch (error) {
//     console.error("Error making prediction or fetching result:", error);
//   }
// }

function injectWhatsappSuggestions(messages:any[]){

  let footer: HTMLElement | null = document.querySelector('footer');

  if (!footer) {
    console.error('Footer element not found');
    return;
  }

  let injectSpot: HTMLElement | null = footer.querySelector('.copyable-area');

  if (!injectSpot) {
    console.error('Copyable area not found inside footer');
    return;
  }

  Object.assign(injectSpot.style, {
    display:"block",

  })

  const existingSuggestionDiv = injectSpot.querySelector('.whatsapp-suggestions');
  if (existingSuggestionDiv) {
    existingSuggestionDiv.remove();
  }

  let suggestionDiv:any = document.createElement('div');
  suggestionDiv.className = 'whatsapp-suggestions';
  Object.assign(suggestionDiv.style, {
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center",
    alignItems:'center',
    gap:"5px",
    maxheight:"150px",
});
  for (let i = 0; i < messages.length; i++) {
    const div = document.createElement('div');
    Object.assign(div.style, {
      display:"flex",
      justifyContent:"center",
      alignItems:'center',
      color:"black",
      fontSize:"14px",
      padding:"6px 16px",
      border:"2px solid #d9fdd3",
      backgroundColor:"#d9fdd3",
      borderRadius:"6px",
      minWidth:"fit-content",
      cursor:'pointer',
      transition:"all 0.3s ease"

  });


  div.addEventListener('mouseenter', () => {
    Object.assign(div.style, {
        backgroundColor: "#008069",
        border: "2px solid #008069",
        color:"white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
    });
  })

  div.addEventListener('mouseleave', () => {
    Object.assign(div.style, {
        backgroundColor: "#d9fdd3",
        color:"black",
        border: "2px solid #d9fdd3",
        boxShadow: "none"
    });
});

    div.textContent = `${messages[i].message}`;
    suggestionDiv.appendChild(div);
}
injectSpot.insertBefore(suggestionDiv, injectSpot.firstChild);
}

export function runWhatsappScript(): void {
  console.log("WhatsApp script injected");
  const chatHistoryExtracted =extractWhatsappChat()
  console.log(`chatHistory=`,chatHistoryExtracted)
  //#TODO SETUP backend API and get suggestions Response
  injectWhatsappSuggestions([...chatHistoryExtracted.slice(-5)]);
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
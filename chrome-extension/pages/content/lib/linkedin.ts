
  
  function extractLinkedInMsg(node:any) {
    // Extract the context information
    const contextSpan = node.querySelector('.msg-s-event-listitem--group-a11y-heading');
    const context = contextSpan ? contextSpan.textContent.trim() : '';
  
    // Extract the message content
    const messageElement = node.querySelector('.msg-s-event-listitem__body');
    const message = messageElement ? messageElement.textContent.trim() : '';
  
    if(!context && !message){
      return null
    }
  
    // Create the object with the extracted data
    const messageData = {
      context: context,
      message: message
    };
  
    return messageData;
  }
  
  function extractLinkedInChat(): any[] {
        let chat = document?.querySelectorAll('.msg-s-message-list__event');
        let fullChat:any[] = [];
        if(chat.length > 0){
  
         chat.forEach((node:any) => {
              let data =  extractLinkedInMsg(node)
              if(data){
                fullChat.push(data);
              }
          })
        }
        return fullChat;
  }

  
  function injectLinkedinSuggestions(messages:any[]){
  
    let injectSpot: HTMLElement | null = document.querySelector('footer');
    
  
    if (!injectSpot) {
      console.error('Footer not found');
      return;
    }

    Object.assign(injectSpot.style, {
        display: 'flex',
        flexWrap: 'wrap',
      })


    const existingSuggestionDiv = injectSpot.querySelector('.linkedin-suggestions');
    if (existingSuggestionDiv) {
      existingSuggestionDiv.remove();
    }
  
    let suggestionDiv:any = document.createElement('div');
    suggestionDiv.className = 'linkedin-suggestions';

    Object.assign(suggestionDiv.style, {
        flexBasis: '100%',
        display:"flex",
      })
    let nestedDiv:any = document.createElement('div');
    Object.assign(nestedDiv.style, {
      display:"flex",
      flexWrap:"wrap",
      justifyContent:"center",
      alignItems:'center',
      gap:"5px",
      maxheight:"150px",
      overflow:'auto',
  });
    for (let i = 0; i < messages.length; i++) {
      const div = document.createElement('div');
      Object.assign(div.style, {
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
        color:"#0a66c2",
        fontSize:"12px",
        padding:"6px 12px",
        border:"2px solid #0a66c2",
        backgroundColor:"white",
        borderRadius:"12px",
        minWidth:"fit-content",
        cursor:'pointer',
        transition:"all 0.3s ease"
  
    });
  
  
    div.addEventListener('mouseenter', () => {
      Object.assign(div.style, {
          backgroundColor: "#0a66c2",
          color:"white",
          border: "2px solid white",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
      });
    })
  
    div.addEventListener('mouseleave', () => {
      Object.assign(div.style, {
          backgroundColor: "white",
          border: "2px solid #0a66c2",
          color:"#0a66c2",
          boxShadow: "none"
      });
  });
    if(messages[i].message.length > 50){
        div.title = `${messages[i].message}`
        div.textContent = `${messages[i].message.slice(0,40)}...`;

    }else{
        div.textContent = `${messages[i].message}`;
    }
      nestedDiv.appendChild(div);
  }
  suggestionDiv.appendChild(nestedDiv);
  injectSpot.insertBefore(suggestionDiv, injectSpot.firstChild);
  }
  
  
  export function runLinkedInScript():void {
    console.log(`Linkedin Script Injected`)
    const linkedinChatHistory = extractLinkedInChat();
    console.log(`chatHistory=`,linkedinChatHistory)
    injectLinkedinSuggestions([...linkedinChatHistory.slice(-2)])
  }
  
  

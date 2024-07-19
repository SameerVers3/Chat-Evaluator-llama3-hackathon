import { createRoot } from 'react-dom/client';
import App from '@src/app';
import WhatsappInput from "@src/whatsapp";

// eslint-disable-next-line
// @ts-ignore
import tailwindcssOutput from '@src/tailwind-output.css?inline';



const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);


const globalStyleSheet = new CSSStyleSheet();
globalStyleSheet.replaceSync(tailwindcssOutput);

shadowRoot.adoptedStyleSheets = [globalStyleSheet];
shadowRoot.appendChild(rootIntoShadow);

createRoot(rootIntoShadow).render(<App />);



if (window.location.href === "https://web.whatsapp.com/") {
  console.log("WhatsApp script injected.");

  const observer = new MutationObserver((mutations) => {
    console.log('Mutation observed');
    const footer = document.querySelector("footer");

    if (footer) {
      console.log('Footer found');
      console.log("----------------------------------");
      console.log(footer);
      const input = footer.querySelector("._ak1q");
      console.log(input);
      console.log("------------------===========------------------");
      if (input && input.id !== "whatsapp-input") {
        console.log('Input found');
        console.log("----------------------------------");
    
        const whatsappDiv = document.createElement('div');
        whatsappDiv.className = 'whatsapp-container'; 

        if (input.parentNode) {
          input.parentNode.insertBefore(whatsappDiv, input);
        }
    
        if (input.parentNode instanceof HTMLElement) {
          input.parentNode.style.display = 'flex';
          input.parentNode.style.flexDirection = 'column';
        }
    
        createRoot(whatsappDiv).render(<WhatsappInput />);
        
        input.id = "whatsapp-input";

      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

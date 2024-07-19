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

/** Inject styles into shadow dom */
const globalStyleSheet = new CSSStyleSheet();
globalStyleSheet.replaceSync(tailwindcssOutput);

shadowRoot.adoptedStyleSheets = [globalStyleSheet];
shadowRoot.appendChild(rootIntoShadow);

createRoot(rootIntoShadow).render(<App />);



if (window.location.href === "https://web.whatsapp.com/") {
  console.log("WhatsApp script injected blah blah blah");

  const observer = new MutationObserver((mutations) => {
    console.log('Mutation observed');
    const footer = document.querySelector("footer");

    if (footer) {
      console.log('Footer found');
      console.log("----------------------------------");
      console.log(footer);
      const input = document.querySelector("_ak1r");
      if (input) {
        console.log('Input found');
        console.log("----------------------------------");
        createRoot(input).render(<WhatsappInput />);
        observer.disconnect();
      }
    }
  });

  // Start observing the document body for changes
  observer.observe(document.body, { childList: true, subtree: true });
}
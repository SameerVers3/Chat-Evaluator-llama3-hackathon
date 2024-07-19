import '@src/Popup.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';

import { ComponentPropsWithoutRef, useEffect, useState } from 'react';

const Popup = () => {

  const [activeTabUrl,setActiveTabUrl] = useState<string>('');


  useEffect(() => {
    const checkActiveTab = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          console.log(tabs[0].url)
          const tabUrl = tabs[0].url ?? ``;
          if(tabUrl.includes(`linkedin.com/messaging`) || tabUrl.includes(`web.whatsapp.com`)){
            setActiveTabUrl(tabUrl);
          }else{
            setActiveTabUrl('');
          }
        }
      });
    };

    // Check the active tab when the popup is opened
    checkActiveTab();

    // Listen for tab change events
    chrome.tabs.onActivated.addListener(checkActiveTab);

    // Clean up the listener when the component unmounts
    return () => {
      chrome.tabs.onActivated.removeListener(checkActiveTab);
    };
  }, []);

  const sendMessage = () => {

    console.log('sending message');

    const query = { active: true, currentWindow: true };

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      console.log('currentTab', currentTab);
      if (currentTab && currentTab.id !== undefined) {
        chrome.tabs.sendMessage(currentTab.id, { action: 'callit' }, (response) => {
          console.log('response', response);
        });
      } else {
        console.error('No active tab found or tab ID is undefined');
      }
    });

    console.log("Send message to background");
  };


  return (
    <div className="w-screen h-[400px] min-h-screen bg-gradient-to-b from-blue-200 to-white flex flex-col">
      <div className="h-24 rounded-lg flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-blue-900">Personify</h2>
        <p className="text-lg font-semibold text-blue-700 mt-2">Your AI Social Media Assistant!</p>
      </div>
      <div className="bg-white flex justify-center items-center flex-col gap-3 flex-grow rounded-t-3xl shadow-lg ">
      {activeTabUrl.length > 0 ?
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
     
      :<div>

        Not Valid For This Website...

      </div>
    
  }
  </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div>Loading...</div>), <div>Error Occurred</div>);
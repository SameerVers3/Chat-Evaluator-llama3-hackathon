import '@src/Popup.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';

import { ComponentPropsWithoutRef } from 'react';

const Popup = () => {
  
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

  }
  

  return (
    <div className='w-screen h-screen  bg-blue-200 flex flex-col bg-'>
      <div className='h-24 rounded-lg flex flex-col justify-center items-center '>
        <h2 className='text-2xl font-bold text-blue-900 '>Personify</h2>
        <p className='text-md font-semibold text-blue-700 mt-1'>Your AI social media Assistant! </p>
      </div>
      <div className='bg-white h-full rounded-t-3xl'>
        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};


export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);

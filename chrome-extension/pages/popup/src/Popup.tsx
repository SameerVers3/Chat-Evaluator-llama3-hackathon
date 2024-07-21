import '@src/Popup.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';

import { ComponentPropsWithoutRef, useEffect, useState } from 'react';

const Popup = () => {

  const [activeTabUrl,setActiveTabUrl] = useState<string>('');
  const [isExtensionActive,setIsExtensionActive] = useState(false);
  const [context, setContext] = useState<string>('');

  useEffect(() => {
    chrome.storage.sync.get('context', (data) => {
      console.log(data.context);
      setContext(data.context || '');
    });


  }, [])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    console.log('Setting context');
    setContext(e.target.value);
    chrome.storage.sync.set({ 'context': e.target.value });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id ?? 0, { action: 'updateContext', context: e.target.value });
      }
    });

    chrome.storage.sync.get('context', (data) => {
      console.log(data.context);
    });
  };

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

  useEffect(()=>{
    chrome.storage.sync.get('isExtensionActive', (data) => {
      setIsExtensionActive(data.isExtensionActive || false);
    });
  },[])


  const toggleActivation = (newState:boolean) => {
    setIsExtensionActive(newState);
    chrome.storage.sync.set({'isExtensionActive':newState})
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs:any) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "toggleActivation", state: newState });
    });
  }

  return (
    <div className="w-screen h-[400px] min-h-screen flex flex-col">
      <div className="h-24 rounded-lg flex flex-col justify-center items-center bg-blue-200">
        <h2 className="text-2xl font-bold text-blue-900">Personify</h2>
        <p className="text-lg font-semibold text-blue-700 mt-2">Your AI Social Media Assistant!</p>
      </div>

       <div className="flex justify-center items-center flex-col gap-3">
        <div className='w-full h-[250px] p-5'>
          <textarea
            className='w-full p-3 h-full border rounded-lg resize-none focus:outline-blue-200'
            value={context}
            onChange={onChange}
            placeholder='Enter your context here'
          />
        </div>
       </div>

       <div className='fixed bottom-0 bg-black w-full flex flex-row gap-5 justify-center rounded-t-lg p-3 bg-blue-200'>
          <button
            onClick={()=>toggleActivation(true)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
            { isExtensionActive ? `Activated` :'Activate' }
          </button>

          <button
            onClick={()=>toggleActivation(false)}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          >
            Deactivate
          </button>

        </div>
  </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div>Loading...</div>), <div>Error Occurred</div>);

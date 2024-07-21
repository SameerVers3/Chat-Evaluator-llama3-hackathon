import '@src/Popup.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { RadioGroup, Radio } from 'react-radio-group';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';

const Popup = () => {

  const [activeTabUrl,setActiveTabUrl] = useState<string>('');
  const [isExtensionActive,setIsExtensionActive] = useState(false);
  const [context, setContext] = useState({
    text: '',
    tone: '',
    emotion: '',
    frankLevel: '',
  });

  const [score, setScore] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    chrome.storage.sync.get('context', (data) => {
      if (data.context) {
        setContext(data.context);
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ context });
  }, [context]);

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext((prevContext) => ({
      ...prevContext,
      text: e.target.value,
    }));
  };

  const handleRadioChange = (type: string, value: string) => {
    setContext((prevContext) => ({
      ...prevContext,
      [type]: value,
    }));
  };


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateScoreAndDescription') {
      const { score, description } = message;
      setScore(score);
      setDescription(description);
    }
  });



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
    <div className="w-screen h-[650px] min-h-screen flex flex-col">
      <div className="h-24 rounded-lg flex flex-col justify-center items-center bg-blue-200">
        <h2 className="text-2xl font-bold text-blue-900">Personify</h2>
        <p className="text-lg font-semibold text-blue-700 mt-2">Your AI Chatting Assistant!</p>
      </div>

       <div className="flex justify-center items-center flex-col gap-3">
        <div className='w-full h-[110px] p-5'>
          <textarea
            className='w-full p-3 h-full border rounded-lg resize-none focus:outline-blue-200'
            value={context.text}
            onChange={onChangeTextArea}
            placeholder='Enter your context here'
          />
        </div>
       </div>

       <div className="p-2 flex flex-col gap-3 rounded-lg shadow-lg max-w-md mx-auto">
        <div>
          <h2 className="text-sm font-semibold mb-1">Suggestion Tone:</h2>
          <RadioGroup
            name="tone"
            selectedValue={context.tone}
            onChange={(value) => handleRadioChange('tone', value)}
            className="flex justify-center gap-1 flex-wrap"
          >
            <label
              className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-300 transition ${context.tone === 'formal' ? 'bg-blue-300' : 'bg-gray-200'} flex flex-col items-center`}
            >
              <Radio value="formal" className="hidden" />
              📜 <span>Formal</span>
            </label>
            <label
              className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-300 transition ${context.tone === 'informal' ? 'bg-blue-300' : 'bg-gray-200'} flex flex-col items-center`}
            >
              <Radio value="informal" className="hidden" />
              🗣️ <span>Informal</span>
            </label>
            <label
              className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-300 transition ${context.tone === 'professional' ? 'bg-blue-300' : 'bg-gray-200'} flex flex-col items-center`}
            >
              <Radio value="professional" className="hidden" />
              👔 <span>Professional</span>
            </label>
            <label
              className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-300 transition ${context.tone === 'friendly' ? 'bg-blue-300' : 'bg-gray-200'} flex flex-col items-center`}
            >
              <Radio value="friendly" className="hidden" />
              😊 <span>Friendly</span>
            </label>
          </RadioGroup>
        </div>

        <div className="mt-2">
          <h2 className="text-sm font-semibold mb-1">My current Emotion:</h2>
          <RadioGroup
            name="emotion"
            selectedValue={context.emotion}
            onChange={(value) => handleRadioChange('emotion', value)}
            className="flex justify-center flex-wrap space-x-2"
          >
            <label
              className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-300 transition ${context.emotion === 'happy' ? 'bg-blue-300' : 'bg-gray-200'} flex flex-col items-center`}
            >
              <Radio value="happy" className="hidden" />
              😀 <span>Happy</span>
            </label>
            <label
              className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-300 transition ${context.emotion === 'sad' ? 'bg-blue-300' : 'bg-gray-200'} flex flex-col items-center`}
            >
              <Radio value="sad" className="hidden" />
              😢 <span>Sad</span>
            </label>
            <label
              className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-300 transition ${context.emotion === 'angry' ? 'bg-blue-300' : 'bg-gray-200'} flex flex-col items-center`}
            >
              <Radio value="angry" className="hidden" />
              😠 <span>Angry</span>
            </label>
            <label
              className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-300 transition ${context.emotion === 'neutral' ? 'bg-blue-300' : 'bg-gray-200'} flex flex-col items-center`}
            >
              <Radio value="neutral" className="hidden" />
              😐 <span>Neutral</span>
            </label>
            <label
              className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-300 transition ${context.emotion === 'excited' ? 'bg-blue-300' : 'bg-gray-200'} flex flex-col items-center`}
            >
              <Radio value="excited" className="hidden" />
              🤩 <span>Excited</span>
            </label>
          </RadioGroup>
        </div>

        <div className="mt-2">
          <h2 className="text-sm font-semibold mb-1">Frankness Level:</h2>
          <RadioGroup
            name="frankLevel"
            selectedValue={context.frankLevel}
            onChange={(value) => handleRadioChange('frankLevel', value)}
            className="flex justify-center flex-wrap space-x-2"
          >
            <label
              className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-300 transition ${context.frankLevel === 'low' ? 'bg-blue-300' : 'bg-gray-200'} flex flex-col items-center`}
            >
              <Radio value="low" className="hidden" />
              👌 <span>Low</span>
            </label>
            <label
              className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-300 transition ${context.frankLevel === 'neutral' ? 'bg-blue-300' : 'bg-gray-200'} flex flex-col items-center`}
            >
              <Radio value="neutral" className="hidden" />
              🤝 <span>Neutral</span>
            </label>
            <label
              className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-300 transition ${context.frankLevel === 'high' ? 'bg-blue-300' : 'bg-gray-200'} flex flex-col items-center`}
            >
              <Radio value="high" className="hidden" />
              🗣️ <span>High</span>
            </label>
          </RadioGroup>
        </div>
      </div>


      {
  score > 0 && (
    <div className="p-4 mt-4 border rounded-lg shadow-md mb-[90px]">
      <h3 className="text-lg font-semibold text-blue-800">Score</h3>
      <p className="text-2xl font-bold text-blue-700">
        {score}/100
      </p>
      <p className="mt-2 text-gray-700">
        {description}
      </p>
    </div>
  )
}

      



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

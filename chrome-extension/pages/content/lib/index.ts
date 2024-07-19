console.log("hello frion content/lib/index.ts");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'callit') {
    fun();
  };
});

if (window.location.href === "linkedin.com") {
  console.log('linkedin page');

  

}
else if  (window.location.href === "web.whatsapp.com") {
  console.log('whatsapp page');
}
const fun = () => {
  console.log('function called');
}
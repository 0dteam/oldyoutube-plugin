var enable=false;
chrome.browserAction.onClicked.addListener(function (tab) {
 enable = enable ? false : true;
 if(enable){
  //turn on...
  //chrome.browserAction.setIcon({ path: 'icon.png' });
  chrome.browserAction.setBadgeText({ text: 'ON' });
  chrome.tabs.executeScript(null, { file: 'content.js' }); 
 }else{
  //turn off...
  //chrome.browserAction.setIcon({ path: 'disable.png'});
  chrome.browserAction.setBadgeText({ text: '' });
 }
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return {
            redirectUrl: details.url + 
                (details.url.indexOf("?") == -1 ? "?" : "") +
                (details.url.indexOf("&disable_polymer=1") == -1 ? "&disable_polymer=1" : "")
        };
    },
    {urls: ['*://*.youtube.com/*'], types: ['main_frame']},
    ['blocking']
);
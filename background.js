let color = '#3aa757';


//document.addEventListener("DOMContentLoaded", function(){ onLoad(); }, false);
/*chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {

    onLoad();

  }
})
*/
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('GRABBED', `color: ${color}`);
});


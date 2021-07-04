// Initialize button with user's preferred color
var saveButton = document.getElementById("saveButton");

chrome.storage.sync.get("color", ({ color }) => {
  saveButton.style.backgroundColor = color;
});
// When the button is clicked, inject setPageBackgroundColor into current page
saveButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getDayTime
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
function isAvailable(col,row){
	
	let div = document.getElementById('YouGridSlots').querySelector('[data-col="'+col+'"][data-row="'+row+'"]');
	
	
	
	console.log(div.style.background=='rgb(51, 153, 0)');
	return(div.style.background=='rgb(51, 153, 0)');
}
/*function getTable(){
	var children = document.getElementById("YouGrid").childNodes;
	console.log(children[2])
}*/
function getDayTime(){
	var children = document.getElementById("YouGridSlots").children;
	var len = children.length;
	var first = children[0].children;
	
	for(i=0;i < first.length; i++){
		console.log(first[i]);
		var secs = first[i].getAttribute("data-time");
		var d = new Date(secs*1000);
		var day = d.getUTCDay();
		console.log(day);
	}
	
}
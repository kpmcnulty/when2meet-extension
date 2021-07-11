// Initialize button with user's preferred color
var saveButton = document.getElementById("saveButton");
var fillButton = document.getElementById("fillButton");
var tab;

async function onLoad(){
	[tab] = await chrome.tabs.query({ active: true, currentWindow: true });
chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ["funcs.js"]
	
		
		
	});
	
}
onLoad();

saveButton.addEventListener("click", async () => {
	
	chrome.scripting.executeScript({
		
		target: {tabId: tab.id},
		function: function(){
			//selectCall({toRow: 10,fromRow: 9,toCol: 2,fromCol: 1,available:true});
			savePage();
	}});
	});
	
fillButton.addEventListener("click", async () => {
	chrome.scripting.executeScript({
		
		target: {tabId: tab.id},
		function: function(){
			//selectCall({toRow: 10,fromRow: 9,toCol: 2,fromCol: 1,available:true});
			fillPageGet();
	}});
	});
	
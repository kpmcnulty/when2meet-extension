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
			
			savePage();
	}});
	});
	
fillButton.addEventListener("click", async () => {
	chrome.scripting.executeScript({
		
		target: {tabId: tab.id},
		function: function(){
			
			fillPage();
	}});
	});
	
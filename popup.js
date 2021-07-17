// Initialize button with user's preferred color
var saveButton = document.getElementById("saveButton");
var fillButton = document.getElementById("fillButton");
var tab;

async function onLoad(){
	[tab] = await browser.tabs.query({ active: true, currentWindow: true });
	browser.tabs.executeScript({
		//tabId: tab.id,
		file: "funcs.js"	
	});
	
}
onLoad();

saveButton.addEventListener("click", async () => {
	
	browser.tabs.executeScript({
			
			//tabId: tab.id,
			code: "savePage();"
	});
});
	
fillButton.addEventListener("click", async () => {
	console.log("hello");
	browser.tabs.executeScript({
		//tabId: tab.id,
		code: "fillPage();"
	});
});
	
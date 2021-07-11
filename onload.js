
async function onLoad(){

	  console.log('onload running');
	  var s = document.createElement('script');
	  s.src = chrome.runtime.getURL('fillPage.js');
	  s.onload = function() {
	      this.remove();
		  
	  };
	  (document.head || document.documentElement).appendChild(s);
      
	



	
}

onLoad();
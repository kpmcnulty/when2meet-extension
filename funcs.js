var when2MeetWeek;

function selectCall(obj){
	//changeCounter++;
	
	//console.log(obj);
	document.dispatchEvent(new CustomEvent('W2MFill', {
              detail: obj
	  }));
}

function getElement(pageRow,pageCol){
	
		return document.getElementById('YouGridSlots').querySelector('[data-col="'+pageCol+'"][data-row="'+pageRow+'"]');
	}
	
function getEpoch(div){
	return div.getAttribute("data-time");
}

function triggerEvent(el,type){
	  var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
}

function isAvailable(div){
	
	return(div.style.background=='rgb(51, 153, 0)');
}

function epochToIndex(epoch){
	
	var d;
	d = new Date(epoch*1000);
	var hours = d.getUTCHours();
	var minutes = d.getUTCMinutes();
	var ourRow =(hours*4 + minutes/15);
	var ourIndex = 96*d.getUTCDay()+ourRow;
	return(ourIndex)
}

async function getWeekly(){
	var complete = false;
	when2MeetWeek = null;
	
	chrome.storage.sync.get(['when2MeetWeek'],function(result){
		when2MeetWeek = result.when2MeetWeek;
		complete = true;
		
		if(!when2MeetWeek){
		when2MeetWeek = new Array();
		arraySize = 672;
		while(arraySize--){
			when2MeetWeek.push(false);
		
		}
		
	}
	});
	
	
}

function setWeekly(){
	
	chrome.storage.sync.set({when2MeetWeek:when2MeetWeek},function(){
		
	});
}
function savePage(){
	
	getWeekly();
	savePageWaiter();
	
}
function savePageWaiter(){
	
	if(!when2MeetWeek){
		
		setTimeout(savePageWaiter,20);
		
		return;
	}

	savePageInner();

}
function savePageInner(){
	
	//getWeekly();
	
	var i = 0;
	
	while(true){
		//row
		var j = 0;
		while(true){
			//cols
			
			result = getElement(i,j);
			if(!result){
				break;
				
			}
			
			
			var index = epochToIndex(getEpoch(result));	
			when2MeetWeek[index]=isAvailable(result);
			
			j++;
		}
		if(j==0){
		
			break;
		}
		
		i++;
	}

	setWeekly();
}




function fillPage(){
	getWeekly();
	fillPageWaiter();
	
}
function fillPageWaiter(){
	
	if(!when2MeetWeek){
		setTimeout(fillPageWaiter,20);
		return;
	}

	fillPageInner();
	
	document.dispatchEvent(new CustomEvent('phpRequest', {}));
				
	
}
function fillPageInner(){
	
	if(!when2MeetWeek){
		setTimeout(fillPage,100);
		return;
	}
	

	var toSetAvailable;
	var i = 0;
	while(true){
		var j = 0;
		while(true){
			result = getElement(j,i);
			
			
			if(!result){
				if(j!=0){
				params.toRow = j-1;
				
				params.available = toSetAvailable;
				if(params.available == true){
					selectCall(params);
				}
				}
				break;
			}
			available = when2MeetWeek[epochToIndex(getEpoch(result))];
			if(j == 0){
				var params = {
				fromRow: 0,
				toCol: i,
				fromCol: i,	
				
				};
				toSetAvailable = available;
			}
			if(available!=toSetAvailable){
				params.toRow = j-1;
				params.available = toSetAvailable;
				if(params.available == true){
					selectCall(params);
				}
				params.fromRow=j;
				toSetAvailable = available;
				
				
			}
			j++;
		}
	if(j==0){
		break
	}
	i++;
	
}
}




var when2MeetWeek;
console.log('LOADED BAKED POTATO');
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
	console.log("getWeekly");
	
	
	chrome.storage.sync.get(['when2MeetWeek'],function(result){
		//console.log(result.when2MeetWeek);
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
	console.log("setWeekly");
	chrome.storage.sync.set({when2MeetWeek:when2MeetWeek},function(){
		console.log("JK;LDFSAJL;ADFISJUDEFSWAIO;LPJDESWA;IOHJFDIOPSAHJFI[OADSHDSFIOPDASHJFIOPADHJSIOPFHADSIOPFHIOPDSAHFIOPD");
		
	});
	//console.log(when2MeetWeek);
}
function savePage(){
	console.log("savePage");
	getWeekly();
	savePageWaiter();
	
}
function savePageWaiter(){
	console.log("savePageWaiter");
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


function setAvailable(startRow,startCol,endRow,endCol,available){
	ToCol = endCol;
	FromCol = startCol;
	ToRow = endRow;
	FromRow = startRow;
	ChangeToAvailable= available;
	IsMouseDown = true;
	
	//SelectFromHere(e);
	SelectStop();
	
	
}
function fillPageGet(){
	console.log(when2MeetWeek);
}

function fillPageGet(){
	getWeekly();
	fillPage();
	
}
//select = function(fromRow, fromCol, toRow, toCol, available) { FromRow = fromRow; FromCol = fromCol; ToRow = toRow; ToCol = toCol; IsMouseDown = true; ChangeToAvailable = available; SelectStop()}

function fillPageInner(){
	
	if(!when2MeetWeek){
		setTimeout(fillPage,100);
		return;
	}
	//console.log(when2MeetWeek);

	var toSetAvailable;
	var i = 0;
	while(true){
		var j = 0;
		while(true){
			result = getElement(j,i);
			console.log(i,j);
			
			
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


function fillPage(){
	
	if(!when2MeetWeek){
		setTimeout(fillPage,20);
		return;
	}

	fillPageInner();
	
	document.dispatchEvent(new CustomEvent('phpRequest', {}));
				
	
}


/*
var params = {};
var toSetAvailable;
var changeCounter = 0;
var delayTime = 1;

function looper(){
			result = getElement(j,i);
			
			
			
			if(!result){
				params.toRow = j-1;
				
				params.available = toSetAvailable;
				if(params.available == true){
					selectCall(params);
					
				}
				
				if(j != 0){
					j=0;
					setTimeout(looper,delayTime);
					
				}else{
					document.dispatchEvent(new CustomEvent('phpRequest', {
						
					}));
				}
				i++;
				return;
			}
			available = when2MeetWeek[epochToIndex(getEpoch(result))];
			if(j == 0){
				params = {
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
	setTimeout(looper,delayTime);
}
*/

var binaryAvailability2="";
var TimesToToggle2 = new Array();

function culmulativeSelectStop() {
    if (!IsMouseDown) return;
    

    for (var i=0;i<TimeOfSlot.length;i++) {
      if (FromCol<ToCol) { ColA=FromCol; ColB=ToCol; } else { ColA=ToCol; ColB=FromCol; }
      if (FromRow<ToRow) { RowA=FromRow; RowB=ToRow; } else { RowA=ToRow; RowB=FromRow; }
      
      var currentElement = document.getElementById("YouTime"+TimeOfSlot[i]);
      if (currentElement) {
        var dataCol = Number(currentElement.getAttribute("data-col"));
        var dataRow = Number(currentElement.getAttribute("data-row"));

        var WithinX = ((ColA<=dataCol)&&(dataCol<=ColB));
        var WithinY = ((RowA<=dataRow)&&(dataRow<=RowB));
      
        if (WithinX && WithinY) {
          TimesToToggle2.push(TimeOfSlot[i]);
          if (ChangeToAvailable && (-1==AvailableAtSlot[i].indexOf(UserID)))
            AvailableAtSlot[i].push(UserID);
          if ((!ChangeToAvailable) && (-1!=AvailableAtSlot[i].indexOf(UserID))) {
            SplitSpot = AvailableAtSlot[i].indexOf(UserID);
            AvailableAtSlot[i].splice(SplitSpot,1);
          }
        }
        if (-1!=AvailableAtSlot[i].indexOf(UserID)) {
           binaryAvailability2 += "1";
        } else {
          binaryAvailability2 += "0";
        }
      }
    }
	//ReColorIndividual();
	//ReColor
}

function phpReq(){
	var eventId = window.location.href;
	eventId = eventId.substring(eventId.lastIndexOf("?") + 1, eventId.lastIndexOf("-"));
  
    new Ajax.Request("SaveTimes.php", {
      method: "post",
      parameters: "person="+UserID
               +"&event="+eventId
               +"&slots="+TimesToToggle2.join(",")
               +"&availability="+binaryAvailability2
               +"&ChangeToAvailable="+ChangeToAvailable,
      asynchronous:true,
      onSuccess:function(t) { 
     //   alert(t.responseText);
      }
    });
    
    IsMouseDown=false;
    FromCol=-1; ToCol=-1; FromRow=-1; ToRow=-1;
	ReColorGroup();
    ReColorIndividual();
    
	binaryAvailability2=""
	TimesToToggle2 = new Array();
  }
  
  
select = function(obj) {
    FromRow = obj.fromRow;
    FromCol = obj.fromCol;
    ToRow = obj.toRow;
    ToCol = obj.toCol;
    IsMouseDown = true;
    ChangeToAvailable = obj.available;
    culmulativeSelectStop()
}
//console.log('loaded undies');
document.addEventListener('W2MFill', function(e) {
	var obj = JSON.parse(e.detail); 
    select(obj);	
});

document.addEventListener('phpRequest', function(e) {
	
    phpReq();
	
});

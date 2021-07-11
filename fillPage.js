
select = function(obj) {
    FromRow = obj.fromRow;
    FromCol = obj.fromCol;
    ToRow = obj.toRow;
    ToCol = obj.toCol;
    IsMouseDown = true;
    ChangeToAvailable = obj.available;
    SelectStop()
}
console.log('loaded undies');
document.addEventListener('W2MFill', function(e) {
	
    select(e.detail);
	console.log(e.detail);
});

const fs = require ('fs');
const path = require ('path');
// чтение
let readText = fs.createReadStream(__dirname + '/text.txt', 'utf8');

readText.on('data', function(chunk) {
	console.log(chunk);	
})




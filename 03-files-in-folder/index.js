const fs = require('fs');
const path = require('path');
console.log(__dirname)
fs.readdir(__dirname +'/secret-folder/', (err, data) => {   
    data.forEach(item => {    	
    	let fileName = path.parse(item).name;
    	let ext = path.extname(item).split('.').pop(); 
    	let file = path.basename(fileName,ext);   	
    	   	
    	fs.stat(__dirname +'/secret-folder/' + item, function(err, stats){ 
    	
    	if(stats.isFile()){
    		console.log(`${file} - ${ext} - ${(stats.size / 1024).toFixed(2)} kb`);
    	}  		
    		    		
    	})
    	
    })
})

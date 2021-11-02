let fs = require('fs');
const path = require('path');

//проверка существования директории project-dist
fs.readdir(__dirname, (err, data) => {    
    data.forEach(item => {
        fs.stat(__dirname + '/' + 'project-dist', function(err, stats) {
            if (err) {
                console.log(`project-dist не существует - создаю...`);
                fs.mkdir(__dirname + '/' + 'project-dist', { recursive: true }, (err) => {
                    if (err) {
                        console.error(err)
                        return;
                    }
                })

            } else {
                // console.log(`project-dist существует`);

            }
        })

    })
})

//проверка существования файла


fs.access(__dirname + '/' + 'project-dist/' + 'bungle.css', function(error) {
    if (error) {
        // console.log("Файл не найден");
    } else {
        // console.log("Файл найден");
        fs.unlink(__dirname + '/' + 'project-dist/' + 'bungle.css', (err => {
            if (err) {
                // console.log(err);
            } else {
                // console.log("\nУдаляю файл: bungle.css");
            }
        }));
    }
});



// запись
fs.readdir(__dirname + '/styles', (err, data) => {
    data.forEach(item => {
        
        fs.stat(__dirname + '/styles/' + item, function(err, stats) {
           
            if (stats.isFile()) {
               
                if (path.extname(__dirname + '/styles/' + item) == '.css') {                   

                    fs.readFile(__dirname + '/styles/' + item, (err, data) => {
                        if (err) {
                            console.error(err)
                            return;
                        }                       
                        write(data);
                    })
                }
            }
        })
    })
})


function write(userInput) {

    fs.appendFile(__dirname + '/project-dist/' + 'bungle.css', userInput + '\n', (err) => {
        if (err){
        	 throw err;
        }
        console.log('Записано!');
    });

}
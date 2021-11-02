let fs = require('fs');
const path = require('path');

del()
    .then(() => {
        return makeDir();
    })
    .then(() => {
        return copy();
    })



function del() {
    return new Promise((resolve) => {
        fs.readdir(__dirname, (err, data) => {
           
            data.forEach(item => {
              
                fs.stat(__dirname + '/' + 'files-copy/', function(err, stats) {
                    if (err) {
                        makeDir()
                        copy()
                    } else {
                        fs.readdir(__dirname + '/' + 'files-copy/', (err, data) => {
                            data.forEach(item => {
                                // console.log(item)
                                fs.unlink(__dirname + '/' + 'files-copy/' + item, (err => {
                                    
                                }));
                            })

                            fs.rmdir(__dirname + '/' + 'files-copy', (err) => {                         
                                resolve();
                            });
                        })

                        //-------------
                    }
                })

            })

        })
    })
}

function makeDir() {
    return new Promise((resolve) => {
        fs.mkdir(__dirname + '/' + 'files-copy', { recursive: true }, (err) => {
            if (err) {                
            }
            resolve();
        })
    })
}




function copy() {
    return new Promise((resolve) => {
        fs.readdir(__dirname + '/' + 'files', (err, data) => {
            data.forEach(item => {
                fs.copyFile(__dirname + '/' + 'files/' + item, __dirname + '/' + 'files-copy/' + item, (err) => {
                    resolve();
                });

            })

        })
        console.log('файлы скопированы');
    })
}
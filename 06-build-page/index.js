let fs = require('fs');
const path = require('path');



//проверка существования файла style.css 

function isFiles(file) {
    fs.access(__dirname + '/' + 'project-dist/' + file, function(error) {
        if (error) {
            // console.log("Файл не найден");
        } else {

            fs.unlink(__dirname + '/' + 'project-dist/' + file, (err => {
                if (err) {
                    // console.log(err);
                } else {
                    // console.log(`\nУдаляю файл: ${file}`);
                }
            }));
        }
    });
}
isFiles('style.css')



// запись в файл styles.css
fs.readdir(__dirname + '/styles', (err, data) => {
    function srt() {
        if (data[0] > data[1]) return 1;
        if (data[0] == data[1]) return 0;
        if (data[0] < data[1]) return -1;
    }
    data.sort(srt)
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
    fs.appendFile(__dirname + '/project-dist/' + 'style.css', userInput + '\n', (err) => {
        if (err) {
            throw err;
        }
        // console.log('Записано!');
    });

}

// запись файлов в папку __dirname + '/project-dist/assets'

function assetsRec(pat) {
    fs.readdir(pat, (err, data) => {
        data.forEach(item => {
            let pathTo = __dirname + '/' + 'project-dist/assets/' + item;

            //---папки созданы
            fs.mkdir(pathTo, { recursive: true }, (err) => {
                if (err) {
                    console.error(err)
                    return;
                } else {

                }
            })
            // ---------

        })
    })
}
assetsRec(__dirname + '/assets/');
// })

// удалим файлы в /project-dist/assets/
function delAssetsFiles(dir) {

    fs.readdir(dir, (err, data) => {
        if (err) {
            return;
        } else {
            data.forEach(item => {
                fs.readdir(dir + '/' + item, (err, data1) => {
                    data1.forEach(file => {
                        fs.unlink(dir + '/' + item + '/' + file, (err => {

                        }))
                    })

                })
            })
        }
    })
}

delAssetsFiles(__dirname + '/project-dist/assets/')


function recAssetsFiles(pat) {
    fs.readdir(pat, (err, data) => {
        data.forEach(item => {
            let pathTo = __dirname + '/' + 'project-dist/assets/' + item;
            let pathFrom = __dirname + '/assets/' + item;


            fs.readdir(pat + item, (err, files) => {
                // console.log(files)
                files.forEach(file => {

                    fs.readFile(pathFrom + '/' + file, (err, data) => {
                        fs.writeFile(pathTo + '/' + file, data, (err) => {})
                    })
                })
            })
        })
    })
}

setTimeout(() => recAssetsFiles(__dirname + '/assets/'), 200)

// запись template.html -> index.html
function readTemplate() {
    return new Promise((resolve) => {
        fs.readFile(__dirname + '/template.html', 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }

            fs.writeFile(__dirname + '/' + 'project-dist/index.html', data, 'utf8', function(err) {
                if (err) return console.log(err);
                resolve()
            });

        })
    })
}


readTemplate()
    .then(() => {
        return writeTemplate('{{header}}')
    })
    .then(() => {
        return writeTemplate('{{articles}}')
    })
    .then(() => {
        return writeTemplate('{{footer}}')
    })
    .then(() => {
        return writeTemplate('{{about}}')
    })


function writeTemplate(strToChange) {
    return new Promise((resolve) => {

        let link = strToChange.substring(2, strToChange.length - 2);
        fs.readFile(__dirname + '/' + 'project-dist/index.html', 'utf8', function(err, data) {
            fs.readFile(__dirname + `/components/${link}.html`, 'utf8', function(err, newstr) {

                result = data.replace(strToChange, newstr);
                fs.writeFile(__dirname + '/' + 'project-dist/index.html', result, 'utf8', function(err) {
                    if (err) return console.log(err);
                    resolve()
                });
            })

        });
    })
}
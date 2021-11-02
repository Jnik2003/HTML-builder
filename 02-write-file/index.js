const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.question('Введите текст для записи в файл (exit - выход):  \n', (userInput) => {
    if (userInput == 'exit') {
        rl.close();
    } else {
        rl.setPrompt('Добавить текст для записи в файл? (exit - выход):  \n');
        rl.prompt();
        write(userInput);
        rl.on('line', (userInput) => {
            if (userInput == 'exit') {
                rl.close();
            } else {
                rl.setPrompt('Добавить текст для записи в файл? (exit - выход):  \n');
                rl.prompt();
                write(userInput);
            }

        })
    }
});
rl.on('close', () => {
    console.log('Пока!!!')
})

function write(userInput) {
    fs.appendFile(__dirname + '/writen.txt', userInput + '\n', (err) => {
        if (err) throw err;        
    });
}
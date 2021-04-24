import logs from "./logs.js";
import getRandom from "./utils.js";

const $chat = document.querySelector('.chat');

function generateLogs(type, player1, player2, hp) {
    let text = '';
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    switch (type) {
        case 'start':
            text = logs[type].replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);
            break;
        case 'hit':
            text = logs[type][getRandom(18)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            text =`${time} ${text} - ${hp} [${player2.hp} / 100]`;
            break;
        case 'defence':
            text = logs[type][getRandom(8)].replace('[playerDefence]', player1.name).replace('[playerKick]', player2.name);
            break;
        case 'end':
            text = logs[type][getRandom(3)].replace('[playerWins]', player2.name).replace('[playerLose]', player1.name);
            break;

        case 'draw':
            text = logs[type];
            break;
    }

    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
    console.log(text);

}

export default generateLogs;
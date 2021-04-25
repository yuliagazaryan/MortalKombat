import {ATTACK, HIT, LOGS} from "../constants";
import {createElement, getRandom, getTime} from "../utils.js";
import Player from "../Player/player.js";

class Game {
start = () => {
    const $arenas = document.querySelector('.arenas');
    const $formFight = document.querySelector('.control');
    const $chat = document.querySelector('.chat');
    const player1 = new Player({
        player: 1,
        name: 'Scorpion',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        rootSelector: 'arenas',
    });
    const player2 = new Player({
        player: 2,
        name: 'Kitana',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
        rootSelector: 'arenas',
    });

    function generateLogs(type, player1, player2, hp) {
        let text = '';

        switch (type) {
            case 'start':
                text = LOGS[type].replace('[time]', getTime).replace('[player1]', player1.name).replace('[player2]', player2.name);
                break;
            case 'hit':
                text = LOGS[type][getRandom(18)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
                text =`${getTime()} ${text} - ${hp} [${player2.hp} / 100]`;
                break;
            case 'defence':
                text = LOGS[type][getRandom(8)].replace('[playerDefence]', player1.name).replace('[playerKick]', player2.name);
                break;
            case 'end':
                text = LOGS[type][getRandom(3)].replace('[playerWins]', player2.name).replace('[playerLose]', player1.name);
                break;

            case 'draw':
                text = LOGS[type];
                break;
        }

        const el = `<p>${text}</p>`;
        $chat.insertAdjacentHTML('afterbegin', el);
        console.log(text);

    }

    function createReloadButton() {
        const $reloadButtonDiv = createElement('div', 'reloadWrap');
        const $reloadButton = createElement('button', 'button');
        $reloadButton.innerText = 'Restart';
        $reloadButton.addEventListener('click', function () {
            window.location.reload();
        });

        $reloadButtonDiv.appendChild($reloadButton);
        $arenas.appendChild($reloadButtonDiv);

    }

    function playerWins(name) {
        const $loseTitle = createElement('div', 'loseTitle');
        if (name) {
            $loseTitle.innerText = name + ' wins';
        } else {
            $loseTitle.innerText = 'draw';
        }
        return $loseTitle;
    }
    function showResult() {
        if (player1.hp === 0 || player2.hp === 0) {
            createReloadButton();
        }

        if (player1.hp === 0 && player1.hp < player2.hp) {
            $arenas.appendChild(playerWins(player2.name));
            generateLogs('end', player1, player2);
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            $arenas.appendChild(playerWins(player1.name));
            generateLogs('end', player2, player1);
        } else if (player1.hp === 0 && player2.hp === 0) {
            $arenas.appendChild(playerWins());
            generateLogs('draw', player1, player2);

        }

    }


    const enemyAttack = () => {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];

        return {
            value: getRandom(HIT[hit]),
            hit,
            defence,
        }
    };

    const playerAttack = () => {
        const attack = {};

        for (let item of $formFight) {
            if (item.checked && item.name === 'hit') {
                attack.value = getRandom(HIT[item.value]);
                attack.hit = item.value;
            }

            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }

            item.checked = false;

        }

        return attack;
    };

    function init() {
        player1.createPlayer();
        player2.createPlayer();
        generateLogs('start', player1, player2);
    }

    init();

    $formFight.addEventListener('submit', function (e) {
        e.preventDefault();
        const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = enemyAttack();
        const {hit, defence, value} = playerAttack();

        if (defence !== hitEnemy) {
            player1.changeHP(valueEnemy);
            player1.renderHP();
            generateLogs('hit', player2, player1, valueEnemy);
        } else {
            generateLogs('defence', player2, player1)
        }

        if (defenceEnemy !== hit) {
            player2.changeHP(value);
            player2.renderHP();
            generateLogs('hit', player1, player2, value);
        } else {
            generateLogs('defence', player1, player2);
        }

        showResult();
    });

}
}

export default Game;
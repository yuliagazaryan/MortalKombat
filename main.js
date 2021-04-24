import { player, playerNew } from "./player.js";
import getRandom from "./utils.js";
import createElement from "./createElement.js";
import showResult from "./gameResults.js";
import generateLogs from "./generateLogs.js";

console.log(player);
console.log(playerNew);

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword'],
    elHP,
    changeHP,
    renderHP,
    attack,

};
const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['steel fans'],
    elHP,
    changeHP,
    renderHP,
    attack,

};

function attack () {
    console.log(this.name + ' ' + 'Fight...');
}

const createPlayer = (character) => {
    const $player = createElement('div', 'player' + character.player);

    const $progressbar = createElement('div', 'progressbar');
    $player.appendChild($progressbar);

    const $character = createElement('div', 'character');
    $player.appendChild($character);

    const $life = createElement('div', 'life');
    $life.style.width = character.hp + '%';
    $progressbar.appendChild($life);

    const $name = createElement('div', 'name');
    $name.innerText = character.name;
    $progressbar.appendChild($name);

    const $img = createElement('img');
    $img.src = character.img;
    $character.appendChild($img);

    return $player;
};

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

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

function changeHP(HP) {
    this.hp -= getRandom(HP);

    if (this.hp <= 0) {
        this.hp = 0;
    }
    return this.hp;
}

function elHP() {
    const $playerLife = document.querySelector('.player' + this.player + ' .life');
    return $playerLife;
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
    console.log(this.hp + '%');
    return this.player;
}


generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player2, player1)
    }

    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);
    } else  {
        generateLogs('defence', player1, player2);
    }

    showResult();
});
const $arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.button');
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

function attack() {
    console.log(this.name + ' ' + 'Fight...');
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

function getRandom(num) {
    return Math.ceil(Math.random() * num);
}

/*
$randomButton.addEventListener('click', function () {
    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));
    player1.renderHP();
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }

})
*/

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(character) {
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
}

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


//console.log(player1.changeHP(20));
//console.log(player2.changeHP(20));
//console.log(player1.elHP());
//console.log(player2.elHP());
//console.log(player1.renderHP());
//console.log(player2.renderHP());



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

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
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

    if (attack.hit === attack.defence) {
        player1.changeHP(0) && player2.changeHP(0);
    } else {
    player1.changeHP(enemy.value);
    player2.changeHP(attack.value);
    player1.renderHP();
    player2.renderHP();
    }

    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }


    console.log('###: a', attack);
    console.log('###: e', enemy);
});
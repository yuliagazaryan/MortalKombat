const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword'],
    attack: function attack() {
        console.log('Scorpion' + 'Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,

};


const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['steel fans'],
    attack: function attack() {
        console.log('Kitana' + 'Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};


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

$randomButton.addEventListener('click', function () {
    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));
    player1.renderHP();
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }

});

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
    console.log(this.hp);
    return this.player;
}


console.log(player1.changeHP(20));
console.log(player2.changeHP(20));
console.log(player1.elHP());
console.log(player2.elHP());
console.log(player1.renderHP());
console.log(player2.renderHP());



function createReloadButton() {
    const $reload = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';
    $reload.appendChild($reloadButton);
    $reloadButton.addEventListener('click', window.location.reload());

    return $reload;
}
if ($randomButton.disabled === true) {
    createReloadButton();
}
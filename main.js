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
    }
};


const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['steel fans'],
    attack: function attack() {
        console.log('Kitana' + 'Fight...');
    }
};

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

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= Math.ceil(Math.random() * (20 - 1 + 1)) + 1;

    if (player.hp <= 0) {
        player.hp = 0;
        $randomButton.disabled = true;
    }  else {
    }

    if (player2.hp === 0 && player1.hp > 0) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp > 0){
        $arenas.appendChild(playerWins(player2.name));
    } else {

    }

    $playerLife.style.width = player.hp + '%';

    console.log(player.hp);
}

function playerWins(name) {
    const $winsTitle = createElement('div', 'loseTitle');
    $winsTitle.innerText = name + ' wins';

    return $winsTitle;
}


$randomButton.addEventListener('click', function () {
   console.log('####: Click Random Button');
   changeHP(player1);
   changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
const Scorpion = {
    name: 'Scorpion',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword'],
    attack: function attack() {
        console.log('Scorpion' + 'Fight...');
    }
};


const Kitana = {
    name: 'Kitana',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['steel fans'],
    attack: function attack() {
        console.log('Kitana' + 'Fight...');
    }
};


function createPlayer(player, character) {
    const $player1 = document.createElement('div');
    $player1.classList.add(player);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    $player1.appendChild($progressbar);

    const $character = document.createElement('div');
    $character.classList.add('character');
    $player1.appendChild($character);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = '100%';
    $life.style.width = character.hp + '%';
    $progressbar.appendChild($life);

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = character.name;
    $progressbar.appendChild($name);

    const $img = document.createElement('img');
    $img.src = character.img;
    $character.appendChild($img);

    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player1);

}

createPlayer('player1', Scorpion);
createPlayer('player2', Kitana);
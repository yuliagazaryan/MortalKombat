import {createElement} from "../utils.js";

class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

     changeHP = (randomNumber) => {
        this.hp -= randomNumber;

        if (this.hp <= 0) {
            this.hp = 0;
        }
        return this.hp;
    }

     elHP = () => {
        return  document.querySelector(`.${this.selector} .life`);
    }

     renderHP = () => {
        this.elHP().style.width = this.hp + '%';
    }

     attack = () => {
        console.log(this.name + ' ' + 'Fight...');
    }

    createPlayer = () => {
        const $player = createElement('div', this.selector);

        const $progressbar = createElement('div', 'progressbar');
        $player.appendChild($progressbar);

        const $character = createElement('div', 'character');
        $player.appendChild($character);

        const $life = createElement('div', 'life');
        $life.style.width = this.hp + '%';
        $progressbar.appendChild($life);

        const $name = createElement('div', 'name');
        $name.innerText = this.name;
        $progressbar.appendChild($name);

        const $img = createElement('img');
        $img.src = this.img;
        $character.appendChild($img);

        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);
        return $player;
    };

}

export default Player;
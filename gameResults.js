import createReloadButton from "./reloadButton.js";
import generateLogs from "./generateLogs.js";
import {player, playerNew} from "./player.js";
const $arenas = document.querySelector('.arenas');


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
    if (player.hp === 0 || playerNew.hp === 0) {
        createReloadButton();
    }

    if (player.hp === 0 && player.hp < playerNew.hp) {
        $arenas.appendChild(playerWins(playerNew.name));
        generateLogs('end', player, playerNew);
    } else if (playerNew.hp === 0 && playerNew.hp < player.hp) {
        $arenas.appendChild(playerWins(player.name));
        generateLogs('end', playerNew, player);
    } else if (player.hp === 0 && playerNew.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw', player, playerNew);

    }

}

export default showResult;
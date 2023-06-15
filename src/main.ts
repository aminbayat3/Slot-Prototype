import ScreenManager from "./screens/screen-manager";
import {GameManager} from "./logic/game-manager";

const gameManager: GameManager = new GameManager();
const screenManager: ScreenManager = new ScreenManager(gameManager);

function setup():void {
    // TODO: Initialize everything that needs to be done on page load here
    screenManager.switchToTitleScreen()
}

setup();
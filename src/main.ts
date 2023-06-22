import ScreenManager from "./screens/screen-manager";
import {GameManager} from "./logic/game-manager";

const gameManager: GameManager = new GameManager();

function setup():void {
    // TODO: Initialize everything that needs to be done on page load here
    if(!gameManager.isFullyLoaded){
        setTimeout(setup,500);
    }
    else{
        const screenManager = new ScreenManager(gameManager);
        screenManager.switchToTitleScreen()
    }
}

setup();
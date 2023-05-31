import GameData from "./game-data";
import ScreenManager from "./screens/screen-manager";

const gameData: GameData = new GameData();
const screenManager: ScreenManager = new ScreenManager(gameData);

function setup():void {
    // TODO: Initialize everything that needs to be done on page load here
    screenManager.switchToInGameScreen()
}
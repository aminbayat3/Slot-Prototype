import GameData from "../models/game-data";
import Screen from "./screen";
import {GameManager} from "../logic/game-manager";

class SlotMachineScreen extends Screen{
    private static wrapperId: string = "slot-machine-screen";
    private gameManager: GameManager;

    constructor(gameManager: GameManager) {
        super(SlotMachineScreen.wrapperId);
        this.gameManager = gameManager;
    }
}

export default SlotMachineScreen;
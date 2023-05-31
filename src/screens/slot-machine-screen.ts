import Slot from "../components/slot.component";
import {resetSpinIconSets} from "../slot.utils";
import GameData from "../game-data";
import Screen from "./screen";

class SlotMachineScreen extends Screen{
    private static wrapperId: string = "slot-machine-screen";
    private slot: Slot;
    private gameData: GameData;

    constructor(gameData: GameData) {
        super(SlotMachineScreen.wrapperId);
        this.gameData = gameData;
        this.slot = new Slot(gameData);

        this.renderSlot();

        // Initalize stuff
        resetSpinIconSets();
    }

    renderSlot = () => {
        this.slot.startButton.addEventListener("click", this.slot.startSpin);
    };
}

export default SlotMachineScreen;
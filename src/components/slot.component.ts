import Component from "./base.component";
import { getIconIndexWithValue } from "../slot.utils";
import { delay } from "../slot.utils";
import Column from "./column.component";
import SlotState from "../state/slot-state";
import GameData from "../game-data";

class Slot extends Component<HTMLDivElement, HTMLDivElement>  {
    spinContainer: HTMLDivElement;
    pressedButton: HTMLDivElement;
    startButton: HTMLDivElement;
    columns: Column[];
    private initialEndSpinCount: number;
    readonly numOfColumns: number;
    private slotState: SlotState;
    private gameData: GameData;

    // constructor
    constructor(gameData: GameData) {
        super('slot-machine', 'home', false);
        this.gameData = gameData;
        this.slotState = new SlotState(gameData);
        this.initialEndSpinCount = 10; // Spin Count after which the spinning stops
        this.pressedButton = document.querySelector('.pressed-button')! as HTMLDivElement;
        this.numOfColumns = 3;
        this.spinContainer = this.element.querySelector('div')!;
        this.spinContainer.id = "spin-container";
        this.startButton = this.element.querySelector(".start-button")! as HTMLDivElement;
        this.columns = [];

        this.configure();
    }
  
    startSpin = () => {
        if (!this.slotState.getIsSpinning) {
            this.slotState.setIsSpinning = true;

            this.slotState.setGoldBalanceAfterEachSpin();

            this.startButton.style.display = 'none';
            this.pressedButton.style.display = 'block';
            delay(1900).then(() => {
                this.pressedButton.style.display = 'none';
                this.startButton.style.display = 'block';
            });
            this.slotState.setColumnsFinishedSpinning = 0;
            this.spin();
        }
    };

    configure = () => {
        for (let i = 0; i < this.numOfColumns; i++) {
            this.columns.push(new Column(this.spinContainer.id, this.slotState));
        }
    }
  
    // initiates the spinning and starts the animation loop
    spin = () => {
        console.log("Starting Spin Process.");
        console.log("Determine Outcome...");
        this.slotState.setIsWin = Math.random() < this.slotState.getWinPercentage;
        if (this.slotState.getIsWin) {
            this.slotState.setWinningIndex = getIconIndexWithValue(Math.random());
            console.log("WIN! - Nice, you get: " + this.slotState.getSpinsetItems[this.slotState.getWinningIndex].name);
        } else {
            console.log("Loss! - Better luck next time");
        }

        delay(1700).then(() => {
            this.slotState.setGoldBalanceAfterEachWin();
        });
        // let columns = document.querySelectorAll(".spin");
        for (let i = 0; i < this.numOfColumns; i++) {
            setTimeout(
                this.columns[i].spinSingleColumn,
                i * 250,
                this.columns[i].getElement.querySelectorAll(".spin-icon-set"),
                this.initialEndSpinCount + i * 3,
                i + 1 === this.numOfColumns
            );
        }
    };
}

export default Slot;
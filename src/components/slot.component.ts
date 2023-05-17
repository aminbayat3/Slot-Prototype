import { SPINSET_ITEMS } from "../slot.data";
import { resetSpinIconSetPositions, getIconIndexWithValue} from "../slot.utils";
import { slotState } from "../state/slot-state";
import { delay } from "../slot.utils";
import Column from "./column.component";

const column = new Column();

class Slot {
    pressedButton: HTMLDivElement;
    private initialEndSpinCount: number;
    private static instance: Slot;

    // constructor
    private constructor() {
      this.initialEndSpinCount = 10; // Spin Count after which the spinning stops
      this.pressedButton = document.querySelector('.pressed-button')! as HTMLDivElement;
    }
  
    static getInstance = () => {
      if(Slot.instance) {
        return this.instance;
      }
      this.instance = new Slot();
      return this.instance;
    }
  
    startSpin = () => {
      if (!slotState.getIsSpinning) {
        slotState.setIsSpinning = true;
        this.pressedButton.style.display = 'block';
        delay(1900).then(() => this.pressedButton.style.display = 'none');
        slotState.setColumnsFinishedSpinning = 0;
        this.spin();
      }
    };
  
    // initiates the spinning and starts the animation loop
    spin = () => {
      console.log("Starting Spin Process.");
      console.log("Determine Outcome...");
      slotState.setIsWin = Math.random() < slotState.getWinPercentage;
      if (slotState.getIsWin) {
        slotState.setWinningIndex = getIconIndexWithValue(Math.random());
        console.log("WIN! - Nice, you get: " +  SPINSET_ITEMS[slotState.getWinningIndex].name);
      } else {
        console.log("Loss! - Better luck next time");
      }
  
      let columns = document.querySelectorAll(".spin");
      for (let i = 0; i < columns.length; i++) {
        
        setTimeout(
          column.spinSingleColumn,
          i * 250,
          columns[i].querySelectorAll(".spin-icon-set"),
          this.initialEndSpinCount + i * 3,
          i + 1 === columns.length
        );
      }
    };
  
    resetSpinIconSets = () => {
      const spinSets = document.querySelectorAll(".spin-icon-set") as NodeListOf<HTMLDivElement>;
      column.resetSpinIconSetContents(spinSets);
      resetSpinIconSetPositions(spinSets);
      this.pressedButton.style.display = "none";
    };
  }

export default Slot;
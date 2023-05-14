import { REEL_ITEMS } from "../slot.data";
import { resetSpinIconSetPositions, getIconIndexWithValue} from "./slot.utils";
import { slotState } from "../../state/slot-state";
import Column from "../column.component";
import SpinSet from "../spinSet.component";

class Slot {
    private initialEndSpinCount: number;
    private static instance: Slot;
  
    // constructor
    private constructor() {
      this.initialEndSpinCount = 10; // Spin Count after which the spinning stops
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
        console.log(
          "WIN! - Nice, you get: " +
            REEL_ITEMS[slotState.getWinningIndex].name +
            "[" +
            REEL_ITEMS[slotState.getWinningIndex].color +
            "]"
        );
      } else {
        console.log("Loss! - Better luck next time");
      }
  
      let columns = document.querySelectorAll(".spin");
      const column = new Column();
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
      const spinSet = new SpinSet;
      spinSet.resetSpinIconSetContents(spinSets);
      resetSpinIconSetPositions(spinSets);
    };
  }

export default Slot;
import { resetSpinIconSetPositions } from "./slot/slot.utils";
import SpinSet from "./spinSet.component";
import { slotState } from "../state/slot-state";

class Column {
  private slowDownSpinCount: number;

  constructor() {
    this.slowDownSpinCount = 2; // Spin Count after which the slowdown takes place
  }

  spinSingleColumn = (
    spinSetsOfColumn: NodeListOf<HTMLDivElement>,
    endSpinCount: number,
    isLastColumn: boolean
  ) => {
    const self = this;
    const spinSet = new SpinSet();

    let distance = 35; // TODO: This has to be changed to account for time since last iteration
    let currentSpinCount = 0;
    (function loop() {
      setTimeout(() => {
        if (currentSpinCount >= endSpinCount - self.slowDownSpinCount) {
          distance = Math.max(2, distance / 1.017); // TODO: This has to be changed to account for time since last iteration
        }
        spinSetsOfColumn.forEach((set) => {
          spinSet.spinIconSet(
            set,
            distance,
            endSpinCount - currentSpinCount,
            isLastColumn
          )
            ? currentSpinCount++
            : currentSpinCount;
        });
        if (currentSpinCount >= endSpinCount) {
          resetSpinIconSetPositions(spinSetsOfColumn);
          slotState.endColumnSpin();
        } else {
          loop();
        }
      }, 0);
    })();
  };
}

export default Column;

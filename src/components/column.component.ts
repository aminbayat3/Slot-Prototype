import Component from "./base.component";
import { resetSpinIconSetPositions, spinIconSet } from "../slot.utils";
import SlotState from "../state/slot-state";

class Column extends Component<HTMLDivElement, HTMLDivElement> {
  private slowDownSpinCount: number;
  private slotState: SlotState;

  constructor(hostId: string, slotState: SlotState) {
    super('single-column', hostId, false);
    this.slotState = slotState;
    this.slowDownSpinCount = 2; // Spin Count after which the slowdown takes place
  }

  spinSingleColumn = (
    spinSetsOfColumn: NodeListOf<HTMLDivElement>,
    endSpinCount: number,
    isLastColumn: boolean
  ): void => {
    const self = this;

    let distance = 35; // TODO: This has to be changed to account for time since last iteration
    let currentSpinCount = 0;
    let currentSlotState = this.slotState;
    (function loop() {
      setTimeout(() => {
        if (currentSpinCount >= endSpinCount - self.slowDownSpinCount) {
          distance = Math.max(2, distance / 1.017); // TODO: This has to be changed to account for time since last iteration
        }
        spinSetsOfColumn.forEach((set) => {
          spinIconSet(
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
          currentSlotState.endColumnSpin();
        } else {
          loop();
        }
      }, 0);
    })();
  };
}

export default Column;

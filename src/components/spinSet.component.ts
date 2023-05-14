import { assignIcon } from "./slot/slot.utils";
import { slotState } from "../state/slot-state";

class SpinSet {
    private lastStopSetMiddleAssignment: number;

    constructor() {
        this.lastStopSetMiddleAssignment = 0;
    }

    assignIconSetIcons = (set: HTMLDivElement, isStopSet: boolean, isLastColumn: boolean) => {
        let iconElements = set.querySelectorAll(".spin-icon") as NodeListOf<HTMLDivElement>;
        iconElements.forEach((iconElement) => assignIcon(iconElement));
        if (isStopSet && slotState.getIsWin) {
          slotState.assignWinningIcon(iconElements[1]);
        } else if (isStopSet && isLastColumn) {
          // This and the following else if prevent an accidental win and can surely be implemented better in the assignment process
          let assignedIndex;
          do {
            assignedIndex = assignIcon(iconElements[1]);
          } while (this.lastStopSetMiddleAssignment === assignedIndex); // Adding/Removing could be done instead to guarantee a single execution, but this looks more random
          this.lastStopSetMiddleAssignment = assignedIndex;
        } else if (isStopSet) {
          this.lastStopSetMiddleAssignment = assignIcon(iconElements[1]);
        }
      };

          // Single Movement of Icon Set during column spinning
    spinIconSet = (set: HTMLDivElement, distance: number, spinsLeft: number, isLastColumn: boolean) => {
        let newIconsAssigned = false;
        let top = Number(set.style.top.slice(0, set.style.top.length - 2));
        let newPos = top + distance;
        if (newPos > set.offsetHeight) {
          newPos = newPos - 3 * set.offsetHeight;
          this.assignIconSetIcons(set, spinsLeft === 3, isLastColumn); // Note: 3 seems weird here, but works because of the order in which everything gets checked, might be possible to simplify though
          newIconsAssigned = true;
        }
        set.style.top = Math.floor(newPos) + "px";
        return newIconsAssigned;
      };

      resetSpinIconSetContents = (spinSets: NodeListOf<HTMLDivElement>) => {
        spinSets.forEach((set) => this.assignIconSetIcons(set, false, false));
      };
}

export default SpinSet;
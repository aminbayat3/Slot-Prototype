import SlotState from "./state/slot-state";

let lastStopSetMiddleAssignment = 0;

function getIconIndexWithValue(randomValue: number) {
  // Via this function all of the icon assignments as well as the outcome in case of a winning spin is determined
  let cumulativePercentage = 0;
  for (let i = 0; i < SlotState.instance.getSpinsetItems.length; i++) {
    cumulativePercentage += SlotState.instance.getSpinsetItems[i].percentage;
    if (randomValue < cumulativePercentage) {
      return i;
    }
  }
  return -1;
}

// Assigns a random icon
function assignIcon(element: HTMLDivElement) {
  let index = getIconIndexWithValue(Math.random());
  element.innerHTML = `<img src=${SlotState.instance.getSpinsetItems[index].src} alt=${SlotState.instance.getSpinsetItems[index].name}/>`;
  return index;
}


  // Assigns the winning icon
 function assignWinningIcon(element: HTMLDivElement) {
  console.log('Winning iNdex is: ', SlotState.instance.getWinningIndex);
    element.innerHTML = `<img src=${SlotState.instance.getSpinsetItems[SlotState.instance.getWinningIndex].src} alt=${SlotState.instance.getSpinsetItems[SlotState.instance.getWinningIndex].name}/>`;
    return SlotState.instance.getWinningIndex;
  };

function assignIconSetIcons(set: HTMLDivElement, isStopSet: boolean, isLastColumn: boolean): void {
  let iconElements = set.querySelectorAll(".spin-icon") as NodeListOf<HTMLDivElement>;
  iconElements.forEach((iconElement) => assignIcon(iconElement));
  if (isStopSet && SlotState.instance.getIsWin) {
    assignWinningIcon(iconElements[1]);
  } else if (isStopSet && isLastColumn) {
    // This and the following else if prevent an accidental win and can surely be implemented better in the assignment process
    let assignedIndex;
    do {
      assignedIndex = assignIcon(iconElements[1]);
    } while (lastStopSetMiddleAssignment === assignedIndex); // Adding/Removing could be done instead to guarantee a single execution, but this looks more random
    lastStopSetMiddleAssignment = assignedIndex;
  } else if (isStopSet) {
    lastStopSetMiddleAssignment = assignIcon(iconElements[1]);
  }
};

// Single Movement of Icon Set during column spinning
function spinIconSet(set: HTMLDivElement, distance: number, spinsLeft: number, isLastColumn: boolean): boolean {
  let newIconsAssigned = false;
  let top = Number(set.style.top.slice(0, set.style.top.length - 2));
  let newPos = top + distance;
  if (newPos > set.offsetHeight) {
    newPos = newPos - 3 * set.offsetHeight;
    assignIconSetIcons(set, spinsLeft === 3, isLastColumn); // Note: 3 seems weird here, but works because of the order in which everything gets checked, might be possible to simplify though
    newIconsAssigned = true;
  }
  set.style.top = Math.floor(newPos) + "px";
  return newIconsAssigned;
};

//utility functions
function resetSpinIconSetPositions(spinSets: NodeListOf<HTMLDivElement>) {
  for (let i = 0; i < spinSets.length; i++) {
    if (i % 3 === 0) {
      spinSets[i].style.top = -spinSets[i].offsetHeight + "px";
    } else if (i % 3 === 2) {
      spinSets[i].style.top = spinSets[i].offsetHeight + "px";
    } else {
      spinSets[i].style.top = 0 + "px";
    }
  }
}

function resetSpinIconSetContents(spinSets: NodeListOf<HTMLDivElement>) {
  spinSets.forEach((set) => assignIconSetIcons(set, false, false));
};

function resetSpinIconSets(): void {
  const spinSets = document.querySelectorAll(".spin-icon-set") as NodeListOf<HTMLDivElement>;
  resetSpinIconSetContents(spinSets);
  resetSpinIconSetPositions(spinSets);
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { resetSpinIconSetPositions, resetSpinIconSets, getIconIndexWithValue, assignIcon, spinIconSet, delay };

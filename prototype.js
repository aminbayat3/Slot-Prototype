const startButton = document.querySelector(".start-button");

const REEL_ITEMS = [
  {
    name: "item1",
    color: "cyan",
    percentage: 0.05,
  },

  {
    name: "item2",
    color: "blue",
    percentage: 0.05,
  },

  {
    name: "item3",
    color: "darkblue",
    percentage: 0.05,
  },

  {
    name: "Route1",
    color: "violet",
    percentage: 0.1,
  },

  {
    name: "Route2",
    color: "purple",
    percentage: 0.1,
  },

  {
    name: "a few coins",
    color: "orange",
    percentage: 0.5,
  },

  {
    name: "many coins",
    color: "yellow",
    percentage: 0.15,
  },
];
//utility

function resetSpinIconSetPositions(spinSets) {
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

function getIconIndexWithValue(randomValue) {
  // Via this function all of the icon assignments as well as the outcome in case of a winning spin is determined
  let cumulativePercentage = 0;
  for (let i = 0; i < REEL_ITEMS.length; i++) {
    cumulativePercentage += REEL_ITEMS[i].percentage;
    if (randomValue < cumulativePercentage) {
      return i;
    }
  }
  return -1;
}

// Assigns a random icon
function assignIcon(element) {
  let index = getIconIndexWithValue(Math.random());
  element.style.backgroundColor = REEL_ITEMS[index].color;
  return index;
}

class Slot {
  constructor() {
    this.isSpinning = false; // used to prevent further spinnings
    this.isWin = false; // determines if the player wins (-> middle object icon of the spin icon set on which the spinning stops will be swapped with the correct icon)
    this.winningIndex = 0; // Color for this prototype, will most likely be some sort of object that contains a reference image
    this.initialEndSpinCount = 10; // Spin Count after which the spinning stops
    this.slowDownSpinCount = 2; // Spin Count after which the slowdown takes place
    this.columnsFinishedSpinning = 0;
    this.lastStopSetMiddleAssignment = 0;
    this.winPercentage = 0.5; // ~every 2nd spin should be a win
  }

  startSpin = () => {
    if (!this.isSpinning) {
      this.isSpinning = true;
      this.columnsFinishedSpinning = 0;
      this.spin();
    }
  };

  // Assigns the winning icon
  assignWinningIcon = (element) => {
    element.style.backgroundColor = REEL_ITEMS[this.winningIndex].color;
    return this.winningIndex;
  };

  assignIconSetIcons = (set, isStopSet, isLastColumn) => {
    let iconElements = set.querySelectorAll(".spin-icon");
    iconElements.forEach((iconElement) => assignIcon(iconElement));
    if (isStopSet && this.isWin) {
      this.assignWinningIcon(iconElements[1]);
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
  spinIconSet = (set, distance, spinsLeft, isLastColumn) => {
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

  showEndScreen = () => {
    // TODO: Display whatever we need after a spin
  };

  // Activates the possibility to spin again
  endColumnSpin = () => {
    this.columnsFinishedSpinning++;
    if (this.columnsFinishedSpinning >= 3) {
      this.showEndScreen();
      this.isSpinning = false;
    }
  };

  spinSingleColumn = (spinSetsOfColumn, endSpinCount, isLastColumn) => {
    const self = this;

    let distance = 35; // TODO: This has to be changed to account for time since last iteration
    let currentSpinCount = 0;
    (function loop() {
      setTimeout(() => {
        if (currentSpinCount >= endSpinCount - self.slowDownSpinCount) {
          distance = Math.max(2, distance / 1.017); // TODO: This has to be changed to account for time since last iteration
        }
        spinSetsOfColumn.forEach((set) => {
          self.spinIconSet(
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
          self.endColumnSpin();
        } else {
          loop();
        }
      }, 0);
    })();
  };

  // initiates the spinning and starts the animation loop
  spin = () => {
    console.log("Starting Spin Process.");
    console.log("Determine Outcome...");
    this.isWin = Math.random() < this.winPercentage;
    if (this.isWin) {
      this.winningIndex = getIconIndexWithValue(Math.random());
      console.log(
        "WIN! - Nice, you get: " +
          REEL_ITEMS[this.winningIndex].name +
          "[" +
          REEL_ITEMS[this.winningIndex].color +
          "]"
      );
    } else {
      console.log("Loss! - Better luck next time");
    }

    let columns = document.querySelectorAll(".spin");
    for (let i = 0; i < columns.length; i++) {
      setTimeout(
        this.spinSingleColumn,
        i * 250,
        columns[i].querySelectorAll(".spin-icon-set"),
        this.initialEndSpinCount + i * 3,
        i + 1 === columns.length
      );
    }
  };

  resetSpinIconSetContents = (spinSets) => {
    spinSets.forEach((set) => this.assignIconSetIcons(set, false, false));
  };

  resetSpinIconSets = () => {
    let spinSets = document.querySelectorAll(".spin-icon-set");
    this.resetSpinIconSetContents(spinSets);
    resetSpinIconSetPositions(spinSets);
  };
}

let slot = new Slot();
// Initalize stuff
slot.resetSpinIconSets();

startButton.addEventListener("click", slot.startSpin);

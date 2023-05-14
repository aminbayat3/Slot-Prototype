import { REEL_ITEMS } from "../slot.data";

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
  
  function getIconIndexWithValue(randomValue: number) {
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
  function assignIcon(element: HTMLDivElement) {
    let index = getIconIndexWithValue(Math.random());
    element.style.backgroundColor = REEL_ITEMS[index].color;
    return index;
  }

  export {resetSpinIconSetPositions, getIconIndexWithValue, assignIcon};
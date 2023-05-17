import { slotState } from "./state/slot-state";

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
  for (let i = 0; i < slotState.getSpinsetItems.length; i++) {
    cumulativePercentage += slotState.getSpinsetItems[i].percentage;
    if (randomValue < cumulativePercentage) {
      return i;
    }
  }
  return -1;
}

// Assigns a random icon
function assignIcon(element: HTMLDivElement) {
  let index = getIconIndexWithValue(Math.random());
  element.innerHTML = `<img src=${slotState.getSpinsetItems[index].src} alt=${slotState.getSpinsetItems[index].name}/>`;
  return index;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function handleMenuButtonClick() {
  const sidebar = document.querySelector('.sidebar')! as HTMLDivElement;
  if(sidebar.classList[1]) {
    sidebar.classList.remove('inactive');
  }
  sidebar.classList.add('active');
}

function handleCrossButtonClick() {
  const sidebar = document.querySelector('.sidebar')! as HTMLDivElement;
  sidebar.classList.add('inactive');
  sidebar.classList.remove('active');
}

export { resetSpinIconSetPositions, getIconIndexWithValue, assignIcon, delay, handleMenuButtonClick, handleCrossButtonClick };

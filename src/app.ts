import Slot from "./components/slot/slot.component";

const startButton = document.querySelector(".start-button")! as HTMLButtonElement;

const slot = Slot.getInstance();
// Initalize stuff
slot.resetSpinIconSets();

startButton.addEventListener("click", slot.startSpin);

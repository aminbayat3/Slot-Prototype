import Slot from "./components/slot.component";
import { handleMenuButtonClick, handleCrossButtonClick } from "./slot.utils";

import "./main.scss";

const startButton = document.querySelector(".start-button")! as HTMLDivElement;
const menuButton = document.querySelector(".menu-button")! as HTMLImageElement;
const crossButton = document.querySelector('.cross')! as HTMLImageElement;
const slot = Slot.getInstance();

// Initalize stuff
slot.resetSpinIconSets();

startButton.addEventListener("click", slot.startSpin);
menuButton.addEventListener("click", handleMenuButtonClick);
crossButton.addEventListener("click", handleCrossButtonClick);
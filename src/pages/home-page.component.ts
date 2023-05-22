import Slot from "../components/slot.component";
import { resetSpinIconSets } from "../slot.utils";
import Page from "./base-page.component";
import { PAGE_TYPE } from "./base-page.component";

import "../main.scss";

class Home extends Page {
  private static instance: Home;
  private slot: Slot;

  constructor() {
    super(PAGE_TYPE.home);
    this.slot = Slot.getInstance();

    this.configure();
    this.renderSlot();

    // Initalize stuff
    resetSpinIconSets();
  }

  static getInstance = () => {
    if (Home.instance) {
      return this.instance;
    }
    this.instance = new Home();
    return this.instance;
  };

  renderSlot = () => {
    this.slot.startButton.addEventListener("click", this.slot.startSpin);
  };
}

const home = Home.getInstance();

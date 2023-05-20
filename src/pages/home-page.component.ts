import Slot from "../components/slot.component";
import Nav from "../components/nav.component";
import Sidebar from "../components/sidebar.component";
import {
  resetSpinIconSets,
  handleMenuButtonClick,
  handleCrossButtonClick,
} from "../slot.utils";

import "../main.scss";

class Home {
  private static instance: Home;
  private nav: Nav;
  private sidebar: Sidebar;
  private slot: Slot;

  constructor() {
    this.nav = new Nav('home');
    this.sidebar = new Sidebar('home');
    this.slot = Slot.getInstance();

    this.configure();
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

  configure = () => {
    this.slot.startButton.addEventListener("click", this.slot.startSpin);
    this.nav.menuButton.addEventListener("click", handleMenuButtonClick);
    this.sidebar.crossButton.addEventListener("click", handleCrossButtonClick);
  };
}

Home.getInstance();

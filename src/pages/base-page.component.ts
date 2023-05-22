import Nav from "../components/nav.component";
import Sidebar from "../components/sidebar.component";
import { handleCrossButtonClick, handleMenuButtonClick } from "../slot.utils";

export enum PAGE_TYPE {
  home = "home",
  shop = "shop",
  inventory = "inventory",
}

abstract class Page {
  private nav: Nav;
  private sidebar: Sidebar;

  constructor(page: PAGE_TYPE) {
    this.nav = new Nav(page);
    this.sidebar = new Sidebar(page);
  }

  configure = () => {
    this.nav.menuButton.addEventListener("click", handleMenuButtonClick);
    this.sidebar.crossButton.addEventListener("click", handleCrossButtonClick);
  };
}

export default Page;

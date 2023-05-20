import Nav from "../components/nav.component";
import Sidebar from "../components/sidebar.component";
import { handleMenuButtonClick, handleCrossButtonClick } from "../slot.utils";

class Shop {
    private static instance: Shop;
    private nav: Nav;
    private sidebar: Sidebar;

    constructor() {
        this.nav = new Nav('shop');
        this.sidebar = new Sidebar('shop');

        this.configure();
    }  
    
    static getInstance = () => {
        if (Shop.instance) {
          return this.instance;
        }
        this.instance = new Shop();
        return this.instance;
      };
    
    configure = () => {
        this.nav.menuButton.addEventListener("click", handleMenuButtonClick);
        this.sidebar.crossButton.addEventListener("click", handleCrossButtonClick);
    }
}

Shop.getInstance();
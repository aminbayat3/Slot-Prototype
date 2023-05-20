import Nav from "../components/nav.component";
import Sidebar from "../components/sidebar.component";
import { handleMenuButtonClick, handleCrossButtonClick } from "../slot.utils";

class Inventory {
    private static instance: Inventory;
    private nav: Nav;
    private sidebar: Sidebar;

    constructor() {
        this.nav = new Nav('inventory');
        this.sidebar = new Sidebar('inventory');

        this.configure();
    }  
    
    static getInstance = () => {
        if (Inventory.instance) {
          return this.instance;
        }
        this.instance = new Inventory();
        return this.instance;
      };
    
    configure = () => {
        this.nav.menuButton.addEventListener("click", handleMenuButtonClick);
        this.sidebar.crossButton.addEventListener("click", handleCrossButtonClick);
    }
}

Inventory.getInstance();
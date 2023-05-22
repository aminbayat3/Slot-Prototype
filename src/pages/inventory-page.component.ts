import Page from "./base-page.component";
import { PAGE_TYPE } from "./base-page.component";

class Inventory extends Page {
    private static instance: Inventory;

    constructor() {
      super(PAGE_TYPE.inventory);
        this.configure();
    }  
    
    static getInstance = () => {
        if (Inventory.instance) {
          return this.instance;
        }
        this.instance = new Inventory();
        return this.instance;
      };
}

Inventory.getInstance();
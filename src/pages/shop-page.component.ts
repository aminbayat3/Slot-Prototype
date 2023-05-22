import Page from "./base-page.component";

import { PAGE_TYPE } from "./base-page.component";

class Shop extends Page {
    private static instance: Shop;

    constructor() {
      super(PAGE_TYPE.shop);

        this.configure();
    }  
    
    static getInstance = () => {
        if (Shop.instance) {
          return this.instance;
        }
        this.instance = new Shop();
        return this.instance;
      };
}

 Shop.getInstance();
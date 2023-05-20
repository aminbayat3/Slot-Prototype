import Component from "./base.component";

class Nav extends Component<HTMLDivElement, HTMLDivElement> {
    menuButton: HTMLImageElement;
    private static instance: Nav;
    
    constructor() {
        super('navbar', 'home', true);
        this.menuButton = this.element.querySelector(".menu-button")! as HTMLImageElement;
    }

    static getInstance = () => {
        if(Nav.instance) {
          return this.instance;
        }
        this.instance = new Nav();
        return this.instance;
      }
}

export default Nav;
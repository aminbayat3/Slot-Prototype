import Component from "./base.component";

class Nav extends Component<HTMLDivElement, HTMLDivElement> {
    menuButton: HTMLImageElement;
    
    constructor(hostId: string) {
        super('navbar', hostId, true);
        this.menuButton = this.element.querySelector(".menu-button")! as HTMLImageElement;
    }
}

export default Nav;
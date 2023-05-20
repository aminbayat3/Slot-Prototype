import Component from "./base.component";

class Sidebar extends Component<HTMLDivElement, HTMLDivElement> {
    crossButton: HTMLImageElement;
    private static instance: Sidebar;

    constructor() {
        super('side', 'home', false);
        this.crossButton = this.element.querySelector('.exit')! as HTMLImageElement;
    }

    static getInstance = () => {
        if(Sidebar.instance) {
          return this.instance;
        }
        this.instance = new Sidebar();
        return this.instance;
      }
}

export default Sidebar;
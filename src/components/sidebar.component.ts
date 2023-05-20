import Component from "./base.component";

class Sidebar extends Component<HTMLDivElement, HTMLDivElement> {
    crossButton: HTMLImageElement;

    constructor(hostId: string) {
        super('side', hostId, false);
        this.crossButton = this.element.querySelector('.exit')! as HTMLImageElement;
    }
}

export default Sidebar;
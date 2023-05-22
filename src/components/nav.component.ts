import Component from "./base.component";
import { slotState } from "../state/slot-state";

class Nav extends Component<HTMLDivElement, HTMLDivElement> {
    menuButton: HTMLImageElement;
    balance: HTMLSpanElement;
    
    constructor(hostId: string) {
        super('navbar', hostId, true);
        this.menuButton = this.element.querySelector(".menu-button")! as HTMLImageElement;
        this.balance = this.element.querySelector('.gold-balance')! as HTMLSpanElement;

        this.configure();
    }

    configure = () => {
        this.balance.innerText = `${slotState.goldBalance}`;
        slotState.addListener((goldBalance: number) => {
            this.balance.innerText = `${goldBalance}`;
        })
    }
}

export default Nav;
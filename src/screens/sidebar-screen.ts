import Screen from "./screen";
import ScreenManager from "./screen-manager";

class SidebarScreen extends Screen{
    private static wrapperId: string = "sidebar-screen";
    private screenManager: ScreenManager;
    isOpen: boolean = false;
    isInteractable: boolean = true;

    sidebarWrapper: HTMLDivElement;
    showButton: HTMLDivElement;
    hideButton: HTMLDivElement;

    titleOption: HTMLSpanElement;
    storyOption: HTMLSpanElement;
    slotMachineOption: HTMLSpanElement;
    shopOption: HTMLSpanElement;
    inventoryOption: HTMLSpanElement;

    constructor(screenManager: ScreenManager){
        super(SidebarScreen.wrapperId);
        this.screenManager = screenManager;
        this.sidebarWrapper = this.screenWrapper.querySelector("#sidebar-wrapper")! as HTMLDivElement;
        this.showButton = this.screenWrapper.querySelector("#show-sidebar-button")! as HTMLDivElement;
        this.hideButton = this.screenWrapper.querySelector("#hide-sidebar-button")! as HTMLDivElement;
        this.showButton.addEventListener("click", () => this.handleShow());
        this.hideButton.addEventListener("click", () => this.handleHide());

        this.titleOption = this.screenWrapper.querySelector("#sidebar-option-title")! as HTMLSpanElement;
        this.storyOption = this.screenWrapper.querySelector("#sidebar-option-story")! as HTMLSpanElement;
        this.slotMachineOption = this.screenWrapper.querySelector("#sidebar-option-slot-machine")! as HTMLSpanElement;
        this.shopOption = this.screenWrapper.querySelector("#sidebar-option-shop")! as HTMLSpanElement;
        this.inventoryOption = this.screenWrapper.querySelector("#sidebar-option-inventory")! as HTMLSpanElement;

        this.titleOption.addEventListener("click", () => screenManager.switchToTitleScreen());
        this.storyOption.addEventListener("click", () => screenManager.switchToInGameScreen());
        this.slotMachineOption.addEventListener("click", () => screenManager.switchToSlotMachineScreen());
        this.shopOption.addEventListener("click", () => screenManager.switchToShopScreen());
        this.inventoryOption.addEventListener("click", () => screenManager.switchToInventoryScreen());
    }

    private handleShow(): void{
        if(!this.isOpen && this.isInteractable){
            this.sidebarWrapper.classList.remove("hide-sidebar");
            this.sidebarWrapper.classList.add("show-sidebar");
            this.showButton.classList.add("not-active");
            this.hideButton.classList.remove("not-active");
            this.isOpen = true;
        }
    }

    private handleHide(): void{
        if(this.isOpen && this.isInteractable){
            this.sidebarWrapper.classList.remove("show-sidebar");
            this.sidebarWrapper.classList.add("hide-sidebar");
            this.hideButton.classList.add("not-active");
            this.showButton.classList.remove("not-active");
            this.isOpen = false;
        }
    }
}

export default SidebarScreen;
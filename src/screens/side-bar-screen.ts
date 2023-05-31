import Screen from "./screen";
import ScreenManager from "./screen-manager";
import screenManager from "./screen-manager";

class SidebarScreen extends Screen{
    private static wrapperId: string = "side-bar-wrapper";
    private screenManager: ScreenManager;
    isShown: boolean = false;
    isInteractable: boolean = true;

    sidebarElement: HTMLDivElement;
    showButton: HTMLImageElement;
    hideButton: HTMLImageElement;

    titleOption: HTMLSpanElement;
    storyOption: HTMLSpanElement;
    slotMachineOption: HTMLSpanElement;
    shopOption: HTMLSpanElement;
    inventoryOption: HTMLSpanElement;

    constructor(screenManager: ScreenManager){
        super(SidebarScreen.wrapperId);
        this.screenManager = screenManager;
        this.sidebarElement = this.screenWrapper.querySelector("#side-bar")! as HTMLDivElement;
        this.showButton = this.screenWrapper.querySelector("#show-sidebar-button")! as HTMLImageElement;
        this.hideButton = this.screenWrapper.querySelector("#hide-sidebar-button")! as HTMLImageElement;
        this.showButton.addEventListener("click", this.handleShow);
        this.hideButton.addEventListener("click", this.handleHide);

        this.titleOption = this.screenWrapper.querySelector("#side-bar-option-title")! as HTMLSpanElement;
        this.storyOption = this.screenWrapper.querySelector("#side-bar-option-story")! as HTMLSpanElement;
        this.slotMachineOption = this.screenWrapper.querySelector("#side-bar-option-slot-machine")! as HTMLSpanElement;
        this.shopOption = this.screenWrapper.querySelector("#side-bar-option-shop")! as HTMLSpanElement;
        this.inventoryOption = this.screenWrapper.querySelector("#side-bar-option-inventory")! as HTMLSpanElement;

        this.titleOption.addEventListener("click", screenManager.switchToTitleScreen);
        this.storyOption.addEventListener("click", screenManager.switchToInGameScreen);
        this.slotMachineOption.addEventListener("click", screenManager.switchToSlotMachineScreen);
        this.shopOption.addEventListener("click", screenManager.switchToShopScreen);
        this.inventoryOption.addEventListener("click", screenManager.switchToInventoryScreen);
    }

    private handleShow(): void{
        if(!this.isShown && this.isInteractable){
            this.sidebarElement.classList.remove("not-active");
        }
    }

    private handleHide(): void{
        if(this.isShown && this.isInteractable){
            this.sidebarElement.classList.add("not-active");
        }
    }
}

export default SidebarScreen;
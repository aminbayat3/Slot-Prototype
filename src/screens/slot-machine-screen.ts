import Screen from "./screen";
import {GameManager} from "../logic/game-manager";
import {Buff} from "../models/items/buff";
import {Item} from "../models/items/item";
import {SlotMachine} from "../logic/slot-machine";

class SlotMachineScreen extends Screen{
    private static wrapperId: string = "slot-machine-screen";
    private gameManager: GameManager;
    private slotMachine: SlotMachine;

    private buffElements: HTMLCollectionOf<HTMLImageElement>;
    private buffsActivated:boolean[];
    private buffs:Buff[];

    private buttonElement: HTMLImageElement;
    private buttonClickElement: HTMLDivElement;

    private rewardPopUpElement : HTMLDivElement;
    private rewardImageElement : HTMLImageElement;
    private rewardTitleElement : HTMLDivElement;
    private rewardButtonElement : HTMLDivElement;

    private buttonPressed = false;
    private spinningCost: number = 5;

    constructor(gameManager: GameManager) {
        super(SlotMachineScreen.wrapperId);
        this.gameManager = gameManager;
        this.buffElements = this.screenWrapper.getElementsByClassName("buff")! as HTMLCollectionOf<HTMLImageElement>;
        for (let i = 0; i < this.buffElements.length; i++){
            this.buffElements[i].addEventListener("click", () => this.toggleBuff(i));
        }
        this.buffsActivated = [false,false,false];
        this.buffs = [];

        this.buttonElement = document.getElementById("slot-machine-button")! as HTMLImageElement;
        this.buttonClickElement = document.getElementById("slot-machine-button-click-area")! as HTMLDivElement;
        this.buttonClickElement.addEventListener("click",() => this.startSpinning());
        this.buttonClickElement.addEventListener("keydown", (event) => {if(event.keyCode === 32)this.startSpinning()});

        this.rewardPopUpElement = document.getElementById("reward-pop-up")! as HTMLDivElement;
        this.rewardImageElement = document.getElementById("reward-image")! as HTMLImageElement;
        this.rewardTitleElement = document.getElementById("reward-title")! as HTMLDivElement;
        this.rewardButtonElement = document.getElementById("reward-button")! as HTMLDivElement;

        this.slotMachine = new SlotMachine(this,this.gameManager);
        this.loadBuffs();
    }

    public showScreen(show: boolean) {
        super.showScreen(show);
        if(show){
            this.loadBuffs();
            this.buttonClickElement.focus();
        }
    }

    loadBuffs(){
        let buffCount = 0;
        this.buffs = [];
        this.buffsActivated = [false,false,false];
        for (let element of this.buffElements){
            element.src = "";
            element.classList.add("not-active");
        }
        for (let slot of this.gameManager.gameData.inventory){
            if(slot.item instanceof Buff){
                this.buffs.push(slot.item);
                this.buffElements[buffCount].src = slot.item.src;
                this.buffElements[buffCount].classList.remove("not-active");
                buffCount++;
            }
        }
    }

    toggleBuff(index: number){
        if(!this.buttonPressed){
            if(this.buffsActivated[index]){
                this.buffElements[index].src = this.buffs[index].src;
            }
            else{
                this.buffElements[index].src = this.buffs[index].srcActive;
            }
            this.buffsActivated[index] = !this.buffsActivated[index];
        }
    }

    public startSpinning(){
        if(!this.buttonPressed && this.gameManager.removeCoins(this.spinningCost)){
            let activeBuffs: Buff[] = [];
            for (let i = 0; i < this.buffs.length; i++){
                if(this.buffsActivated[i]){
                    activeBuffs.push(this.buffs[i]);
                    this.gameManager.useItem(this.buffs[i]);
                }
            }
            this.slotMachine.startSpinning(activeBuffs);
            this.setButtonPressed(true);
        }
    }

    public endSpinningProcess(hasWon:boolean, item?: Item, amount?: number){
        if(hasWon){
            if(item !== undefined){
                this.loadPopUp(item,undefined);
            }
            else if(amount !== undefined){
                this.loadPopUp(undefined,amount);
            }
            else{
                this.setButtonPressed(false);
            }
        }else{
            this.setButtonPressed(false);
            this.loadBuffs();
        }
    }

    setButtonPressed(pressed: boolean){
        this.buttonPressed = pressed;
        if(this.buttonPressed){
            this.buttonElement.src = "public/images/ui/slot-machine/button_pressed.png"
        }
        else{
            this.buttonElement.src = "public/images/ui/slot-machine/button.png"
        }
    }

    loadPopUp(item?: Item, amount?: number){
        let copy = this.rewardButtonElement.cloneNode(true)! as HTMLDivElement;
        this.rewardButtonElement.replaceWith(copy);
        this.rewardButtonElement = copy;
        let src: string = "", text: string = "";
        if(item !== undefined){
            src = item.src;
            text = item.name;
            this.rewardButtonElement.addEventListener("click",(event) => {
                event.stopPropagation();
                this.hidePopUp();
                this.gameManager.addItemToInventory(item);
                this.loadBuffs();
                this.setButtonPressed(false);
            })
        }
        else if(amount !== undefined){
            src = "public/images/items/coin.png";
            text = amount + " Coins";
            this.rewardButtonElement.addEventListener("click",(event) => {
                event.stopPropagation();
                this.hidePopUp();
                this.gameManager.addCoins(amount);
                this.loadBuffs();
                this.setButtonPressed(false);
            })
        }
        this.rewardImageElement.src = src;
        this.rewardTitleElement.innerHTML = text;
        this.rewardPopUpElement.classList.remove("not-active");
    }

    hidePopUp(){
        this.rewardPopUpElement.classList.add("not-active");
    }
}

export default SlotMachineScreen;
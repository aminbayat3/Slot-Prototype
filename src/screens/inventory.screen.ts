import Screen from "./screen";
import {GameManager} from "../logic/game-manager";
import {Item} from "../models/items/item";

class InventoryScreen extends Screen{
    private static wrapperId: string = "inventory-screen";

    private gameManager: GameManager;
    private listElements: HTMLCollectionOf<HTMLDivElement>;

    private detailImgElement: HTMLImageElement;
    private detailTitleElement: HTMLDivElement;
    private detailTextElement: HTMLDivElement;
    private detailValueElement: HTMLDivElement;
    private detailButtonElement: HTMLDivElement;

    constructor(gameManager: GameManager) {
        super(InventoryScreen.wrapperId);
        this.gameManager = gameManager;
        this.listElements = this.screenWrapper.getElementsByClassName("item-list-element-wrapper")! as HTMLCollectionOf<HTMLDivElement>;
        for(let i = 0; i < this.listElements.length; i++){
            this.listElements[i].addEventListener("click",() => this.selectSlot(i))
        }

        this.detailImgElement = this.screenWrapper.getElementsByClassName("item-detail-image")![0] as HTMLImageElement;
        this.detailTitleElement = this.screenWrapper.getElementsByClassName("item-detail-title")![0] as HTMLImageElement;
        this.detailTextElement = this.screenWrapper.getElementsByClassName("item-detail-text")![0] as HTMLImageElement;
        this.detailValueElement = this.screenWrapper.getElementsByClassName("item-detail-value")![0] as HTMLImageElement;
        this.detailButtonElement = this.screenWrapper.getElementsByClassName("item-detail-button")![0] as HTMLDivElement;
    }

    showScreen(show: boolean): void {
        super.showScreen(show);
        this.loadInventory();
    }

    loadInventory(): void{
        this.clearSelection();
        for (let i = 0; i < this.listElements.length; i++){
            let src: string = "", counter: string = "";
            if(i < this.gameManager.gameData.inventory.length){
                src = this.gameManager.gameData.inventory[i].item.src;
                counter = "" + this.gameManager.gameData.inventory[i].amount;
            }
            this.listElements[i].children[0].setAttribute("src",src);
            this.listElements[i].children[1].innerHTML = counter;
        }
    }

    removeSelectedTags(){
        for(let element of this.listElements){
            element.classList.remove("selected");
        }
    }

    clearSelection(): void{
        this.removeSelectedTags();
        this.setDetails();
    }

    setDetails(item?: Item){
        let src: string = "", title: string = "", text: string = "", value: string = "";

        let buttonCopy = this.detailButtonElement.cloneNode(true) as HTMLDivElement;
        this.detailButtonElement.replaceWith(buttonCopy);
        this.detailButtonElement = buttonCopy;

        if(item !== undefined){
            src = item.src;
            title = item.name;
            text = item.description;
            value = "" + item.value;
            this.detailButtonElement.addEventListener("click", () => this.sellItem(item));
        }
        this.detailImgElement.src = src;
        this.detailTitleElement.innerHTML = title;
        this.detailTextElement.innerHTML = text;
        this.detailValueElement.innerHTML = value;

    }

    selectSlot(index: number){
        if(index < this.gameManager.gameData.inventory.length){
            this.removeSelectedTags();
            this.listElements[index].classList.add("selected");
            this.setDetails(this.gameManager.gameData.inventory[index].item);
        }
    }

    sellItem(item: Item){
        this.gameManager.sellItem(item);
        this.loadInventory();
    }
}

export default InventoryScreen;
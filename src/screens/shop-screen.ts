import Screen from "./screen";
import {Item} from "../models/items/item";
import {GameManager} from "../logic/game-manager";
import {Buff} from "../models/items/buff";

class ShopScreen extends Screen{
    private static wrapperId: string = "shop-screen";

    popUpElement:HTMLDivElement;
    popUpImage:HTMLImageElement;
    popUpButton:HTMLDivElement;
    popUpTitle:HTMLDivElement;
    popUpText:HTMLDivElement;

    gameManager: GameManager;
    constructor(gameManager: GameManager) {
        super(ShopScreen.wrapperId);
        this.gameManager = gameManager;

        this.popUpElement = document.getElementById("shop-pop-up")! as HTMLDivElement;
        this.popUpImage = document.getElementById("shop-pop-up-image")! as HTMLImageElement;
        this.popUpTitle = document.getElementById("shop-pop-up-title")! as HTMLDivElement;
        this.popUpText = document.getElementById("shop-pop-up-text")! as HTMLDivElement;
        this.popUpButton = document.getElementById("shop-pop-up-button")! as HTMLDivElement;
        this.popUpElement.addEventListener("click", () => this.hidePopUp())
        this.loadStoreItems();
    }

    hidePopUp(){
        this.popUpElement.classList.add("not-active");
    }

    inspectItem(item: Item){
        this.popUpElement.classList.remove("not-active");
        let copy: HTMLDivElement = this.popUpButton.cloneNode(true) as HTMLDivElement;
        this.popUpButton.replaceWith(copy);
        this.popUpButton = copy;
        this.popUpButton.innerHTML = "" + item.value;
        this.popUpImage.src = item.src;
        this.popUpTitle.innerHTML = item.name;
        this.popUpText.innerHTML = item.description;
        this.popUpButton.addEventListener("click",() => this.buyItem(item));
    }

    buyItem(item: Item){
        if(this.gameManager.balance.value > item.value){
            this.gameManager.addItemToInventory(item);
            this.hidePopUp();
        }
        else{
            // Error sound?
        }
    }

    loadStoreItems(){
        let loadedBuffs = 0;
        let loadedValuables = 0;
        let maxItemsPerRow = 4;
        for (let item of this.gameManager.items){
            if(item.value > 0){
                let wrapper;
                if(item instanceof Buff){
                    wrapper = document.getElementById("buff-shelf")!.getElementsByClassName("shop-item-wrapper")[loadedBuffs++];
                }
                else{
                    wrapper = document.getElementById((loadedValuables > maxItemsPerRow)?"val-shelf-1":"val-shelf-2")!.getElementsByClassName("shop-item-wrapper")[loadedValuables%4];
                    loadedValuables++;
                }
                wrapper.getElementsByClassName("shop-item-image")[0].setAttribute("src",item.src);
                wrapper.getElementsByClassName("shop-item-price-tag")[0].innerHTML =  "" + item.value;
                wrapper.addEventListener("click", () => this.inspectItem(item));
            }
        }
    }

}

export default ShopScreen;
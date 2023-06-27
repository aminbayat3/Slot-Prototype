import GameData from "../models/game-data";
import {ObservedNumber} from "../models/observed-number";
import {DialogueManager} from "./dialogue-manager";
import {Item} from "../models/items/item";
import {Buff} from "../models/items/buff";
import {InventorySlot} from "../models/inventory-slot";

export class GameManager{
    gameData: GameData;
    balance: ObservedNumber;
    items: Item[];
    isFullyLoaded: boolean;

    constructor() {
        this.gameData = new GameData();
        this.balance = new ObservedNumber(this.gameData.balance);
        this.items = [];
        this.isFullyLoaded = false;
        this.loadItems();
    }

    private setBalance(amount: number){
        this.gameData.balance = amount;
        this.balance.value = this.gameData.balance;
    }

    public addCoins(amount: number){
        this.setBalance(this.gameData.balance-(-amount));
    }

    public removeCoins(amount: number): boolean{
        if(amount <= this.gameData.balance){
            this.setBalance(this.gameData.balance-amount)
            return true;
        }
        return false;
    }

    public addItemToInventory(item: Item){
        for (let slot of this.gameData.inventory){
            if(slot.item.id === item.id){
                slot.amount++;
                return;
            }
        }
        this.gameData.inventory.push(new InventorySlot(item,1));
    }

    private removeItemFromInventory(item: Item): boolean{
        for(let i = 0; i < this.gameData.inventory.length; i++){
            if(this.gameData.inventory[i].item.id === item.id){
                this.gameData.inventory[i].amount--;
                if(this.gameData.inventory[i].amount <= 0){
                    this.gameData.inventory.splice(i,1);
                }
                return true;
            }
        }
        return false;
    }

    public buyItem(item: Item): boolean{
        if(this.balance.value >= item.value){
            this.setBalance(this.gameData.balance-item.value);
            this.addItemToInventory(item);
            return true;
        }
        return false;
    }

    public useItem(item: Item){
        this.removeItemFromInventory(item);
    }

    public sellItem(item: Item){
        if(this.removeItemFromInventory(item)){
            this.addCoins(item.value);
        }
    }

    public startNewGame(){
        this.gameData = new GameData();
        this.gameData.balance = 200; // TODO: remove later
        this.balance.value = this.gameData.balance;
    }

    private loadItems() {
        fetch("public/resources/items.json")
            .then(result => result.json())
            .then(result => {
                this.items = [];
                for(let key in result){
                    let item;
                    if(result[key]["type"] === "0"){ // Quest item
                        item = new Item(result[key]["id"],result[key]["name"],result[key]["description"],result[key]["percentage"],result[key]["value"],result[key]["src"]);
                    }
                    else if(result[key]["type"] === "1"){ // Buff
                        item = new Buff(result[key]["id"],result[key]["name"],result[key]["description"],result[key]["percentage"],result[key]["value"],result[key]["src"]["0"],result[key]["src"]["1"]);
                    }
                    else{ // Valuable
                        item = new Item(result[key]["id"],result[key]["name"],result[key]["description"],result[key]["percentage"],result[key]["value"],result[key]["src"]);
                    }
                    this.items.push(item);
                }
                this.isFullyLoaded = true;
            })
            .catch(error => console.error(error));
    }
}
import GameData from "../models/game-data";
import {ObservedNumber} from "../models/observed-number";
import {DialogueManager} from "./dialogue-manager";
import {Item} from "../models/items/item";
import {Buff} from "../models/items/buff";

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

    public addCoins(amount: number){
        this.gameData.balance+= amount;
        this.balance.value = this.gameData.balance;
    }

    public addItemToInventory(item: Item){
        console.log("Added item: " + item.name);
        // TODO
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
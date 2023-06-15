import GameData from "../models/game-data";
import {ObservedNumber} from "../models/observed-number";
import {DialogueManager} from "./dialogue-manager";

export class GameManager{
    gameData: GameData;
    balance: ObservedNumber;

    constructor() {
        this.gameData = new GameData();
        this.balance = new ObservedNumber(this.gameData.balance);
    }

    public addCoins(amount: number){
        this.gameData.balance+= amount;
        this.balance.value = this.gameData.balance;
    }

    public startNewGame(){
        this.gameData = new GameData();
        this.balance.value = this.gameData.balance;
    }
}
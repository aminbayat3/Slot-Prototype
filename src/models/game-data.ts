import {InventorySlot} from "./inventory-slot";

class GameData {

    balance: number;

    inventory: InventorySlot[]

    constructor() {
        this.balance = 0;
        this.inventory = [];
    }

}

export default GameData;
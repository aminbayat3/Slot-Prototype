import {Item} from "./items/item";

export class InventorySlot{

    item?: Item;
    amount: number;

    constructor() {
        this.amount = 0;
    }
}
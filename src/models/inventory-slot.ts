import {Item} from "./items/item";

export class InventorySlot{

    item: Item;
    amount: number;

    constructor(item: Item, amount: number) {
        this.item = item;
        this.amount = amount;
    }

    getItemID(): string{
        return this.item.id;
    }

    add(amount: number): void{
        this.amount += amount;
    }
}
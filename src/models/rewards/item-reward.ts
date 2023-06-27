import {Reward} from "./reward";
import {Item} from "../items/item";

export class ItemReward extends Reward{

    item: Item;

    constructor(src: string,percentage: number,item: Item) {
        super(src,percentage);
        this.item = item;
    }
}
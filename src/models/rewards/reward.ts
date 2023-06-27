import {Item} from "../items/item";

export class Reward {
    src: string;
    percentage: number;
    constructor(src: string,percentage: number) {
        this.src = src;
        this.percentage = Number(percentage);
    }
}
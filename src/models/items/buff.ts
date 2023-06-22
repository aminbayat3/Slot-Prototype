import {Item} from "./item";

export class Buff extends Item{

    srcActive: string;

    constructor(id: string, name: string, description: string, percentage: number, value: number, src: string, src2: string) {
        super(id,name,description,percentage,value,src);
        this.srcActive = src2;
    }

}
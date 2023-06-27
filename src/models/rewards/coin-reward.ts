import {Reward} from "./reward";

export class CoinReward extends Reward{

    amount: number;

    constructor(src: string,percentage: number,amount: number) {
        super(src,percentage);
        this.amount = amount;
    }
}
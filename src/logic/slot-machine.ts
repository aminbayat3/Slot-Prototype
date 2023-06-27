import SlotMachineScreen from "../screens/slot-machine-screen";
import {Buff} from "../models/items/buff";
import {Column} from "./column";
import {Reward} from "../models/rewards/reward";
import {CoinReward} from "../models/rewards/coin-reward";
import {GameManager} from "./game-manager";
import {ItemReward} from "../models/rewards/item-reward";

export class SlotMachine{
    private static columnCount = 3;

    private gameManager: GameManager;

    private slotMachineScreen : SlotMachineScreen;
    private rewards :Reward[];
    private columns: Column[];

    private defaultWinChance: number = 0.55;
    private defaultItemChance: number = 0.5;
    private defaultCoinChance: number = 0.5;

    private currentWinChance: number = 0.5;
    private currentItemChance: number = 0.5;
    private currentCoinChance: number = 0.5;

    private buff1:boolean = false;
    private buff2:boolean = false;
    private buff3:boolean = false;

    private columnsFinished: number = 0;
    private isWin: boolean = false;
    private currentReward?: Reward;
    private isSpinning: boolean = false;
    constructor(slotMachineScreen: SlotMachineScreen, gameManager: GameManager) {
        this.slotMachineScreen = slotMachineScreen;
        this.gameManager = gameManager;
        this.rewards = [];
        this.rewards.push(new CoinReward("public/images/items/coin.png",0.5,10));
        this.rewards.push(new CoinReward("public/images/items/coin.png",0.3,15));
        this.rewards.push(new CoinReward("public/images/items/coin.png",0.2,25));
        for (let item of this.gameManager.items){
            if(item.percentage > 0){
                this.rewards.push(new ItemReward(item.src,item.percentage,item));
            }
        }
        let columnElements = (document.getElementById("column-wrapper")! as HTMLDivElement).getElementsByClassName("column")! as HTMLCollectionOf<HTMLDivElement>;
        this.columns = [];
        for (let i= 0; i < SlotMachine.columnCount; i++){
            this.columns.push(new Column(this,columnElements[i]));
        }
    }

    public startSpinning(activeBuffs: Buff[]){
        if(!this.isSpinning){
            this.isSpinning = true;
            this.columnsFinished = 0;
            this.setBuffFlags(activeBuffs);
            this.determineOutcome();
            let spunSrcs: string[] = this.getSpunSrcs();
            for(let i = 0; i < this.columns.length; i++){
                this.columns[i].startSpin(i*250,spunSrcs[i]);
            }
        }
    }

    determineOutcome(){
        this.currentItemChance = this.defaultItemChance;
        this.currentCoinChance = this.defaultCoinChance;
        (this.buff1)? this.currentItemChance+=0.30 : "";
        (this.buff1)? this.currentCoinChance-=0.30 : "";
        (this.buff2)? this.currentItemChance-=0.30 : "";
        (this.buff2)? this.currentCoinChance+=0.30 : "";
        (this.buff3)? this.currentWinChance = this.defaultWinChance + 0.1:this.currentWinChance = this.defaultWinChance;

        if(Math.random() < this.currentWinChance){
            this.isWin = true;
            if(Math.random() < this.currentItemChance){
                this.currentReward = this.getRandomItemReward();
            }
            else{
                this.currentReward = this.getRandomCoinReward();
            }
        }
        else{
            this.isWin = false;
        }
    }

    getSpunSrcs():string[]{
        let srcs: string[] = [];
        if(this.isWin && this.currentReward){
            for (let i = 0; i < 3; i++) {
                srcs.push(this.currentReward.src);
            }
        }
        else{
            let src1 = this.getRandomRewardImage();
            let src2 = this.getRandomRewardImage();
            let src3;
            do{
                src3 = this.getRandomRewardImage();
            }while(src1 === src2 && src1 === src3)
            srcs.push(src1);
            srcs.push(src2);
            srcs.push(src3);
        }
        return srcs;
    }

    setBuffFlags(activeBuffs: Buff[]){
        for (let buff of activeBuffs){
            if(buff.id === "buff1"){
                this.buff1 = true;
            }
            else if(buff.id === "buff2"){
                this.buff2 = true;
            }
            else if(buff.id === "buff3"){
                this.buff3 = true;
            }
        }
    }

    resetBuffFlags(){
        this.buff1 = false;
        this.buff2 = false;
        this.buff3 = false;
    }

    public spinningStopped(){
        this.columnsFinished++;
        if(this.columnsFinished === SlotMachine.columnCount){
            if(this.isWin && this.currentReward instanceof ItemReward){
                if(this.currentReward.item.id === "necklace_1"){
                    for (let i = 0; i < this.rewards.length; i++){
                        if(this.rewards[i] instanceof ItemReward){
                            if((this.rewards[i] as ItemReward).item.id === "necklace_1"){
                                this.rewards.splice(i,1);
                                break;
                            }
                        }
                    }
                }
                this.slotMachineScreen.endSpinningProcess(true,this.currentReward.item,undefined);
            }
            else if(this.isWin && this.currentReward instanceof CoinReward){
                this.slotMachineScreen.endSpinningProcess(true,undefined,this.currentReward.amount);
            }
            else{
                this.slotMachineScreen.endSpinningProcess(false,undefined,undefined);
            }
            this.isSpinning = false;
            this.resetBuffFlags();
        }
    }

    public getRewards():Reward[]{
        return this.rewards;
    }

    public getRandomRewardImage():string{
        if(Math.random() < this.currentItemChance){
            return this.getRandomItemReward().src;
        }
        else{
            return this.getRandomCoinReward().src;
        }
    }

    public getRandomItemReward():ItemReward{
        let itemRewards:ItemReward[] = [];
        for (let reward of this.rewards){
            if(reward instanceof ItemReward){
                itemRewards.push(reward);
            }
        }
        let returnReward = itemRewards[0];
        let rndm = Math.random();
        let range_start: number = Number(0);
        for(let reward of itemRewards){
            if(rndm >= range_start && rndm < range_start + reward.percentage){
                returnReward = reward;
                break;
            }
            range_start += reward.percentage;
        }
        return returnReward;
    }

    public getRandomCoinReward():CoinReward{
        let coinRewards: CoinReward[] = []
        for (let reward of this.rewards){
            if(reward instanceof CoinReward){
                coinRewards.push(reward);
            }
        }
        let returnReward = coinRewards[0];
        let rndm = Math.random();
        let range_start: number = Number(0);
        for (let reward of coinRewards){
            if(rndm >= range_start && rndm < range_start + reward.percentage){
                returnReward = reward;
                break;
            }
            range_start += reward.percentage;
        }
        return returnReward;
    }
}
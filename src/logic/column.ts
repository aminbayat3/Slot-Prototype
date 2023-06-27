import {Reward} from "../models/rewards/reward";
import {SlotMachine} from "./slot-machine";

export class Column{
    private static maxSpinCount = 10;
    private static slowDownSpinCount = 2;
    private static defaultSpeed = 35;
    private static columnHeight = 513;

    rewards: Reward[] = [];
    slotMachine: SlotMachine

    columnSets:HTMLCollectionOf<HTMLDivElement>;

    currentSpinCount: number = 0;
    currentSpeed: number = 0;

    spunSrc= "";

    constructor(slotMachine: SlotMachine,wrapper: HTMLDivElement) {
        this.slotMachine = slotMachine;
        this.columnSets = wrapper.getElementsByClassName("column-set")! as HTMLCollectionOf<HTMLDivElement>;
        this.resetSets();
    }

    public startSpin(delay: number,spunSrc: string){
        this.rewards = this.slotMachine.getRewards();
        this.currentSpinCount = 0;
        this.currentSpeed = Column.defaultSpeed;
        this.spunSrc = spunSrc;
        setTimeout(() => this.spin(),delay)
    }

    private spin(){
        setTimeout(() => this.try(), 0);
    }

    private try(){
        if(this.currentSpinCount >= Column.maxSpinCount - Column.slowDownSpinCount){
            this.currentSpeed = Math.max(2,this.currentSpeed/1.017);
        }
        for (let set of this.columnSets){
            (this.spinSet(set))? this.currentSpinCount++: "";
        }
        if(this.currentSpinCount >= Column.maxSpinCount){
            this.resetSetPositions();
            this.slotMachine.spinningStopped();
        }
        else{
            this.spin();
        }
    }

    private spinSet(set: HTMLDivElement):boolean{
        let spinCounted = false;
        let top = Number(set.style.top.slice(0,set.style.top.length-2));
        let newPosition = top + this.currentSpeed;
        if(newPosition > Column.columnHeight){
            newPosition = newPosition - 3*Column.columnHeight;
            this.assignSetIcons(set,(Column.maxSpinCount-this.currentSpinCount === 3));
            spinCounted = true;
        }
        set.style.top = Math.floor(newPosition) + "px";
        return spinCounted;
    }

    assignSetIcons(set: HTMLDivElement,isStopSet: boolean){
        let setImages = set.getElementsByClassName("column-item")! as HTMLCollectionOf<HTMLImageElement>;
        for (let i = 0; i < setImages.length; i++) {
            if(isStopSet && i === 1){
                setImages[i].src = this.spunSrc;
            }
            else{
                setImages[i].src = this.slotMachine.getRandomRewardImage();
            }
        }
    }

    resetSetPositions(){
        for(let i = 0; i < this.columnSets.length; i++){
            if(i % 3 === 0){
                this.columnSets[i].style.top = -Column.columnHeight + "px";
            }
            else if(i % 3 === 2){
                this.columnSets[i].style.top = Column.columnHeight + "px";
            }
            else{
                this.columnSets[i].style.top = "0px";
            }
        }
    }

    resetSetIcons(){
        for(let set of this.columnSets){
            this.assignSetIcons(set,false);
        }
    }

    resetSets(){
        this.resetSetIcons();
        this.resetSetPositions();
    }

}
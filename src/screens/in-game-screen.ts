import Screen from "./screen";
import {DialogueManager} from "../logic/dialogue-manager";
import {GameManager} from "../logic/game-manager";
import {ChoiceOption} from "../models/story-actions/choice-option";

class InGameScreen extends Screen{
    private static wrapperId: string = "in-game-screen";
    private static backgroundSrcPrefix: string = "public/images/backgrounds/";
    private gameManager: GameManager;
    private dialogueManager: DialogueManager;

    private backgroundElement: HTMLImageElement;
    private leftCharacterElement: HTMLImageElement;
    private rightCharacterElement: HTMLImageElement;
    private leftCharacterNameElement: HTMLImageElement;
    private rightCharacterNameElement: HTMLImageElement;
    private dialogueTextElement: HTMLImageElement;

    private options: ChoiceOption[] = [];
    private optionElements: HTMLCollectionOf<HTMLDivElement>;
    private optionRequirementTemplate : HTMLDivElement;

    constructor(gameManager: GameManager) {
        super(InGameScreen.wrapperId);
        this.gameManager = gameManager;
        this.dialogueManager = new DialogueManager(this,this.gameManager);

        this.optionElements = (document.getElementById("options")! as HTMLDivElement).getElementsByClassName("choice-option")! as HTMLCollectionOf<HTMLDivElement>;
        this.optionRequirementTemplate = document.getElementById("option-requirement")! as HTMLDivElement;

        this.backgroundElement = document.getElementById("dialogue-background")! as HTMLImageElement;
        this.leftCharacterElement = document.getElementById("character-left")! as HTMLImageElement;
        this.rightCharacterElement = document.getElementById("character-right")! as HTMLImageElement;
        this.leftCharacterNameElement = document.getElementById("character-name-left")! as HTMLImageElement;
        this.rightCharacterNameElement = document.getElementById("character-name-right")! as HTMLImageElement;
        this.dialogueTextElement = document.getElementById("dialogue-text")! as HTMLImageElement;
        this.screenWrapper.addEventListener("keydown", (event) => {if(event.keyCode === 32){ this.dialogueManager.handleInput()}});
        this.screenWrapper.addEventListener("click", () => this.dialogueManager.handleInput());
    }

    public showScreen(show: boolean) {
        super.showScreen(show);
        if(show){
            this.screenWrapper.focus();
            this.updateOptions();
        }
    }

    public setBackgroundImage(src: string){
        this.backgroundElement.src = InGameScreen.backgroundSrcPrefix + src;
    }

    public setCharacter(src: string, name: string, placeLeft: boolean){
        if(placeLeft){
            this.leftCharacterElement.src = src;
            this.leftCharacterNameElement.innerText = name;
        }
        else{
            this.rightCharacterElement.src = src;
            this.rightCharacterNameElement.innerText = name;
        }
    }

    public setDialogueText(text: string){
        this.dialogueTextElement.innerText = text;
    }

    public setDialogueActiveSpeaker(forLeft: boolean, forRight: boolean){
        if(forLeft){
            this.leftCharacterElement.classList.remove("not-speaker");
        }
        else{
            this.leftCharacterElement.classList.add("not-speaker");
        }
        if(forRight){
            this.rightCharacterElement.classList.remove("not-speaker");
        }
        else{
            this.rightCharacterElement.classList.add("not-speaker");
        }
    }

    public setOptions(options: ChoiceOption[]){
        this.options = options;
        this.updateOptions();
    }

    public resetOptions(){
        this.options = [];
        this.updateOptions();
    }

    private updateOptions(){
        for (let i = 0; i < this.optionElements.length; i++) {
            let copy = this.optionElements[i].cloneNode(true) as HTMLDivElement;
            this.optionElements[i].replaceWith(copy);
        }
        this.optionElements = (document.getElementById("options")! as HTMLDivElement).getElementsByClassName("choice-option")! as HTMLCollectionOf<HTMLDivElement>;
        for (let optionElement of this.optionElements) {
            optionElement.innerHTML = "";
            optionElement.classList.add("not-active");
        }
        for (let i = 0; i < this.options.length; i++) {
            let available = this.dialogueManager.checkOptionAvailability(this.options[i]);
            this.optionElements[i].classList.remove("not-active");
            this.optionElements[i].innerHTML = "" + this.options[i].text;
            if(this.options[i].requiredCoins > 0){
                let coin_copy: HTMLDivElement = this.optionRequirementTemplate.cloneNode(true)! as HTMLDivElement;
                (coin_copy.children[0] as HTMLImageElement).src = "public/images/items/coin.png"
                coin_copy.children[1].innerHTML = "x" + this.options[i].requiredCoins;
                coin_copy.classList.remove("not-active");
                this.optionElements[i].appendChild(coin_copy);
            }
            for (let itemId of this.options[i].requiredItemIds) {
                for (let item of this.gameManager.items) {
                    if(item.id === itemId){
                        let item_copy: HTMLDivElement = this.optionRequirementTemplate.cloneNode(true)! as HTMLDivElement;
                        (item_copy.children[0] as HTMLImageElement).src = item.src;
                        item_copy.children[1].innerHTML = "x1";
                        item_copy.classList.remove("not-active");
                        this.optionElements[i].appendChild(item_copy);
                    }
                }
            }
            if(available){
                this.optionElements[i].addEventListener("click",() => this.dialogueManager.choose(this.options[i]));
            }
        }
    }

    public getDialogueManager(){
        return this.dialogueManager;
    }
}

export default InGameScreen;
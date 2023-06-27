import Screen from "./screen";
import {DialogueManager} from "../logic/dialogue-manager";

class InGameScreen extends Screen{
    private static wrapperId: string = "in-game-screen";
    private static backgroundSrcPrefix: string = "public/images/backgrounds/"
    private dialogueManager: DialogueManager;

    private backgroundElement: HTMLImageElement;
    private leftCharacterElement: HTMLImageElement;
    private rightCharacterElement: HTMLImageElement;
    private leftCharacterNameElement: HTMLImageElement;
    private rightCharacterNameElement: HTMLImageElement;
    private dialogueTextElement: HTMLImageElement;

    constructor() {
        super(InGameScreen.wrapperId);
        this.dialogueManager = new DialogueManager(this);

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

    public getDialogueManager(){
        return this.dialogueManager;
    }
}

export default InGameScreen;
import {DialogueManager} from "../../logic/dialogue-manager";
import InGameScreen from "../../screens/in-game-screen";

export class StoryAction{

    private isAutoExecuted: boolean;

    constructor(isAutoDisplayed: boolean) {
        this.isAutoExecuted = isAutoDisplayed;
    }

    public do(inGameScreen: InGameScreen, dialogueManager: DialogueManager){
        console.error("Error: StoryActionType does not have a action attached to it.");
    }

    public isExecutedAtOnce(){
        return this.isAutoExecuted;
    };
}
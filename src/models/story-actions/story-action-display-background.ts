import {StoryAction} from "./story-action";
import InGameScreen from "../../screens/in-game-screen";
import {DialogueManager} from "../../logic/dialogue-manager";

export class StoryActionDisplayBackground extends StoryAction{

    backgroundSrc: string;

    constructor(isAutoExecuted: boolean, backgroundSrc: string) {
        super(isAutoExecuted);
        this.backgroundSrc = backgroundSrc;
    }

    public do(inGameScreen: InGameScreen, dialogueManager: DialogueManager){
        inGameScreen.setBackgroundImage(this.backgroundSrc);
    }
}
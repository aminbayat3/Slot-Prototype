import {StoryAction} from "./story-action";
import InGameScreen from "../../screens/in-game-screen";
import {DialogueManager} from "../../logic/dialogue-manager";
import {Character} from "../character";

export class StoryActionDisplayCharacter extends StoryAction{
    character: Character;
    srcName: string;
    isLeft: boolean;
    constructor(isAutoExecuted: boolean, character: Character, srcName: string, isLeft: boolean) {
        super(isAutoExecuted);
        this.character = character;
        this.srcName = srcName;
        this.isLeft = isLeft;
    }

    public do(inGameScreen: InGameScreen, dialogueManager: DialogueManager){
        (this.isLeft) ? dialogueManager.leftCharacter = this.character : dialogueManager.rightCharacter = this.character;
        inGameScreen.setCharacter(this.character.getSrcByName(this.srcName),this.character.name,this.isLeft,this.character.size,this.character.distance);
    }
}
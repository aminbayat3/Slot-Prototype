import {StoryAction} from "./story-action";
import {ChoiceOption} from "./choice-option";
import InGameScreen from "../../screens/in-game-screen";
import {DialogueManager} from "../../logic/dialogue-manager";

export class StoryActionChoiceManual extends StoryAction{

    options: ChoiceOption[];

    constructor(isAutoExecuted: boolean, options: ChoiceOption[]) {
        super(isAutoExecuted);
        this.options = options;
    }

    public do(inGameScreen: InGameScreen, dialogueManager: DialogueManager){
        dialogueManager.startChoice();
        dialogueManager.loadOptions(this.options);
    }

}
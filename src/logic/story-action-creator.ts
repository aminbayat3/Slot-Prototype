import {StoryAction} from "../models/story-actions/story-action";
import {Character} from "../models/character";
import {StoryActionDisplayBackground} from "../models/story-actions/story-action-display-background";
import {StoryActionDisplayCharacter} from "../models/story-actions/story-action-display-character";
import {StoryActionDialogueLine} from "../models/story-actions/story-action-dialogue-line";
import {DialogueManager} from "./dialogue-manager";

export class StoryActionCreator{

    private dialogueManager: DialogueManager;

    constructor(dialogueManager: DialogueManager) {
        this.dialogueManager = dialogueManager;
    }

    public createStoryAction(actionString: string): StoryAction{
        actionString = actionString.trim();
        let immediateExecutionFlag: boolean = actionString.endsWith("#");
        if(actionString.startsWith("bg ")){ // CHANGE BACKGROUND
            return new StoryActionDisplayBackground(immediateExecutionFlag,actionString.split(" ")[1]);
        }
        else if(actionString.startsWith("ch ")){ // CHANGE CHARACTER
            let parts: string[] = actionString.split(" ");
            let char = this.getCharacterById(parts[2]);
            let isLeft = parts[1] === "left";
            return new StoryActionDisplayCharacter(immediateExecutionFlag,char,parts[3],isLeft);
        }
        else if(actionString.startsWith("_ ")){ // LINE
            let parts: string[] = actionString.split(" ");
            return new StoryActionDialogueLine(immediateExecutionFlag,parts[1], actionString.substring(actionString.indexOf("\""),actionString.lastIndexOf("\"")));
        }
        else if(actionString.startsWith("*")){ // CHOICE
            // TODO
        }
        return new StoryAction(immediateExecutionFlag);
    }

    private getCharacterById(id: string): Character{
        for (let char of this.dialogueManager.characters) {
            if(char.id === id){
                return char;
            }
        }
        return Character.getGenericCharacter();
    }

}
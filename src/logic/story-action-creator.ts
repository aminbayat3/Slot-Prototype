import {StoryAction} from "../models/story-actions/story-action";
import {Character} from "../models/character";
import {StoryActionDisplayBackground} from "../models/story-actions/story-action-display-background";
import {StoryActionDisplayCharacter} from "../models/story-actions/story-action-display-character";
import {StoryActionDialogueLine} from "../models/story-actions/story-action-dialogue-line";
import {DialogueManager} from "./dialogue-manager";
import {StoryActionChoiceAuto} from "../models/story-actions/story-action-choice-auto";
import {ChoiceOption} from "../models/story-actions/choice-option";
import {StoryActionChoiceManual} from "../models/story-actions/story-action-choice-manual";

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
            let parts: string[] = actionString.split(" ");
            let optionStrings: string[] = actionString.split("(");
            optionStrings.splice(0,1);
            let options: ChoiceOption[] = [];
            for (let i = 0; i < optionStrings.length; i++) {
                optionStrings[i] = optionStrings[i].substring(0,optionStrings[i].indexOf(")"));
                let line = optionStrings[i].substring(optionStrings[i].indexOf("\"")+1,optionStrings[i].lastIndexOf("\""));
                let optionParts = optionStrings[i].substring(optionStrings[i].lastIndexOf("\"")+1).trim().split(" ");
                let path = optionParts[0];
                let amount: number = Number(optionParts[1]);
                let itemsIds: string[] = [];
                for (let j = 2; j < optionParts.length; j++) {
                    itemsIds.push(optionParts[j]);
                }
                options.push(new ChoiceOption(line,path,amount,itemsIds));
            }
            if(parts[1] === "auto"){
                return new StoryActionChoiceAuto(immediateExecutionFlag,options);
            }
            else{
                return new StoryActionChoiceManual(immediateExecutionFlag,options);
            }
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
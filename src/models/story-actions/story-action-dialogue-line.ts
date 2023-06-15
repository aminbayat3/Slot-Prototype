import {StoryAction} from "./story-action";
import {DialogueManager} from "../../logic/dialogue-manager";
import InGameScreen from "../../screens/in-game-screen";

export class StoryActionDialogueLine extends StoryAction{

    speakerId: string;
    line: string;

    constructor(isAutoExecuted: boolean, speakerId: string, line:string) {
        super(isAutoExecuted);
        this.speakerId = speakerId;
        this.line = line;
    }

    public do(inGameScreen: InGameScreen, dialogueManager: DialogueManager){
        let isActiveSpeakerLeft: boolean = dialogueManager.leftCharacter.id === this.speakerId;
        let isActiveSpeakerRight: boolean = dialogueManager.rightCharacter.id === this.speakerId;
        inGameScreen.setDialogueActiveSpeaker(isActiveSpeakerLeft,isActiveSpeakerRight);
        inGameScreen.setDialogueText(this.line);
    }
}
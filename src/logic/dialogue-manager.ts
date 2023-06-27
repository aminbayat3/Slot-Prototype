import InGameScreen from "../screens/in-game-screen";
import {StoryAction} from "../models/story-actions/story-action";
import {StoryActionCreator} from "./story-action-creator";
import {Character} from "../models/character";
import {ChoiceOption} from "../models/story-actions/choice-option";
import {GameManager} from "./game-manager";

export class DialogueManager{

    private static srcStoryPath: string = "public/resources/story/";
    private static nameFirstStoryFragment: string = "story0";
    private static characterPath: string = "public/resources/characters.json";

    private screen : InGameScreen;
    private gameManager: GameManager;

    private canAdvance: boolean;
    private currentIndex : number = 0;
    private storyFragmentActions : StoryAction[];
    characters: Character[];

    leftCharacter: Character;
    rightCharacter: Character;

    constructor(screen : InGameScreen, gameManager: GameManager) {
        this.gameManager = gameManager;
        this.canAdvance = false;
        this.screen = screen;
        this.storyFragmentActions = [];
        this.characters = [];
        this.leftCharacter = Character.getGenericCharacter();
        this.rightCharacter = Character.getGenericCharacter();
        this.loadCharacters();
    }

    public startNewGame(){
        this.canAdvance = true;
        this.screen.setDialogueText("");
        this.loadStoryFragment(DialogueManager.nameFirstStoryFragment)
            .then(ignored => this.advanceStory())
    }

    public loadGame(){
        // Get CanAdvance from save as well!!
        // TODO: load Background, character left&right & run last action
    }

    public handleInput(){
        if(this.canAdvance){
            this.advanceStory();
        }
    }

    public startChoice(){
        this.canAdvance = false;
    }

    public loadOptions(options: ChoiceOption[]){
        this.screen.setOptions(options);
    }

    public choose(option: ChoiceOption){
        this.gameManager.removeCoins(option.requiredCoins);
        for (let item of option.requiredItemIds) {
            this.gameManager.removeItemFromInventoryById(item,1);
        }
        this.loadStoryFragment(option.path)
            .then(ignored => {
                this.canAdvance = true;
                this.advanceStory()
            });
        this.screen.resetOptions();
    }

    public checkOptionAvailability(option: ChoiceOption):boolean{
        if(option.requiredCoins > this.gameManager.balance.value){
            return false;
        }
        for (let itemId of option.requiredItemIds) {
            if(!this.gameManager.isItemInInventory(itemId)){
                return false;
            }
        }
        return true;
    }

    public advanceStory(){
        this.storyFragmentActions[this.currentIndex].do(this.screen, this);
        if(this.canAdvance && this.currentIndex + 1 < this.storyFragmentActions.length){
            this.currentIndex++;
            if(this.storyFragmentActions[this.currentIndex].isExecutedAtOnce()){
                this.advanceStory();
            }
        }
    }

    public loadStoryFragment(src: string){
        return fetch(DialogueManager.srcStoryPath+src+".json")
            .then(result => result.json())
            .then(result => {
                let content : string[] = result["content"].split("\n");
                let storyActionCreator: StoryActionCreator = new StoryActionCreator(this);
                this.currentIndex = 0;
                this.storyFragmentActions = [];
                for (let line of content) {
                    this.storyFragmentActions.push(storyActionCreator.createStoryAction(line));
                }
            })
            .catch(error => console.log(error));
    }

    private loadCharacters(){
        fetch(DialogueManager.characterPath)
            .then(result => result.json())
            .then(result => {
                this.characters = [];
                for(let key in result){
                    let character: Character = new Character(result[key]["id"],result[key]["name"],result[key]["size"],result[key]["distance"],result[key]["default"]);
                    this.characters.push(character);
                }
            })
            .catch(error => console.log(error));
    }

}
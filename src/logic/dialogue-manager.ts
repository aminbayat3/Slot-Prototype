import InGameScreen from "../screens/in-game-screen";
import {StoryAction} from "../models/story-actions/story-action";
import {StoryActionCreator} from "./story-action-creator";
import {Character} from "../models/character";

export class DialogueManager{

    private static srcStoryPath: string = "public/resources/story/";
    private static nameFirstStoryFragment: string = "story0.json";
    private static characterPath: string = "public/resources/characters.json";

    private screen : InGameScreen;

    private canAdvance: boolean;
    private currentIndex : number = 0;
    private storyFragmentActions : StoryAction[];
    characters: Character[];

    leftCharacter: Character;
    rightCharacter: Character;

    constructor(screen : InGameScreen) {
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

    public advanceStory(){
        console.log("TESt");
        this.storyFragmentActions[this.currentIndex].do(this.screen, this);
        this.currentIndex++;
        if(this.storyFragmentActions[this.currentIndex].isExecutedAtOnce()){
            this.advanceStory();
        }
    }

    private loadStoryFragment(src: string){
        return fetch(DialogueManager.srcStoryPath+src)
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
                    let character: Character = new Character(result[key]["id"],result[key]["name"],result[key]["default"]); // TODO: Adapt if necessary, maybe move to Character constructor and just pass a json string
                    this.characters.push(character);
                }
            })
            .catch(error => console.log(error));
    }

}
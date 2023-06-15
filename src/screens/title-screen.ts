import Screen from "./screen";
import ScreenManager from "./screen-manager";
import {GameManager} from "../logic/game-manager";

class TitleScreen extends Screen{
    private static wrapperId: string = "title-screen";
    private screenManager: ScreenManager;
    private gameManager: GameManager;

    continueOption: HTMLSpanElement;
    newOption: HTMLSpanElement;
    loadOption: HTMLSpanElement;
    settingsOption: HTMLSpanElement;
    creditsOption: HTMLSpanElement;
    exitOption: HTMLSpanElement;

    constructor(screenManager: ScreenManager, gameManager: GameManager) {
        super(TitleScreen.wrapperId);
        this.screenManager = screenManager;
        this.gameManager = gameManager;

        this.continueOption = this.screenWrapper.querySelector("#main-menu-option-continue")! as HTMLSpanElement;
        this.newOption = this.screenWrapper.querySelector("#main-menu-option-new")! as HTMLSpanElement;
        this.loadOption = this.screenWrapper.querySelector("#main-menu-option-load")! as HTMLSpanElement;
        this.settingsOption = this.screenWrapper.querySelector("#main-menu-option-settings")! as HTMLSpanElement;
        this.creditsOption = this.screenWrapper.querySelector("#main-menu-option-credits")! as HTMLSpanElement;
        this.exitOption = this.screenWrapper.querySelector("#main-menu-option-exit")! as HTMLSpanElement;

        this.newOption.addEventListener("click", () => this.newGame());
        // TODO: LOAD
        // TODO: SETTINGS
        // TODO: CREDITS
        this.exitOption.addEventListener("click", () => this.exitGame());
    }

    private displayContinueButton(shouldBeShown: boolean){
        if(shouldBeShown){
            this.continueOption.classList.remove("not-active");
        }
        else{
            this.continueOption.classList.add("not-active");
        }
    }

    private newGame(){
        this.screenManager.startNewGame();
    }

    private exitGame(){
        // TODO: is this okay here? should probably be somewhere more accessible -> screenManager
    }
}

export default TitleScreen;
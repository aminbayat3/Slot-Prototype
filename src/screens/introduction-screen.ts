import Screen from "./screen";
import ScreenManager from "./screen-manager";

export class IntroductionScreen extends Screen{

    private static wrapperId: string = "introduction-screen";
    private screenManager: ScreenManager;

    private videoElement: HTMLVideoElement;
    constructor(screenManager: ScreenManager) {
        super(IntroductionScreen.wrapperId);
        this.screenManager = screenManager;
        this.videoElement = document.getElementById("cutscene-video")! as HTMLVideoElement;
    }

    showScreen(show: boolean) {
        super.showScreen(show);
        if(show){
            let copy = this.videoElement.cloneNode(true)! as HTMLVideoElement;
            this.videoElement.replaceWith(copy);
            this.videoElement = copy;
            this.videoElement.play()
                .then(() => {
                    console.log("Playback of cutscene has started.");
                    this.videoElement.addEventListener("ended", () => this.screenManager.switchToInGameScreen());
                })
                .catch(() => this.screenManager.switchToInGameScreen());
        }
    }
}
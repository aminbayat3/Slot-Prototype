import GameData from "../models/game-data";
import Screen from "./screen";
import {GameManager} from "../logic/game-manager";

class CoinCounterScreen extends Screen{
    private static wrapperId: string = "coin-counter-wrapper";
    gameManager: GameManager;
    coinCounterElement: HTMLSpanElement;
    constructor(gameManager: GameManager) {
        super(CoinCounterScreen.wrapperId);
        this.gameManager = gameManager;
        this.coinCounterElement = this.screenWrapper.querySelector("#coin-counter-balance")! as HTMLSpanElement;

        this.configure();
    }

    configure(){
        this.coinCounterElement.innerText = `${this.gameManager.balance}`;
        this.gameManager.balance.addListener((balance:number) => {
            this.coinCounterElement.innerText = `${balance}`;
        })
    }
}

export default CoinCounterScreen;
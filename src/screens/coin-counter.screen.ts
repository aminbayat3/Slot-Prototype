import GameData from "../game-data";
import Screen from "./screen";

class CoinCounterScreen extends Screen{
    private static wrapperId: string = "coin-counter-wrapper";
    gameData: GameData;
    coinCounterElement: HTMLSpanElement;
    constructor(gameData: GameData) {
        super(CoinCounterScreen.wrapperId);
        this.gameData = gameData;
        this.coinCounterElement = this.screenWrapper.querySelector("#coin-counter-balance")! as HTMLSpanElement;

        this.configure();
    }

    configure(){
        this.coinCounterElement.innerText = `${this.gameData.balance.value}`;
        this.gameData.balance.addListener((balance:number) => {
            this.coinCounterElement.innerText = `${balance}`;
        })
    }
}

export default CoinCounterScreen;
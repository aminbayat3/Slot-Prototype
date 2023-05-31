import { SPINSET_ITEMS } from "../slot.data";
import { Item } from "../interfaces/spinset-item.interface";
import GameData from "../game-data";


class SlotState {
  private winPercentage: number;
  private isSpinning: boolean;
  private isWin: boolean;
  private winningIndex: number;
  private columnsFinishedSpinning: number;
  private spinsetItems: Item[];
  private betAmount: number;
  private isLost: boolean;

  private gameData: GameData;

  public static instance: SlotState; // TODO: Remove -> leftover singleton for slot.utils.ts

  // getters and setters
  public get getIsSpinning(): boolean {
    return this.isSpinning;
  }

  public set setIsSpinning(value: boolean) {
    this.isSpinning = value;
  }

  public get getIsWin(): boolean {
    return this.isWin;
  }

  public set setIsWin(value: boolean) {
    this.isWin = value;
  }

  public get getWinningIndex(): number {
    return this.winningIndex;
  }

  public set setWinningIndex(value: number) {
    this.winningIndex = value;
  }

  public get getWinPercentage() {
    return this.winPercentage;
  }

  public set setWinPercentage(probability: number) {
    if (probability > 0 && probability < 1) {
      this.winPercentage = probability;
    }
    throw new Error(
      "WinPercentage cannot be more than 1 and less than or equal to 0"
    );
  }

  public get getColumnsFinishedSpinning() {
    return this.columnsFinishedSpinning;
  }

  public set setColumnsFinishedSpinning(value: number) {
    this.columnsFinishedSpinning = value;
  }

  public get getSpinsetItems() {
    return this.spinsetItems;
  }

  constructor(gameData: GameData) {
    this.isSpinning = false; // used to prevent further spinnings
    this.isWin = false; // determines if the player wins (-> middle object icon of the spin icon set on which the spinning stops will be swapped with the correct icon)
    this.winningIndex = 0; // Color for this prototype, will most likely be some sort of object that contains a reference image
    this.winPercentage = 0.5; // ~every 2nd spin should be a win
    this.columnsFinishedSpinning = 0;
    this.spinsetItems = SPINSET_ITEMS;
    this.betAmount = 20;
    this.isLost = false;

    this.gameData = gameData;
    SlotState.instance = this; // TODO: REMOVE
  }

  showEndScreen = () => {
    // TODO: Display whatever we need after a spin
  };

  // Activates the possibility to spin again
  endColumnSpin = () => {
    this.columnsFinishedSpinning++;
    if (this.columnsFinishedSpinning >= 3) {
      this.showEndScreen();
      this.isSpinning = false;
    }
  };

  setGoldBalanceAfterEachSpin = () => {
    if(this.gameData.balance.value >= this.betAmount) {
      this.gameData.balance.value -= this.betAmount;
      console.log(this.betAmount, 'reduced');
    } else {
      // I dont know about lose situation
    }
  }

  setGoldBalanceAfterEachWin = () => {
    if(this.isWin) {
      this.gameData.balance.value += this.spinsetItems[this.winningIndex].value;
      console.log(this.spinsetItems[this.winningIndex].value, 'increased');
    }
  }
}

export default SlotState;
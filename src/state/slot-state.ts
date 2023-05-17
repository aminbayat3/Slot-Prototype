import { SPINSET_ITEMS } from "../slot.data";
import { Item } from "../interfaces/spinset-item.interface";

type Listener<T> = (
  winPercentage: number,
  isSpinning: boolean,
  isWin: boolean,
  winningIndex: number,
  goldBalance: number,
  isLost: boolean,
  Items: T[] 
) => void;

class State<T> {
  protected listeners: Listener<T>[];

  constructor() {
    this.listeners = [];
  }

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class SlotState extends State<Item> {
  private static instance: SlotState;
  private winPercentage: number;
  private isSpinning: boolean;
  private isWin: boolean;
  private winningIndex: number;
  private columnsFinishedSpinning: number;
  private spinsetItems: Item[];
  private goldBalance: number;
  private isLost: boolean;

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new SlotState();
    return this.instance;
  }

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

  public get getGoldBalance() {
    if(this.goldBalance > 0) {
      return this.goldBalance;
    }
    return 0;
  }
  public set setGoldBalance(value: number) {
    this.goldBalance += value;
  }

  constructor() {
    super();
    this.isSpinning = false; // used to prevent further spinnings
    this.isWin = false; // determines if the player wins (-> middle object icon of the spin icon set on which the spinning stops will be swapped with the correct icon)
    this.winningIndex = 0; // Color for this prototype, will most likely be some sort of object that contains a reference image
    this.winPercentage = 0.5; // ~every 2nd spin should be a win
    this.columnsFinishedSpinning = 0;
    this.spinsetItems = SPINSET_ITEMS;
    this.goldBalance = 0;
    this.isLost = false;
  }

  // Assigns the winning icon
  assignWinningIcon = (element: HTMLDivElement) => {
    element.innerHTML = `<img src=${this.spinsetItems[this.winningIndex].src} alt=${this.spinsetItems[this.winningIndex].name}/>`;
    return this.winningIndex;
  };

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
}

export const slotState = SlotState.getInstance();

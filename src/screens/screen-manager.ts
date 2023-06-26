import SlotMachineScreen from "./slot-machine-screen";
import TitleScreen from "./title-screen";
import SettingsScreen from "./settings-screen";
import InGameScreen from "./in-game-screen";
import ShopScreen from "./shop-screen";
import InventoryScreen from "./inventory.screen";
import sideBarScreen from "./sidebar-screen";
import CoinCounterScreen from "./coin-counter.screen";
import SidebarScreen from "./sidebar-screen";
import {GameManager} from "../logic/game-manager";

class ScreenManager{

    private gameManager: GameManager;

    private titleScreen: TitleScreen;
    private settingsScreen: SettingsScreen;
    private inGameScreen: InGameScreen;
    private slotMachineScreen: SlotMachineScreen;
    private shopScreen: ShopScreen;
    private inventoryScreen: InventoryScreen;
    private sideBarScreen: sideBarScreen;
    private coinCounterScreen: CoinCounterScreen;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
        this.titleScreen = new TitleScreen(this, this.gameManager);
        this.settingsScreen = new SettingsScreen();
        this.inGameScreen = new InGameScreen();
        this.slotMachineScreen = new SlotMachineScreen(this.gameManager);
        this.shopScreen = new ShopScreen(this.gameManager);
        this.inventoryScreen = new InventoryScreen(this.gameManager);
        this.sideBarScreen = new SidebarScreen(this); // note: instead of passing this, we could also assign onclick functions via methods
        this.coinCounterScreen = new CoinCounterScreen(this.gameManager);
        document.addEventListener("keydown", (event) => {if(event.keyCode === 32){ this.inGameScreen.getDialogueManager().handleInput()}});
    }

    setActiveScreens(title:boolean,menu:boolean,ingame:boolean,slotmachine:boolean,shop:boolean,inventory:boolean,sidebar:boolean,coincounter:boolean):void{
        this.titleScreen.showScreen(title);
        this.settingsScreen.showScreen(menu);
        this.inGameScreen.showScreen(ingame);
        this.slotMachineScreen.showScreen(slotmachine);
        this.shopScreen.showScreen(shop);
        this.inventoryScreen.showScreen(inventory);
        this.sideBarScreen.showScreen(sidebar);
        this.coinCounterScreen.showScreen(coincounter);
    }

    switchToTitleScreen():void{
        this.setActiveScreens(true,false,false,false,false,false,false,false);
    }
    switchToMenuScreen():void{
        this.setActiveScreens(false,true,false,false,false,false,false,false);
    }
    switchToInGameScreen():void{
        this.setActiveScreens(false,false,true,false,false,false,true,true);
    }
    switchToSlotMachineScreen():void{
        this.setActiveScreens(false,false,false,true,false,false,true,true);
    }
    switchToShopScreen():void{
        this.setActiveScreens(false,false,false,false,true,false,true,true);
    }
    switchToInventoryScreen():void{
        this.setActiveScreens(false,false,false,false,false,true,true,true);
    }

    public startNewGame(){
        this.gameManager.startNewGame();
        this.inGameScreen.getDialogueManager().startNewGame();
        this.switchToInGameScreen();
    }

}

export default ScreenManager;
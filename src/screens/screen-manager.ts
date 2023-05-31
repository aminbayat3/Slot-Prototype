import SlotMachineScreen from "./slot-machine-screen";
import GameData from "../game-data";
import TitleScreen from "./title-screen";
import MenuScreen from "./menu-screen";
import InGameScreen from "./in-game-screen";
import ShopScreen from "./shop-screen";
import InventoryScreen from "./inventory.screen";
import sideBarScreen from "./side-bar-screen";
import CoinCounterScreen from "./coin-counter.screen";
import SidebarScreen from "./side-bar-screen";

class ScreenManager{

    private gameData: GameData;

    private titleScreen: TitleScreen;
    private menuScreen: MenuScreen;
    private inGameScreen: InGameScreen;
    private slotMachineScreen: SlotMachineScreen;
    private shopScreen: ShopScreen;
    private inventoryScreen: InventoryScreen;
    private sideBarScreen: sideBarScreen;
    private coinCounterScreen: CoinCounterScreen;

    constructor(gameData: GameData) {
        this.gameData = gameData;
        this.titleScreen = new TitleScreen();
        this.menuScreen = new MenuScreen();
        this.inGameScreen = new InGameScreen();
        this.slotMachineScreen = new SlotMachineScreen(gameData);
        this.shopScreen = new ShopScreen();
        this.inventoryScreen = new InventoryScreen();
        this.sideBarScreen = new SidebarScreen(this); // note: instead of passing this, we could also assign onclick functions via methods
        this.coinCounterScreen = new CoinCounterScreen(gameData);
    }

    setActiveScreens(title:boolean,menu:boolean,ingame:boolean,slotmachine:boolean,shop:boolean,inventory:boolean,sidebar:boolean,coincounter:boolean):void{
        this.titleScreen.showScreen(title);
        this.menuScreen.showScreen(menu);
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
}

export default ScreenManager;
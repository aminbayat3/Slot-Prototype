import Screen from "./screen";

class MenuScreen extends Screen{
    private static wrapperId: string = "menu-screen";
    constructor() {
        super(MenuScreen.wrapperId);
    }
}

export default MenuScreen;
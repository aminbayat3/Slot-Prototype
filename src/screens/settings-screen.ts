import Screen from "./screen";

class SettingsScreen extends Screen{
    private static wrapperId: string = "menu-screen";
    constructor() {
        super(SettingsScreen.wrapperId);
    }
}

export default SettingsScreen;
import Screen from "./screen";

class InGameScreen extends Screen{
    private static wrapperId: string = "in-game-screen";
    constructor() {
        super(InGameScreen.wrapperId);
    }
}

export default InGameScreen;
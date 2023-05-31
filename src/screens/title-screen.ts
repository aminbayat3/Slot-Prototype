import Screen from "./screen";

class TitleScreen extends Screen{
    private static wrapperId: string = "title-screen";
    constructor() {
        super(TitleScreen.wrapperId);
    }
}

export default TitleScreen;
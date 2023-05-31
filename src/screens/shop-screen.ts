import Screen from "./screen";

class ShopScreen extends Screen{
    private static wrapperId: string = "shop-screen";
    constructor() {
        super(ShopScreen.wrapperId);
    }
}

export default ShopScreen;
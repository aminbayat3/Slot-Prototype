import Screen from "./screen";

class InventoryScreen extends Screen{
    private static wrapperId: string = "inventory-screen";
    constructor() {
        super(InventoryScreen.wrapperId);
    }
}

export default InventoryScreen;
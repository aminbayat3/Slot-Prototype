export class ChoiceOption{

    text: string;
    path: string;
    requiredCoins: number;
    requiredItemIds: string[];

    constructor(text: string, path: string, coins: number, itemsIds: string[]) {
        this.text = text;
        this.path = path;
        this.requiredCoins = coins;
        this.requiredItemIds = itemsIds;
    }

}
import GameData from "./game-data";

export class SaveGame{
    gameData: GameData;
    storyFragmentSrc: string;
    storyFragmentIndex: number;
    backgroundSrc: string;
    leftCharacterSrc: string;
    rightCharacterSrc: string;

    constructor(gameData: GameData, storyFragmentSrc: string, storyFragmentIndex: number, backgroundSrc: string, leftCharacterSrc: string, rightCharacterSrc: string) {
        this.gameData = gameData;
        this.storyFragmentSrc = storyFragmentSrc;
        this.storyFragmentIndex = storyFragmentIndex;
        this.backgroundSrc = backgroundSrc;
        this.leftCharacterSrc = leftCharacterSrc;
        this.rightCharacterSrc = rightCharacterSrc;
    }
}
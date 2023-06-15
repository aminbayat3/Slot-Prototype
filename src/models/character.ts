export class Character{

    id: string;
    name: string;
    defaultSrc: string;

    constructor(id: string, name: string, defaultSrc: string) {
        this.id = id;
        this.name = name;
        this.defaultSrc = defaultSrc;
    }

    public getSrcByName(name:string){
        // TODO: Implement a list for other sources
        return this.defaultSrc;
    }

    public static getGenericCharacter():Character{
        return new Character("-1","Stranger","");
    }
}
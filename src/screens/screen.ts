abstract class Screen{
    protected screenWrapper: HTMLDivElement;
    protected isShown: boolean = false;
    protected constructor(screenId:string) {
        this.screenWrapper = document.getElementById(screenId)! as HTMLDivElement;
    }

    public get isActive(){
        return this.isShown;
    }

    public showScreen(show:boolean){
        if(show){
            this.screenWrapper.classList.remove("not-active");
        }
        else{
            this.screenWrapper.classList.add("not-active");
        }
        this.isShown = show;
    }
}

export default Screen;
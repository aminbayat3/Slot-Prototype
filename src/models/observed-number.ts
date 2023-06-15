type Listener = (balance: number) => void;
export class ObservedNumber {
    private number: number;
    private listeners: Listener[];

    constructor(number: number) {
        this.number = number;
        this.listeners = [];
    }

    get value(): number{
        return this.number;
    }

    set value(number: number){
        this.number = number;
        this.updateListener();
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }

    private updateListener(){
        for (const listenerFn of this.listeners) {
            listenerFn(this.number);
        }
    }
}
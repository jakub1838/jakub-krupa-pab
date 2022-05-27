export class Table {
    name: string
    numberOfPeople: number
    status: string
    //_id: number

    constructor(name: string, numberOfPeople: number, status: Status){
        this.name = name;
        this.numberOfPeople = numberOfPeople;
        this.status = status;
        //this._id = Date.now()
    }
}
export enum Status{
    free = "free",
    occupied = "occupied"
}
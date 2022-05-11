export class Table {
    name: string
    numberOfPeople: number
    status: string
    id: number
    constructor(name: string, numberOfPeople: number, status: string){
        this.name = name;
        this.numberOfPeople = numberOfPeople;
        //???
        this.status = status;
        this.id = Date.now()
    }
}
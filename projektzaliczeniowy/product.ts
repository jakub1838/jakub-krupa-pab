export class Product {
    name: string
    price: number
    quantity: number
    unitOfMeasure: string
    //_id: number
    demand: string

    constructor(name: string, price: number, quantity: number, unitOfMeasure: unitOfMeasure, demand: demand) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.unitOfMeasure = unitOfMeasure;
        //this._id = Date.now()
        this.demand = demand;
    }
}

export enum unitOfMeasure {
    kg = "kg",
    pieces = "p",
    liters = "l"
}

export enum demand {
    low = "low",
    medium = "medium",
    high = "high"
}

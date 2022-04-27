export class product {
    name: string
    price: number
    quantity: number
    unitOfMeasure: string
    constructor(name: string, price: number, quantity: number, unitOfMeasure: string){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.unitOfMeasure = unitOfMeasure;
    }
}
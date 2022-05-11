export class Product {
    name: string
    price: number
    quantity: number
    unitOfMeasure: string
    id: number
    constructor(name: string, price: number, quantity: number, unitOfMeasure: string){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.unitOfMeasure = unitOfMeasure;
        this.id = Date.now()
    }
}
export class Dish {
    name: string
    price: number
    category: string
    id : number
    constructor(name: string, price: number, category: string){
        this.name = name
        this.price = price
        this.category = category
        this.id = Date.now()
    }
}

export enum category{
    soup = "soup",
    maindish = "maindish"
}
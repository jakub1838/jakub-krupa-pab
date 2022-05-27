export class Dish {
    name: string
    price: number
    category: string
    //_id : number
    constructor(name: string, price: number, category: category){
        this.name = name
        this.price = price
        this.category = category
        //this._id = Date.now()
    }
}

export enum category{
    soup = "soup",
    maindish = "maindish"
}
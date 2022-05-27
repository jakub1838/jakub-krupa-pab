export class Employee {
    name: string
    surname: string
    category: string
    //_id: number
    
    constructor(name: string, surname: string, category: category){
        this.name = name
        this.surname = surname
        this.category = category
        //this._id = Date.now()
    }
}
export enum category{
    cook = "cook",
    waiter = "waiter",
    manager = "manager"
}
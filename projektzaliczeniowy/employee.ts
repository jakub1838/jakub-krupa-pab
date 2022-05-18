export class Employee {
    name: string
    surname: string
    category: string
    id: number
    constructor(name: string, surname: string, category: string){
        this.name = name
        this.surname = surname
        this.category = category
        this.id = Date.now()
    }
}
export enum category{
    cook = "cook",
    waiter = "waiter",
    manager = "manager"
}
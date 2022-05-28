import { Table } from './table'
import { Employee } from './employee'
import { Dish } from './dish'
export class Order{
    employee: Employee[]
    dishes: Dish[] = []
    status: string
    table: Table[]
    total: number
   // _id : number
    constructor(employee: Employee[], dishes: Dish[], status: Status, table: Table[], total?: number){
        this.employee = employee
        this.dishes = dishes
        this.status = status
        this.table = table
        let tmp = 0 
        console.log(dishes[2])
        dishes.forEach(element => {tmp+=element.price});
        this.total = total ?? tmp
        //this._id = Date.now()
    }
}
export enum Status{
    folded = "folded",
    inProgress = "inProgress",
    realized = "realized",
    bill = "bill"
}
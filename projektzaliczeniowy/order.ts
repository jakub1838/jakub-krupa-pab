import { Table } from './table'
import { Employee } from './employee'
import { Dish } from './dish'
export class Order{
    employee: Employee[]
    dishes: Dish[]
    status: string
    table: Table[]
    total: number
    id : number
    constructor(employee: Employee[], dishes: Dish[], status: string, table: Table[], total: number){
        this.employee = employee
        this.dishes = dishes
        this.status = status
        this.table = table
        this.total = total
        this.id = Date.now()
    }
}
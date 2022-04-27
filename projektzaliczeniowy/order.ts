import { table } from './table'
import { employee } from './employee'
import { dish } from './dish'
export class order{
    employee: employee[]
    dishes: dish[]
    status: string
    table: table[]
    total: number
    constructor(employee: employee[], dishes: dish[], status: string, table: table[], total: number){
        this.employee = employee
        this.dishes = dishes
        this.status = status
        this.table = table
        this.total = total
    }
}
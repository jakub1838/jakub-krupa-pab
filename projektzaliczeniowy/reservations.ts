import { Table } from './table'
export class Reservations {
    table: Table[]
    start: Date
    end: Date
    client: string
    id: number
    constructor(table: Table[], start: Date, end: Date, client: string){
        this.table = table
        this.start = start
        this.end = end
        this.client = client
        this.id = Date.now()
    }
}
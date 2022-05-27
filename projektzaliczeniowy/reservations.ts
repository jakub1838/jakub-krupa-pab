import { Table } from './table'
export class Reservations {
    table: Table[]
    start: Date
    end: Date
    client: string
    _id: number
    constructor(table: Table[], start: Date, end: Date, client: string){
        this.table = table
        this.start = start
        this.end = end
        this.client = client
        this._id = Date.now()
    }
}

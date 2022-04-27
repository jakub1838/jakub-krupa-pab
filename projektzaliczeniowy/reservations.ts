import { table } from './table'
export class reservations {
    table: table[]
    start: Date
    end: Date
    client: string
    constructor(table: table[], start: Date, end: Date, client: string){
        this.table = table
        this.start = start
        this.end = end
        this.client = client
    }
}
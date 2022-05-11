import fs, { stat } from 'fs';
import { Restaurant } from './restaurant'
import { Employee } from './employee'
import { Table } from './table'
import { Reservations} from './reservations'
import { Product } from './product'
import { Dish } from './dish'
import { Order } from './order'
import { isConstructorDeclaration } from 'typescript';

export class Handle{
    private _Restaurant: Restaurant[] = [];
    private _Employee: Employee[] = [];
    private _Table: Table[] = [];
    private _Reservations: Reservations[] = [];
    private _Product: Product[] = [];
    private _Dish: Dish[] = [];
    private _Order: Order[] = [];

    private storeFile = "Storage.json"

    get restaurant(): Restaurant[] {
        return this._Restaurant;
    }
    get employee(): Employee[] {
        return this._Employee;
    }
    get table(): Table[] {
        return this._Table;
    }
    get reservations(): Reservations[] {
        return this._Reservations;
    }
    get product(): Product[] {
        return this._Product;
    }
    get dish(): Dish[] {
        return this._Dish;
    }
    get order(): Order[] {
        return this._Order;
    }

    Store(stored: any){
        switch(stored.constructor.name){
            case "Restaurant":
                this._Restaurant.push(stored)
                this.updateStorage();
                break;
            case "Table":
                this._Table.push(stored)
                this.updateStorage();
                break;
            case "Reservations":
                this._Reservations.push(stored)
                this.updateStorage();
                break;
            case "Product":
                this._Product.push(stored)
                this.updateStorage();
                break;
            case "Dish":
                this._Dish.push(stored)
                this.updateStorage();
                break;
            case "Order":
                this._Order.push(stored)
                this.updateStorage();
                break;
            default:
                throw new Error("Type is not supported")
        }
    }
    //do poprawienia
    /*
    FindTable(id: any): Table {
        let table
        switch (id.constructor.Name){
            case "Name":
                table = this._Table.find(function (table: Table): boolean{
                    if(table.name === name){
                        return true
                    }else{
                        return false
                    }
                })
                break;
            case "Status":
                table = this._Table.find(function (table: Table): boolean{
                    if(table.status === status){
                        return true
                    }else{
                        return false
                    }
                })
            case "Id":
                table = this._Table.find(function (table: Table): boolean{
                    if(table.id === id){
                        return true
                    }else{
                        return false
                    }
                })
        }
        if (table)
            return table
        else 
            console.log("Table not found")
    }
    */

    private async updateStorage(): Promise<void>{
        const tmp = [this._Restaurant, this._Table, this._Reservations, this._Product, this._Dish, this._Order]

        console.log(JSON.stringify(tmp))
        try {
            await fs.promises.writeFile(this.storeFile, JSON.stringify(tmp));
        } catch (err) {
            console.log(err)
        }
    }
}


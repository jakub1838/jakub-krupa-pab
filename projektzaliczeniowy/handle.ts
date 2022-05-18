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

    constructor(){
        this.read()
    }

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

    private async updateStorage(): Promise<void>{
        const tmp = [this._Restaurant, this._Table, this._Reservations, this._Product, this._Dish, this._Order]

        console.log(JSON.stringify(tmp))
        try {
            await fs.promises.writeFile(this.storeFile, JSON.stringify(tmp));
        } catch (err) {
            console.log(err)
        }
    }

    private async read(): Promise<void>{
        try {
            const data = await fs.promises.readFile(this.storeFile, 'utf-8');
            this._Restaurant = this.Decode(JSON.parse(data)[0])
            this._Employee = this.Decode(JSON.parse(data)[1])
            this._Table = this.Decode(JSON.parse(data)[2])
            this._Reservations = this.Decode(JSON.parse(data)[3])
            this._Product = this.Decode(JSON.parse(data)[4])
            this._Dish = this.Decode(JSON.parse(data)[5])
            this._Order = this.Decode(JSON.parse(data)[6])
            return
        } catch (err) {
            console.log(err)
        }
    }

    private Decode<Type>(arg: Type[]): Type[]{
        let tmp: Type[] = [];
        arg.forEach(element => tmp.push(element))
        return tmp;
    }
}


import fs, { stat } from 'fs';
import { Restaurant } from './restaurant'
import { Employee } from './employee'
import { Table } from './table'
import { Reservations} from './reservations'
import { Product } from './product'
import { Dish } from './dish'
import { Order } from './order'
import { isConstructorDeclaration } from 'typescript';
import { RestaurantModel, DishModel, EmployeeModel, OrderModel, ProductModel, ReservationsModel, TableModel} from './dbconfig';


export class Handle{
    constructor(){
        
    }
    
    async getrestaurant(){
        return await RestaurantModel.findOne()
    }
    async getemploteyee(_id: number){
        return await EmployeeModel.findOne({_id: _id})
    }
    async getDish(name: string){
        return await DishModel.findOne({name: name})
    }
    async getOrder(_id: number){
        return await OrderModel.findOne({_id: _id})
    }
    async getProduct(name: string){
        return await ProductModel.findOne({name: name})
    }
    async getReservation(_id: number){
        return await ReservationsModel.findOne({_id: _id})
    }
    async getTable(name: string){
        return await TableModel.findOne({name: name})
    }

    async getEmployees(){
        return await EmployeeModel.find()
    }
    async getDishes(){
        return await DishModel.find()
    }
    async getOrders(){
        return await OrderModel.find()
    }
    async getProducts(){
        return await ProductModel.find()
    }
    async getReservations(){
        return await ReservationsModel.find()
    }
    async getTables(){
        return await TableModel.find()
    }

    async postRestaurant(restaurant: Restaurant){
        const newrestaurant = new RestaurantModel(restaurant)
        return await newrestaurant.save()
    }
    async postEmployee(employee: Employee){
        const newemployee = new EmployeeModel(employee)
        return await newemployee.save()
    }
    async postDish(dish: Dish){
        const newdish = new DishModel(dish)
        return await newdish.save()
    }
    async postOrder(order: Order){
        const neworder = new OrderModel(order)
        return await neworder.save()
    }
    async postProduct(product: Product){
        const newproduct = new ProductModel(product)
        return await newproduct.save()
    }
    async postReservation(reservation: Reservations){
        const newreservation = new ReservationsModel(reservation)
        return await newreservation.save()
    }
    async postTable(table: Table){
        const newtable = new TableModel(table)
        return await newtable.save()
    }

    async putRestaurant(restaurant: Restaurant, name: string){
        return await RestaurantModel.findOneAndUpdate({name: name}, restaurant)
    }
    async putEmployee(employee: Employee, _id: number){
        return await EmployeeModel.findOneAndUpdate({_id: _id}, employee)
    }
    async putDish(dish: Dish, name: string){
        return await DishModel.findOneAndUpdate({name: name}, dish)
    }
    async putOrder(order: Order, _id: number){
        return await OrderModel.findOneAndUpdate({_id: _id}, order)
    }
    async putProduct(product: Product, name: string){
        return await ProductModel.findOneAndUpdate({name: name}, product)
    }
    async putReservation(reservation: Reservations, _id: number){
        return await ReservationsModel.findOneAndUpdate({_id: _id}, reservation)
    }
    async putTable(table: Table, name: string){
        return await TableModel.findOneAndUpdate({name: name}, table)
    }

   
    async deleteEmployee(_id: number){
        return await EmployeeModel.findOneAndDelete({_id: _id})
    }
    async deleteDish(name: string){
        return await DishModel.findOneAndDelete({name: name})
    }
    async deleteOrder(_id: number){
        return await OrderModel.findOneAndDelete({_id: _id})
    }
    async deleteProduct(name: string){
        return await ProductModel.findOneAndDelete({name: name})
    }
    async deleteReservation(_id: number){
        return await ReservationsModel.findOneAndDelete({_id: _id})
    }
    async deleteTable(name: string){
        return await TableModel.findOneAndDelete({name: name})
    }

/*
    private async updateStorage(): Promise<void>{
        const tmp = [this._Restaurant, this._Table, this._Reservations, this._Product, this._Dish, this._Order]

        console.log(JSON.stringify(tmp))
        try {
            await fs.promises.writeFile(this.storeFile, JSON.stringify(tmp));
        } catch (err) {
            console.log(err)
        }
    }*/
}


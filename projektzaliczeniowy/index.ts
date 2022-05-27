import express from "express";
import jsonwebtoken from "jsonwebtoken";
import e, { Request, Response } from "express";
import { sortAndDeduplicateDiagnostics } from "typescript";
import { Dish } from "./dish";
import { Employee } from "./employee";
import { Order } from "./order";
import { demand, Product } from "./product";
import { Reservations } from "./reservations";
import { Restaurant } from "./restaurant";
import { Table } from "./table";
import { DishModel } from "./dbconfig";
import { Handle } from "./handle";

const app = express();
app.use(express.json());
const StorageHandler = new Handle();

app.get("/restaurant", async (req: Request, res: Response) => {
  const restaurant = await StorageHandler.getrestaurant();
  res.status(200).send(restaurant);
})
app.get("/employee/:id", async (req: Request, res: Response) => {
  const employee = await StorageHandler.getemploteyee(+req.params.id);
  if (employee) {
    res.status(200).send(employee);
  } 
  else {
    res.status(404).send("Employee not found");
  }
})
app.get("/dish/:name", async (req: Request, res: Response) => {
    const dish = await StorageHandler.getDish(req.params.name);
    if (dish) {
        res.status(200).send(dish);
    }
    else {
        res.status(404).send("Dish not found");
    }
})
app.get("/order/:id", async (req: Request, res: Response) => {
    const order = await StorageHandler.getOrder(+req.params.id);
    if (order) {
        res.status(200).send(order);
    }
    else {
        res.status(404).send("Order not found");
    }
})
app.get("/product/:name", async (req: Request, res: Response) => {
    const product = await StorageHandler.getProduct(req.params.name);
    if (product) {
        res.status(200).send(product);
    }
    else {
        res.status(404).send("Product not found");
    }
})
app.get("/reservation/:id", async (req: Request, res: Response) => {
    const reservation = await StorageHandler.getReservation(+req.params.id);
    if (reservation) {
        res.status(200).send(reservation);
    }
    else {
        res.status(404).send("Reservation not found");
    }
})
app.get("/table/:name", async (req: Request, res: Response) => {
    const table = await StorageHandler.getTable(req.params.name);
    if (table) {
        res.status(200).send(table);
    }
    else {
        res.status(404).send("Table not found");
    }
})
app.get("/employees", async (req: Request, res: Response) => {
    const employees = await StorageHandler.getEmployees();
    res.status(200).send(employees)
})
app.get("/dishes", async (req: Request, res: Response) => {
    const dishes = await StorageHandler.getDishes();
    res.status(200).send(dishes)
})
app.get("/orders", async (req: Request, res: Response) => {
    const orders = await StorageHandler.getOrders();
    res.status(200).send(orders)
})
app.get("/products", async (req: Request, res: Response) => {
    const products = await StorageHandler.getProducts();
    res.status(200).send(products)
})
app.get("/reservations", async (req: Request, res: Response) => {
    const reservations = await StorageHandler.getReservations();
    res.status(200).send(reservations)
})
app.get("/tables", async (req: Request, res: Response) => {
    const tables = await StorageHandler.getTables();
    res.status(200).send(tables)
})
app.get("/product/sort/:order", async (req: Request, res: Response) => {
    if(req.params.order == "asc"){
        const products = await StorageHandler.getProducts();
        products.sort((a, b) => a.name.localeCompare(b.name));
        res.status(200).send(products)
    }
})
app.post("/employee", async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.surname || !req.body.category){
        res.status(400).send("Bad request");
    }
    const employeebody = new Employee(req.body.name, req.body.surname, req.body.category);
    const employee = await StorageHandler.postEmployee(employeebody);
    res.status(200).send(employee);
})
app.post("/dish", async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.price || !req.body.category){
        return res.status(400).send("Bad request");
    }
    const dishbody = new Dish(req.body.name, req.body.price, req.body.category);
    const dish = await StorageHandler.postDish(dishbody);
    res.status(200).send(dish);
})
app.post("/order", async (req: Request, res: Response) => {
    if (!req.body.employee || !req.body.dishes || !req.body.status || !req.body.table || !req.body.total){
        res.status(400).send("Bad request");
    }
    //login employee

    const orderbody = new Order(req.body.table, req.body.employee, req.body.dishes, req.body.status, req.body.total);
    const order = await StorageHandler.postOrder(orderbody);
    res.status(200).send(order);
})
app.post("/product", async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.price || !req.body.unitOfMeasure || !req.body.quantity || !req.body.demand){
       return res.status(400).send("Bad request cokolwiek");
    }
    const productbody = new Product(req.body.name, req.body.price, req.body.quantity, req.body.unitOfMeasure, req.body.demand);
    console.log(productbody)
    const product = await StorageHandler.postProduct(productbody);
    res.status(200).send(product);
})
app.post("/reservation", async (req: Request, res: Response) => {
    if (!req.body.client || !req.body.table || !req.body.start || !req.body.end){
        res.status(400).send("Bad request");
    }
    //check if reservation dont overlap 

    const reservationbody = new Reservations(req.body.table, req.body.start, req.body.end, req.body.client);
    const reservation = await StorageHandler.postReservation(reservationbody);
    res.status(200).send(reservation);
})
app.post("/table", async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.status || !req.body.numberOfPeople){
        res.status(400).send("Bad request");
    }
    const tablebody = new Table(req.body.name, req.body.status, req.body.numberOfPeople);
    const table = await StorageHandler.postTable(tablebody);
    res.status(200).send(table);
})

app.put("/employee/:id", async (req: Request, res: Response) => {
    const employeebody = new Employee(req.body.name ?? undefined, req.body.surname ?? undefined, req.body.category ?? undefined);
    const employee = await StorageHandler.putEmployee(employeebody, +req.params.id);
    res.status(200).send(employee);
})
app.put("/dish/:name", async (req: Request, res: Response) => {
    const dishbody = new Dish(req.body.name ?? undefined, req.body.price ?? undefined, req.body.description ?? undefined);
    const dish = await StorageHandler.putDish(dishbody, req.params.name);
    res.status(200).send(dish);
})
app.put("/order/:id", async (req: Request, res: Response) => {
    const orderbody = new Order(req.body.table ?? undefined, req.body.employee ?? undefined, req.body.dishes ?? undefined, req.body.status ?? undefined, req.body.total ?? undefined);
    const order = await StorageHandler.putOrder(orderbody, +req.params.id);
    res.status(200).send(order);
})
app.put("/product/:name", async (req: Request, res: Response) => {
    const productbody = new Product(req.body.name ?? undefined, req.body.price ?? undefined, req.body.quantity ?? undefined , req.body.unitOfMeasure ?? undefined, req.body.demand ?? undefined);
    const product = await StorageHandler.putProduct(productbody, req.params.name);
    res.status(200).send(product);
})
app.put("/reservation/:id", async (req: Request, res: Response) => {
    const reservationbody = new Reservations(req.body.table ?? undefined, req.body.start ?? undefined, req.body.end ?? undefined, req.body.client ?? undefined);
    const reservation = await StorageHandler.putReservation(reservationbody, +req.params.id);
    res.status(200).send(reservation);
})
app.put("/table/:name", async (req: Request, res: Response) => {
    const tablebody = new Table(req.body.name ?? undefined, req.body.status ?? undefined, req.body.numberOfPeople ?? undefined);
    const table = await StorageHandler.putTable(tablebody, req.params.name);
    res.status(200).send(table);
})

app.delete("/employee/:id", async (req: Request, res: Response) => {
    const employee = await StorageHandler.deleteEmployee(+req.params.id);
    res.status(200).send("Deleted");
})
app.delete("/dish/:name", async (req: Request, res: Response) => {
    const dish = await StorageHandler.deleteDish(req.params.name);
    res.status(200).send("Deleted");
})
app.delete("/order/:id", async (req: Request, res: Response) => {
    const order = await StorageHandler.deleteOrder(+req.params.id);
    res.status(200).send("Deleted");
})
app.delete("/product/:name", async (req: Request, res: Response) => {
    const product = await StorageHandler.deleteProduct(req.params.name);
    res.status(200).send("Deleted");
})
app.delete("/reservation/:id", async (req: Request, res: Response) => {
    const reservation = await StorageHandler.deleteReservation(+req.params.id);
    res.status(200).send("Deleted");
})
app.delete("/table/:name", async (req: Request, res: Response) => {
    const table = await StorageHandler.deleteTable(req.params.name);
    res.status(200).send("Deleted");
})

app.listen(3000);

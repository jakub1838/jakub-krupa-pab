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
import { Status, Table } from "./table";
import { DishModel, ReservationsModel } from "./dbconfig";
import { Handle } from "./handle";
import { table } from "console";

const app = express();
app.use(express.json());
const StorageHandler = new Handle();

app.get("/restaurant", async (req: Request, res: Response) => {
  res.status(200).send(await StorageHandler.getRestaurant());
})
app.get("/employee/:id", async (req: Request, res: Response) => {
  const employee = await StorageHandler.getEmployee(req.params.id);
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
    const order = await StorageHandler.getOrder(req.params.id);
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
    const reservation = await StorageHandler.getReservation(req.params.id);
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
app.get("/tables/free", async (req: Request, res: Response) => {
    const now = new Date(Date.now());
    let freeTables: Table[] = [];
    //let reservations = (await StorageHandler.getReservations()).filter(reservation => reservation.start < now && reservation.end > now ); 
    let tmpTables = await StorageHandler.getTables();
    //let occuipiedTables = (await StorageHandler.getTables()).filter(i => reservations.some(reservations => reservations.table == i));
    freeTables =tmpTables.filter(i => i.status == Status.free)
    res.status(200).send(freeTables)
})
app.post("/tables/free/numberOfPeople", async (req: Request, res: Response) => {
    if(!req.body.date || !req.body.numberOfPeople) {
        return res.status(400).send("Bad request");
    }
    const now = new Date(req.body.date);
    let freeTables: Table[] = [];
    let reservations = (await StorageHandler.getReservations()).filter(reservation => reservation.start < now && reservation.end > now );
    let tmpTables = await StorageHandler.getTables();
    let occuipiedTables = (await StorageHandler.getTables()).filter(i => reservations.some(reservations => reservations.table == i));
    tmpTables.forEach(i => {
        if (!occuipiedTables.includes(i)) {
            freeTables.push(i);
        }
    })
    let freeTableForDate = freeTables.filter(i => i.numberOfPeople >= req.body.numberOfPeople);
    res.status(200).send(freeTableForDate);
})
app.get("/products/sort/:page/:order", async (req: Request, res: Response) => {
    switch (req.params.order) {
    case "asc": {
        const products = await StorageHandler.getProducts();
        products.sort((a, b) => a.name.localeCompare(b.name));
        res.status(200).send(products.slice(3 * (+req.params.page), 3 * (+req.params.page) + 3))
        
        break;
    }
    case "desc": {
        const products = await StorageHandler.getProducts();
        products.sort((a, b) => b.name.localeCompare(a.name));
        res.status(200).send(products.slice(3 * (+req.params.page), 3 * (+req.params.page) + 3))
        
        break;
    }
    default: {
        const products = await StorageHandler.getProducts();
        res.status(200).send(products.slice(3 * (+req.params.page), 3 * (+req.params.page) + 3))
       
        break;
    }
}
})
app.get("/tables/report/:name", async (req: Request, res: Response) => {
    const table = await StorageHandler.getTable(req.params.name)
    console.log(table) 
    if (!table)
        return res.status(404).send("Not found")
    const orders = await StorageHandler.getOrders()

    const raport = orders.filter(element => element.table.name == table.name)
    res.status(200).send(raport)
})
app.post("/tables/report/timeperiod", async (req: Request, res: Response) => {
    const orders = await StorageHandler.getOrders()
    const raport = orders.filter(element => element.date >= new Date(req.body.start) && element.date <= new Date(req.body.end))
    res.status(200).send(raport)

})
app.post("/tables/report/timeperiod/income", async (req: Request, res: Response) => {
    const orders = await StorageHandler.getOrders()
    const raport = orders.filter(element => element.date >= new Date(req.body.start) && element.date <= new Date(req.body.end))
    let income = 0
    console.log(raport)
    raport.forEach(element => {
        income += element.total
    })
    res.status(200).send(income.toString())
    
})

app.post("/employee", async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.surname || !req.body.category){
        return res.status(400).send("Bad request");
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
    if(!req.headers.authorization){
        return res.status(400).send("Bad request");
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded: any = jsonwebtoken.verify(token, "2137");
    if(!decoded){
        return res.status(400).send("Bad request");
    }
    const employee = await StorageHandler.getEmployee(decoded.id);
    const table = await StorageHandler.getTable(req.body.table);
    if(!employee)
        return res.status(401).send("CKX Bez odbioru.")
    if (!req.body.dishes || !req.body.status || !req.body.table){
        return res.status(400).send("Bad request");
    }
    const dishesFromBody:string[] = req.body.dishes
    const dishes:Dish[] = []
    for(const dishTmp of dishesFromBody){
        const tmp = await StorageHandler.getDish(dishTmp)
        if(tmp)
        dishes.push(tmp)
        else
        return res.status(404).send("hejiojfsjdf")
    }

    const orderbody = new Order(employee, dishes, req.body.status, table, req.body.total);
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
        return res.status(400).send("Bad request");
    }
    const _Reservations = await StorageHandler.getReservations()
    const _Tables = await StorageHandler.getTables()
    const reqStart = new Date(req.body.start)
    const reqEnd = new Date(req.body.end)
    //let reservations = _Reservations.filter((elemeent:Reservations) => true)
    let reservations = _Reservations.filter(rezerwacja => (reqStart <= rezerwacja.start && rezerwacja.start < reqEnd) || (reqEnd >= rezerwacja.end && rezerwacja.end > reqStart))
    const b:Table = await StorageHandler.getTable(req.body.table)
    if(!b){
        return res.status(400).send("Bad request")
    }
    if(reservations.some(reservation => reservation.table.name == b.name))
        return res.status(400).send("Table is occupied")
    const tmp = new Reservations(b, req.body.start, req.body.end, req.body.client )
    await StorageHandler.postReservation(tmp)
    res.status(200).send("OK")
})
app.post("/table", async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.status || !req.body.numberOfPeople){
       return res.status(400).send("Bad request");
    }
    const tablebody = new Table(req.body.name, req.body.numberOfPeople, req.body.status,);
    const table = await StorageHandler.postTable(tablebody);
    res.status(200).send(table);
})
app.post("/login/:id", async (req: Request, res: Response) => {
    let employee : any
    try{
        employee = await StorageHandler.getEmployee(req.params.id);
        if(employee){
            res.status(200).send(jsonwebtoken.sign({id: employee._id}, "2137", {expiresIn: "1h"}));
        }
        else{
            return res.status(404).send("Employee not found");
        }
    }
    catch(err){
        return res.status(404).send("Employee not found");
    }
})

app.put("/employee/:id", async (req: Request, res: Response) => {
    const employeebody = new Employee(req.body.name ?? undefined, req.body.surname ?? undefined, req.body.category ?? undefined);
    const employee = await StorageHandler.putEmployee(employeebody, req.params.id);
    res.status(200).send(employee);
})
app.put("/dish/:name", async (req: Request, res: Response) => {
    const dishbody = new Dish(req.body.name ?? undefined, req.body.price ?? undefined, req.body.description ?? undefined);
    const dish = await StorageHandler.putDish(dishbody, req.params.name);
    res.status(200).send(dish);
})
app.put("/order/:id", async (req: Request, res: Response) => {
    const orderbody = new Order(req.body.table ?? undefined, req.body.employee ?? undefined, req.body.dishes ?? undefined, req.body.status ?? undefined, req.body.total ?? undefined);
    const order = await StorageHandler.putOrder(orderbody, req.params.id);
    res.status(200).send(order);
})
app.put("/product/:name", async (req: Request, res: Response) => {
    const productbody = new Product(req.body.name ?? undefined, req.body.price ?? undefined, req.body.quantity ?? undefined , req.body.unitOfMeasure ?? undefined, req.body.demand ?? undefined);
    
    const product = await StorageHandler.putProduct(productbody, req.params.name);
    res.status(200).send(product);
})
app.put("/reservation/:id", async (req: Request, res: Response) => {
    const reservationbody = new Reservations(req.body.table ?? undefined, req.body.start ?? undefined, req.body.end ?? undefined, req.body.client ?? undefined);
    const reservation = await StorageHandler.putReservation(reservationbody, req.params.id);
    res.status(200).send(reservation);
})
app.put("/table/:name", async (req: Request, res: Response) => {
    const tablebody = new Table(req.body.name ?? undefined, req.body.numberOfPeople ?? undefined, req.body.status ?? undefined,);
    const table = await StorageHandler.putTable(tablebody, req.params.name);
    res.status(200).send(table);
})
app.put("/restaurant/:name", async (req: Request, res: Response) => {
    const restaurantbody = new Restaurant(req.body.name ?? undefined, req.body.addres ?? undefined, req.body.telephone ?? undefined, req.body.nip ?? undefined, req.body.email ?? undefined, req.body.www ?? undefined);
    const restaurant = await StorageHandler.putRestaurant(restaurantbody, req.params.name);
    res.status(200).send(restaurant);
})

app.delete("/employee/:id", async (req: Request, res: Response) => {
    const employee = await StorageHandler.deleteEmployee(req.params.id);
    res.status(200).send("Deleted");
})
app.delete("/dish/:name", async (req: Request, res: Response) => {
    const dish = await StorageHandler.deleteDish(req.params.name);
    res.status(200).send("Deleted");
})
app.delete("/order/:id", async (req: Request, res: Response) => {
    const order = await StorageHandler.deleteOrder(req.params.id);
    res.status(200).send("Deleted");
})
app.delete("/product/:name", async (req: Request, res: Response) => {
    const product = await StorageHandler.deleteProduct(req.params.name);
    res.status(200).send("Deleted");
})
app.delete("/reservation/:id", async (req: Request, res: Response) => {
    const reservation = await StorageHandler.deleteReservation(req.params.id);
    res.status(200).send("Deleted");
})
app.delete("/table/:name", async (req: Request, res: Response) => {
    const table = await StorageHandler.deleteTable(req.params.name);
    res.status(200).send("Deleted");
})

app.listen(3000);

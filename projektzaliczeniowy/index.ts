import express, { response } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import {Request, Response} from 'express'
import { sortAndDeduplicateDiagnostics } from 'typescript'
import { Dish } from './dish'
import { Employee } from './employee'
import { Order } from './order'
import { Product } from './product'
import { Reservations } from './reservations'
import { Restaurant } from './restaurant'
import { Table } from './table'
import { request } from 'http'
import { Handle } from './handle'

const sHandle = new Handle();
const app = express()
app.use(express.json())

app.get('/restaurant', (function (req: Request, res: Response){
    res.status(200).send(sHandle.restaurant)
}))
/*
app.put('/restaurant', (function (req: Request, res: Response){
    if (req.body.name)
    sHandle.restaurant.name = req.body.name <------- ???
}))
*/

app.listen(3000)
import express from 'express'
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


const app = express()
app.use(express.json())


app.listen(3000)
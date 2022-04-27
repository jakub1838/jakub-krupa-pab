import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import {Request, Response} from 'express'
import { sortAndDeduplicateDiagnostics } from 'typescript'
import { dish } from './dish'
import { employee } from './employee'
import { order } from './order'
import { product } from './product'
import { reservations } from './reservations'
import { restaurant } from './restaurant'
import { table } from './table'


const app = express()
app.use(express.json())


app.listen(3000)
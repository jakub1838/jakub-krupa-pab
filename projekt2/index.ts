import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import {Request, Response} from 'express'
import { sortAndDeduplicateDiagnostics } from 'typescript'
import { Note } from './note'
import { Tag } from './tag'
import { Handle } from './handle'
import { User } from './user'

const sHandle = new Handle()
const app = express()
app.use(express.json())



app.listen(3000)
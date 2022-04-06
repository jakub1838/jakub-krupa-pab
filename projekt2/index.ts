import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import {Request, Response} from 'express'
import { sortAndDeduplicateDiagnostics } from 'typescript'

const jwt = jsonwebtoken()
const app = express()

interface Note {
    title:string
    content:string
    createDate:string
    tags?:string[]
    id?:number
}

const notes: Note[] = [] 
app.use(express.json())

//dodawanie ??
app.post('/note', function(req, res){
    const note : Note = req.body;
    note.id=Date.now()
    notes.push(note)

    res.status(201).send(note.id);

})

//odczytanie
app.get('/note/:id', function(req, res){
    const id: number = parseInt(req.params.id, 10);

        const item: Note = note.find(id);
    
        if (item) {
          return res.status(200).send(item);
        }

    res.status(404).send("item not found");
})
//edycja ??
app.put('/note/:id', function(req, res){

})
//usuwanie
app.delete('/note/:id', function(req, res){
    const id: number = parseInt(req.params.id, 10);
    const item: Note = note.find(id);
    const del: Note = note.splice(id);
    
        if (item) {
            del
            return res.status(204);
        }

        res.status(400).send("item not found");
})
/*
//login
app.post('/login', function(req: Request, res: Response){
    const username: User = req.params
    const token = jwt.sign(payload, 'shhhhh')

})
*/

app.listen(3000)
import express from 'express'
import {Request, Response} from 'express'


const app = express()

interface Note {
    title:string
    content:string
    createDate:string
    tags?:string[]
    id?:number
}

const notes: Note[] = [] 

//let note = notes.find( note => note.id === 30)
app.use(express.json())


app.post('/', function (req: Request, res: Response) {
    Note 
    res.status(201).send(note)
})

//odczytanie notatki
/*
app.get('/', function (req, res) {
    //const note = {title: "asd"}
    const id = req.query.id
    if (){
        res.send(note).status(200)
    }else{
        res.send(404).send('Missing file')
    }
})*/

app.delete('/', function (req: Request, res: Response ){
    
})

app.listen(3000)
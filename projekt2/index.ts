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

app.post('/note', function (req: Request, res: Response) {
    if (!req.headers.authorization)
        return res.status(401).send("Login Required")
    if (!sHandle.VerifyToken(User.DecodeHeader(req.headers.authorization)))
        return res.status(401).send("Login Required")
    if (!req.body.title && req.body.content)
        return res.status(400).send("Add title and content ")
    if (req.body.tags.constructor.name !== "Array")
        return res.status(400).send("Add tags")
    let note
    try { note = new Note(req.body.title, req.body.content, req.body.tags, sHandle.FindUser(User.DecodeHeader(req.headers.authorization)), req.body.isPublic) }
    catch (error) {
        return res.status(401).send(error)
    }
    sHandle.Store(note)
    return res.status(200).send(note)

})

app.get('/note', function (req: Request, res: Response) {
    if (!req.headers.authorization)
        return res.status(401).send("Login Required")
    if (!sHandle.VerifyToken(User.DecodeHeader(req.headers.authorization)))
        return res.status(401).send("Login Required")
    let filteredNotes = sHandle.notes.filter(function (note: Note) {
        if ((note.user.token === User.DecodeHeader(req.headers.authorization ?? "123")) || (note.isPublic == true))
            return true
        else
            return false
    })
    res.status(200).send(filteredNotes)
})

app.get('/note/:id', function (req: Request, res: Response) {
    if (!req.headers.authorization)
        return res.status(401).send("Login Required")
    if (!sHandle.VerifyToken(User.DecodeHeader(req.headers.authorization)))
        return res.status(401).send("Login Required")
    try {
        if (!sHandle.VerifyToken(User.DecodeHeader(req.headers.authorization ?? "123")))
            return res.status(401).send("Login Required")
        let note = sHandle.FindNote(+req.params.id)
        if (!(note.user.token == req.headers.authorization ?? "123") || (note.isPublic == false))
            return res.status(401).send("Login Required")
        res.status(200).send(note)
    }
    catch (error) { res.status(404).send(error) }
})

app.put('/note/:id',
    function (req: Request, res: Response) {
    if (!req.headers.authorization)
        return res.status(401).send("Login Required")
    if (!sHandle.VerifyToken(User.DecodeHeader(req.headers.authorization)))
        return res.status(401).send("Login Required")
    let note
    let editedNote
    try {
        note = sHandle.FindNote(+req.params.id)
        editedNote = new Note(req.body.title ?? note.title, req.body.content ?? note.content, req.body.tags ?? note.tags, sHandle.FindUser(req.headers.authorization))
    } catch (error) {
        res.status(401).send(error)
    }
    if (!note)
        return res.status(400).send("Something went wrong")
    if (!(note.user.token === req.headers.authorization))
        return res.status(401).send("Login Required")
    sHandle.Update(editedNote, +req.params.id)
    res.status(200).send(sHandle.FindNote(+req.params.id))
    })

app.post('/tag',function (req: Request, res: Response) {
    if (!req.body.name)
        res.status(401).send("Give a tag a name")
    else
        res.status(400).send("Tag needs a name")
    const tag = sHandle.FindTag(req.body.name)
    if (tag)
        res.status(401).send("Tag does already exists")
    else
        res.status(200).send(tag)
})

app.get('/tag', function (req: Request, res: Response) {
    res.status(200).send(sHandle.tags)
})

app.get('/tag/:id', function (req: Request, res: Response) {
    let tag
    try {
        tag = sHandle.FindTag(+req.params.id)
    } catch (error) {
        res.status(404).send(error)
    }
    res.status(200).send(tag)
})


app.post('/login', function (req: Request, res: Response) {
    if (!(req.body.login && req.body.password))
        res.status(401).send("Input login and password")
    const tmp = new User(req.body.login, req.body.password)
    let user
    try {
        user = sHandle.FindUser(tmp.token)
    } catch (error) {
        sHandle.Store(tmp)
    }
    if (tmp)
        res.status(200).send(tmp.token)
    else
        res.status(400).send("Something went wrong")
})


app.delete('/note/:id',function (req: Request, res: Response) {
    if (!req.headers.authorization)
        return res.status(401).send("Login Required")
    if (!sHandle.VerifyToken(User.DecodeHeader(req.headers.authorization)))
        return res.status(401).send("Login Required")
    let note = sHandle.FindNote(+req.params.id)
    if (!(note.user.token === req.headers.authorization ?? "123"))
        return res.status(401).send("Login Required")
    try {
        sHandle.DeleteNote(+req.params.id)
    } catch (error) {
        res.status(401).send(error)
    }
        res.status(200).send("Note removed")
})

app.delete('/tag/:id',function (req: Request, res: Response) {
    try {
        sHandle.DeleteTag
    } catch (error) {
        res.status(401).send(error)
    }
        res.status(200).send("Tag removed")
})


app.put('/tag/:id',function (req: Request, res: Response) {
    let tag
    let editedTag
    try {
        tag = sHandle.FindTag(+req.params.id)
        editedTag = new Tag(req.body.name ?? tag.name)
    } catch (error) {
        res.status(404).send(error)
    }
    sHandle.Update(editedTag, +req.params.id)
})


app.listen(3000)
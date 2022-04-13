import fs from 'fs';
import { Note } from './note'
import { Tag } from './tag'
import { User } from './user'

export class Handle{
    private _notes: Note[] = [];
    private _tags: Tag[] = [];
    private _users: User[] = [];
    private storeFile = "Storage.json"
    private usertest = new User("Test", "password123")

    constructor(){
        this.readStorage()
    }

    get notes(): Note[] {
        return this._notes;
    }
    get tags(): Tag[] {
        return this._tags
    }
    get users(): User[] {
        return this._users
    }

    Store(stored: any){
        switch (stored.constructor.name){
            case "User":
                this._users.push(stored)
                this.updateStorage();
                break;
            case "Tag":
                this._tags.push(stored)
                this.updateStorage();
                break;
            case "Note":
                //dodać obsługę tagów
                this._notes.push(stored)
                this.updateStorage();
                break;
            default:
                throw new Error("Type is not supported")
        }
    }
    //Odnajdywanie notatki
    FindNote(id: number): Note{
        const note = this._notes.find(function (note: Note): boolean {
            if (note.id === id) {
                return true
            }
            else {
                return false
            }
        })
        if (note)
            return note
        else
            throw new Error("Note not found")
    }

    FindNoteIndex(id: number): number{
        const note = this._notes.findIndex(function (note: Note): boolean {
            if (note.id === id) {
                return true
            }
            else {
                return false
            }
        })
        if (note)
            return note
        else
            throw new Error("Note not found")
    }

    FindUserIndex(id: number): number{
        const note = this._users.findIndex(function (note: User): boolean {
            if (note.id === id) {
                return true
            }
            else {
                return false
            }
        })
        if (note)
            return note
        else
            throw new Error("User not found")
    }

    //usuwanie
    DeleteNote(id: number){
        this._notes.splice(this.FindNoteIndex(id), 1)
        this.updateStorage()
    }

    DeleteUser(id: number){
        this._users.splice(this.FindUserIndex(id), 1)
        this.updateStorage()
    }
    

    private async read(): Promise<void>{
        try {
            const data = await fs.promises.readFile(this.storeFile, 'utf-8');
            this._notes = this.Decode(JSON.parse(data)[0])
            this._tags = this.Decode(JSON.parse(data)[1])
            this._users = this.Decode(JSON.parse(data)[2])
            return
        } catch (err) {
            console.log(err)
        }
    }

    private async updateStorage(): Promise<void>{
        const tmp = [this._notes, this._tags, this._users]

        console.log(JSON.stringify(tmp))
        try {
            await fs.promises.writeFile(this.storeFile, JSON.stringify(tmp));
        } catch (err) {
            console.log(err)
        }
    }

    private async readStorage(): Promise<void> {
        try {
            const data = await fs.promises.readFile(this.storeFile, 'utf-8');
            this._notes = this.Decode(JSON.parse(data)[0])
            this._tags = this.Decode(JSON.parse(data)[1])
            this._users = this.Decode(JSON.parse(data)[2])
            return
        } catch (err) {
            console.log(err)
        }
    }

    private Decode<Type>(arg: Type[]): Type[]{
        let tmp: Type[] = [];
        arg.forEach(element => tmp.push(element))
        return tmp;
    }
}


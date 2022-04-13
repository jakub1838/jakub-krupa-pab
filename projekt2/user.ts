import jwt from 'jsonwebtoken';
import { Note } from './note';

export class User{
    id: number
    token: string
    constructor(login: string, password: string) {
        this.token = jwt.sign(login.concat(password), "password123")
        this.id = Date.now()
    }
    static DecodeHeader(header: string): string {
        const tmp = header.split(" ", 2)
        if (!(tmp[0] === "Bearer"))
            throw new Error("Bad authorisation")
        return tmp[1]
    }
}
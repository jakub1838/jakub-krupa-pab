export class Restaurant {
    name: string
    addres: string
    telephone: string
    nip: string
    email: string
    www: string
    id: number
    constructor(name: string, addres: string, telephone: string, nip: string, email: string, www: string){
        this.name = name;
        this.addres = addres;
        this.telephone = telephone;
        this.nip = nip;
        this.email = email;
        this.www = www;
        this.id = Date.now()
    }
}
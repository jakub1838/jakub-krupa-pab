//npx nodemon ./projekt2/indexedDB.ts

const studenci: any [] = [] //stala, typ nie jest wymagany, chyba że nie ma przypisanej wartości
const note : any= {
    title: "aaaa"
}

note.title = "bbbb" // stałe mogą się zmienić
note.asda = 12 //jeżeli tabela będzie mieć typ any to przejdzie
let wiek = 12
wiek = undefined //wszystko jest nullable

wiek = note as any

//string na liczbe
//liczba na string

const kasia = {imie:'Kasia', wiek:20}
const tomek = {imie:'Tomek', wiek:24}
studenci.push([kasia, tomek]);

//łączenie tablic
const a1 = [1,2,4]
const a2 = [3,5,8]
const b  = [...a1,...a2]

//przechodzenie po tablicy (iterowanie)

//1 sposób
b.forEach(value =>{

})

//2 sposób
for (const item of b)
{

}

//znajdowanie elementu w tablcy (find)
const kasiaCopy = studenci.find(searchStudent)  //to referencja do stałej, kiedy tutaj się zmieni to zmieni sie również tam

const tomekIdx = studenci.findIndex(student => student.imie === 'Tomek')

const kasiaIdx = studenci.findIndex(searchStudent)
function searchStudent(student:any) {

}

//usuwanie elementu z tablicy (wycinanie)
b.splice(0,1)

//filter
const studentBefore20 = studenci.filter(st => st.wiek<20)

//mapowanie
studenci.map(st => {
    st.wiek++
    return st
})

//uwaga na to, bo można zmienić długość
studenci.length = 0

//wypisywanie właściwości obiektu, w JS obiekty to tablice, a tablice to obiekty
for(const stKey in studenci) {
    const im = studenci[stKey]
}

//odwoływanie się do właściwości obiektu, pytajniki mówią że może taki obiekt nie istnieć
const x = foo?.bar?.baz()

//sprawdzaie czy zmienna jest null/undefined i przypisanie
let y 
if(x!==null){
    y=x
}
else {
    y = 5
}
//zamiast robić tego u góry skróć w taki sposób jak niżej
y = x ?? 5

//tworzenie interfejsu, klasy, kontruktora, getera
interface Student {
    imie:string;
    wiek:number;
}

class Student { 
     imie:string;
    _rokStudiów: number;
    wiek: number;
    constructor(st: Student){
        this.imie = st.imie;
        this.wiek = st.wiek;
    }
    
    get rokStudiow(): number { 
        return this._rokStudiów;
    }

    //jeżeli nie stworzę setera to obiek będzie read only
    
    set rokStudiow(val : number) {
        this._rokStudiów = val;
    }

    getRokStudiow(): number {
        return this._rokStudiów;
    }
    
}

let jozio: Student;
jozio._rokStudiów = 12


.splice
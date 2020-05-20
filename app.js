let formKorisnik = document.querySelector('#formKorisnik');
let inputKorisnik = document.querySelector('#inputKorisnik');
let btnUpdate = document.querySelector('#btnKorisnik');
let btnPojmovi = document.querySelector('#btnPojmovi');
 
 
 
 
 
 
 class Pojmovi{
    constructor (k, kat, s){
        this.korisnik = k;
        this.kategorija = kat;
        this.pojam = db.collection('pojmovi');
        this.slovo = s
    }

    set korisnik(k){
        this._korisnik = k;
    }
    get korisnik(){
        return this._korisnik;
    }
    set kategorija(kat){
        this._kategorija = kat;
    }
    get kategorija(){
        return this._kategorija;
    }
    set slovo(s){
        this._slovo = s;
    }
    get slovo(){
        return this._slovo;
    }
    
    updateKorisnik(noviKorisnik){
        this.korisnik = noviKorisnik;
        localStorage.setItem('korisnikLS', noviKorisnik);
    }

    async addPojam(pojam){
        let dateTmp = new Date();
        
        let noviPojam = {
            nPoj: pojam,
            korisnik: this.korisnik,
            kategorija: this.kategorija,
            pocetnoSlovo: this.slovo,
            vreme: firebase.firestore.Timestamp.fromDate(dateTmp)
        };
        let response = await this.pojam.add(noviPojam);  //kada u this.chats dodamo kreirani chat - to je odgovor koji ceka (awaits)
        console.log(response);
        return response;
    }
    
} 

let korisnik = () => {
    if(localStorage.korisnikLS){
        return localStorage.korisnikLS;
    } else {
         alert("Ime korisnika nije adekvatno. Molimo Vas vratite se na početnu stranicu.");
    }
};

let zanimljiva = new Pojmovi(korisnik(), "Grad");

formKorisnik.addEventListener('submit', (e)=>{
    e.preventDefault();
    let patternKorisnik = /^[^\s]{2,}$/;
    if(patternKorisnik.test(inputKorisnik.value)){
    zanimljiva.updateKorisnik(inputKorisnik.value);
    localStorage.korisnikLS = inputKorisnik.value;
    }
    formKorisnik.reset();
});
    

// let kolekcijaPojmovi = db.collection('pojmovi').get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             console.log(doc.id, "=>", doc.data());
//         });
//     })
//     .catch(function(error) {
//         console.log("error", error);
//     })

if(!localStorage.korisnikLS){
    btnPojmovi.addEventListener('click', e =>{
        e.preventDefault();
    })
}; 



export class Pojmovi{
    constructor ( kat, p){
        this.korisnik = localStorage.korisnikLS;
        this.kategorija = kat;
        this.pojmovi = db.collection('pojmovi');
        this.pocetnoSlovo;
        this.pojam = p;

    }
   
    set kategorija(kat){
        this._kategorija = kat;
    }
    get kategorija(){
        return this._kategorija;
    }
    set pojam(p){
        this._pojam = p;
    }
    get pojam(){
        return this._pojam;
    }
    
    // updateKorisnik(noviKorisnik){
    //     this.korisnik = noviKorisnik;
    //     localStorage.setItem('korisnikLS', noviKorisnik);
    // }

    async addPojam(){
        let dateTmp = new Date();
        let pocetnoSlovo = this.pojam;
        if((pocetnoSlovo.slice(0,2) == 'Dž') || (pocetnoSlovo.slice(0,2)=='Lj') || (pocetnoSlovo.slice(0,2)=='Nj')){
            pocetnoSlovo = pocetnoSlovo.slice(0,2)
        } else {
            pocetnoSlovo = pocetnoSlovo[0];

        }
        let pojam = this.pojam;
        
        let dokument = {
            pojam: pojam,
            korisnik: this.korisnik, //localStorage.usernameLS
            kategorija: this.kategorija,
            pocetnoSlovo: pocetnoSlovo[0].toUpperCase(),
            vreme: firebase.firestore.Timestamp.fromDate(dateTmp)
        };
        console.log(dokument.pojam);
        let response = await this.pojmovi.add(dokument);  //kada u this.chats dodamo kreirani chat - to je odgovor koji ceka (awaits)
       
        return response;
    }

    



 async proveraPojam() {
        
        this.pojmovi
        .where('kategorija', '==', this.kategorija)
        .where('pojam', '==', this.pojam)
        .get()
        .then((snapshot) =>{
            if(snapshot.docs.length == 0){
                this.addPojam();
                alert('pojam je dodat')
            } else {
                alert('Pojam vec postoji')
                    
            }
        })
        .catch(error =>{
            conssole.log('error gettng documents: ', error)
        })
          
    }


    


}

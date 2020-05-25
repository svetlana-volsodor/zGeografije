import {Pojmovi} from "./pojam.js"


let formKorisnik = document.querySelector('#formKorisnik');
let inputKorisnik = document.querySelector('#inputKorisnik');
//let btnUpdate = document.querySelector('#btnKorisnik');
let btnPojmovi = document.querySelector('#btnPojmovi');
let formPojmoviDrop = document.querySelector('#pojmoviDrop');
let inputPojam = document.querySelector('#inputPojam');
let pojamSubmit = document.querySelector('#subPojam');
let kategorijaDrop = document.querySelector('#kategorije');
let divPojam = document.querySelector('#predlogPojma');


divPojam.style.display = 'none';


console.log(inputPojam);

     
// let korisnik = () => {
//     if(localStorage.korisnikLS){
        
//         return localStorage.korisnikLS;
        

//     } else {
        
//        divPojam.style.display = "none";
//     }
// };


formKorisnik.addEventListener('submit', (e)=>{
    e.preventDefault();
    let patternKorisnik = /^[^\s]{2,}$/;
    if(patternKorisnik.test(inputKorisnik.value)){
    localStorage.setItem('korisnikLS', inputKorisnik.value);
    location.reload();
    
    } else {
        alert('Nevalidan unos! Probajte ponovo :)')
        divPojam.style.display = "none"
    }
    formKorisnik.reset();
});

if(localStorage.korisnikLS){
    divPojam.style.display = "block";
}

// let kolekcijaPojmovi = db.collection('pojmovi').get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             console.log(doc.id, "=>", doc.data());
//         });
//     })
//     .catch(function(error) {
//         console.log("error", error);
//     })





formPojmoviDrop.addEventListener ('submit', e=>{
    e.preventDefault();
    let kategorija = kategorijaDrop.value;
    let pojam = inputPojam.value;
    pojam = pojam[0].toUpperCase() + pojam.slice(1).toLowerCase();
    pojam = pojam.replace(/\s+/g, '');
    let noviPojam = new Pojmovi(kategorija, pojam);

    if(!pojam){
        alert('Unos nije validan!')
    } else {
       
        //console.log(pojam);
        noviPojam.proveraPojam();
     
    }
    formPojmoviDrop.reset();
});



  
// function sortByFrequencyAndRemoveDuplicates(array) {
//     var frequency = {}, value;
//     // compute frequencies of each value
//     for(var i = 0; i < array.length; i++) {
//         value = array[i];
//         if(value in frequency) {
//             frequency[value]++;
//         }
//         else {
//             frequency[value] = 1;
//         }
//     }
//     // make array from the frequency object to de-duplicate
//     var uniques = [];
//     for(value in frequency) {
//         if(uniques.length == 5) {
//             break;
//         }
//         else {
//             uniques.push(value);
//         }
//     }
//     // sort the uniques array in descending order by frequency
//     function compareFrequency(a, b) {
//         return frequency[b] - frequency[a];
//     }
//     return uniques.sort(compareFrequency);
// }

// db.collection('pojmovi')
// .orderBy('korisnik')
// .get()
// .then(snapshot =>{
//     let korisnici = [];
//     let topKor = [];
//     let br = 0;
//     snapshot.docs.forEach((doc, i) =>{
//         korisnici.push(doc.data().korisnik);
//     });
//     console.log(sortByFrequencyAndRemoveDuplicates(korisnici));
//     for(let i = korisnici.length; i>=0; i--){
//         br++
//         if(korisnici[i]!= korisnici[i-1]){
//             if(topKor.length == 5){
//                 break;
//             } else {
//                 topKor.push(br);
//                 br = 0;
//             }
//         }
        
//     }
//     topKor.sort((a,b)=>b-a);
//         console.log(topKor);
// })
// .catch(error =>{
//     console.log('error', error);
// });


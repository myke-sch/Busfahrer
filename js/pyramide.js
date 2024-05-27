
let karten_deck = ["karo6" ,"karo7", "karo8","karo9","karo10", "karo11", "karo12", "karo13", "karo14", "kreuz6" ,"kreuz7",
    "kreuz8", "kreuz9", "kreuz10", "kreuz11", "kreuz12", "kreuz13", "kreuz14", "herz6", "herz7", "herz8", "herz9", "herz10", "herz11",
    "herz12", "herz13", "herz14","pik6", "pik7", "pik8", "pik9", "pik10", "pik11", "pik12", "pik13", "pik14"];


let kartenGeladen = false;

let spielerPunkte = [
    [],
    [],
    [],
    [],
    [],
    [],

];

let spielerKarten123 = [
    [],
    [],
    [],
    [],
    [],
    [],

];

let reihePyramide = 1;

let busfahrer = [];
let coBusfahrer = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = function() {
    pyramideZiehen();
};


function pyramideZiehen() {
    let reihePyramide = 0;
    console.log(JSON.parse(localStorage.getItem("karten"))); //läd Karten aus Speicher
    console.log(JSON.parse(localStorage.getItem("kartenSpeiler")));
    spielerKarten123 = JSON.parse(localStorage.getItem("kartenSpeiler"));
    deck = JSON.parse(localStorage.getItem("karten"));
    console.log(deck);
    for (let i = 9; i >= 0; i--) { //erstellt Pyramide, da man Pyramide von oben nach unten legt beginen wir mit der 9. Karten und oben
        let picture = document.createElement("img");
        picture.src = "/img/" + "back" + ".png";
        //picture.onclick = flipCart();
        picture.ariaLabel = deck[i];
        picture.setAttribute("class", "image");
        picture.setAttribute("id", deck[i]);
        picture.setAttribute("id", i);
        let pic_id = picture.getAttribute("id");
        picture.onclick = function() {
            flipCart(pic_id);
        };
        let eleId = "pyramide" + (i + 1);
        document.getElementById(eleId).appendChild(picture);
        /*if (i === 9) {
            let neueZeile = document.createElement("br");
            document.body.appendChild(neueZeile);
        }
        if (i === 7) {
            let neueZeile = document.createElement("br");
            document.body.appendChild(neueZeile);
        }
        if(i === 4) {
            let neueZeile = document.createElement("br");
            document.body.appendChild(neueZeile);
        }
        else {
            console.log(i);
        }*/
    }
    localStorage.clear();
    localStorage.setItem("karten", JSON.stringify(deck));
    kartenGeladen = true;
}


function flipCart(clicked_id) { //Funktion um Karten zu drehen
    let karte = document.getElementById(clicked_id);
    //console.log(karte.id);
    //console.log(clicked_id);
    //console.log(karte);
    reiheErhoehen(karte);
    karte.style.transitionDuration = "0.75s";
    if (kartenGeladen) {
        deck.shift();
    }
    async function flip() { //async da mehrer Karten aufeinmal gedreht werden müssen
        karte.style.transform = "rotateY(-90deg)";
        await sleep(1000);
        karte.src = "/img/" + karte.ariaLabel + ".png";
        await sleep(200);
        karte.style.transform = "rotateY(0deg)";
    }

    flip();
    PyramideUeberpruefen(karte);
    if (parseInt(karte.id) === 9) { //wenn letzte Karte umgedreht ist wird der Busfahrer bestimmt
        busfahrerBestimmen(spielerKarten123);
    }
    /*karte.style.transform = "rotateY(-90deg)";
    sleep(2000).then(() => { karte.src = "/img/" + deck[0] + ".png"; })
    karte.style.transform = "rotateY(-90deg)";*/

}

function PyramideUeberpruefen(karte){
    //spielerKarten = JSON.parse(localStorage.getItem("kartenSpeiler"));
    let spielerKarten = spielerKarten123;
    let nachrichtVerteilen = document.getElementById("round");
    let spielerSchluecke = [];
    //.ariaLabel.match(/\d+/)[0]
    for (let i = 0; i < spielerKarten.length; i++) {
        for (let j = 0; j < 4; j++) {
            if (spielerKarten[i][j] === undefined){
                    continue;
            }
            else {
                //console.log(spielerKarten[i][j]);
                if (karte.ariaLabel.match(/\d+/)[0] == spielerKarten[i][j].match(/\d+/)[0]) { //wenn Kartenwert übereinstimmt
                    //spielerPunkte[i][reihePyramide - 1] = reihePyramide; //nicht die Punkte zählen sondern Karten entfernen -> am Ende schauen wer die meisten Karten hat
                    //console.log("Karten: " + spielerKarten[i][j]);
                    spielerKarten[i].splice(j, 1); //Karte wird aus Karten des Spielers entfernt
                    spielerSchluecke.push(i + 1);
                }
                else {
                    spielerPunkte[i][j] = 0;
                }
            }
        }


    }
    if (spielerSchluecke.length === 0) {
        nachrichtVerteilen.innerHTML = `Kein Spieler kann Schlücke verteilen`;
    }
    else {
        nachrichtVerteilen.innerHTML = `Spieler ${spielerSchluecke.join(", ")} verteilt ${reihePyramide} ${(reihePyramide <=1 ? "Schluck" : "Schlücke")}`;
    }


}

function reiheErhoehen(karte){ //erhöht die Reihe, wenn alle Karten einer Reihe aufgedeckt sind
        if (karte.id == 4 || karte.id == 7 || karte.id == 9){
            reihePyramide++;
    }
}

function busfahrerBestimmen(spielerKarten){
    kartenSortieren(spielerKarten);
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (spielerKarten[i] !== undefined || spielerKarten[j] !== undefined){
                if (spielerKarten[i] === spielerKarten[j]){
                    if (spielerKarten[i].ariaLabel.match(/\d+/)[0] < spielerKarten[j].ariaLabel.match(/\d+/)[0]) {
                        spielerKarten.splice(i, 1);
                    }
                    else if (spielerKarten[i].ariaLabel.match(/\d+/)[0] === spielerKarten[j].ariaLabel.match(/\d+/)[0]) {
                        continue;
                    }
                }
            }

        }
    }
    //console.log("Busfahrer ist " + niedrigsteKarte);
    //console.log(spielerKarten123.reduce((minI,el,i,arr) =>
        //(el.length<arr[minI].length) ? i : minI, 0));
    //Vergleiche wer die meisten Karten hat -> bei Gleichstand Kartenwerte zusammenrechnen


}

function coBusfahrerBestimmen(coBusfahrerArr) {
    let coBusfahrer = [];
    let KartenWert = 0;
    let CoBufahrerIndex = [];
    for (let i = 0; i < coBusfahrerArr.length; i++){ //rechnet alle Werte
        for (let j = 0; j < coBusfahrerArr[i].length; j++) {
            KartenWert += parseInt(coBusfahrerArr[i][j].match(/\d+/)[0]); //addiert alle Kartenwerte des Spielers zusammen
            console.log(KartenWert);
        }
        coBusfahrer.push(KartenWert);
        console.log(coBusfahrer);
        KartenWert = 0;
    }
    let hoehererWert = Math.max(...coBusfahrer.flat()); //findet den höchsten Wert
    let index = coBusfahrer.indexOf(hoehererWert);
    console.log("Co Busfahrer nach Wert: " + coBusfahrerArr[index]);
    coBusfahrer = coBusfahrerArr[index];
    console.log(coBusfahrer);
    let index1 = spielerKarten123.findIndex(x => x.length === coBusfahrer.length && x.every((i)=> coBusfahrer.includes(i))); //sucht den Index vom Spieler mit dem höchsten Kartenwert
    console.log(index1);
    return index1; //gibt ihn aus da er in einer anderen Funktion gebraucht wird
}



function kartenSortieren(spielerKarten){
    let verschiedeneKartenlaengen = [];
    let spielerKartenSortiert = [];
    let busfahrerArray = [];
    spielerKarten = spielerKarten.filter(i => i.length !== 0);

    for (let i = 0; i < spielerKarten.length; i++) {
        if (verschiedeneKartenlaengen.includes(spielerKarten[i].length)) { //filtert die verschiedenen Kartenlängen heraus -> wichtig um Busfahrer und Co Busfahrer zu bestimmen da davon die Häufigket des filterns abhängt
            continue;
        }
        else {
            verschiedeneKartenlaengen.push(spielerKarten[i].length);
        }
    }
    console.log(verschiedeneKartenlaengen.length);


    let tmp = spielerKarten; //Variable zum Zwischenspeichern
    for (let i = 0; i < (verschiedeneKartenlaengen.length - 2); i++){
        console.log("i: " + i);

        let min = Math.min(...tmp.map(i => i.length))

        tmp = tmp.filter(i => i.length !== min) //Filtert die kürzesten Elemente aus dem Array

        console.log(tmp)


    }

    let max = Math.max(...tmp.map(i => i.length))

    busfahrerArray = tmp.filter(i => i.length !== max)

    max = Math.max(...tmp.map(i => i.length))

    busfahrer = tmp.filter(i => i.length === max) //filtert die längsten Elemente

    let coBusfahrerArray = [];

    for (let i = 0; i < busfahrerArray.length; i++) { //überrprüft Busfahrer Array auf Länge
        if (coBusfahrerArray.includes(busfahrerArray[i].length)){
            continue;
        }
        else {
            coBusfahrerArray.push(busfahrerArray[i]);
        }
    }
    console.log(coBusfahrerArray.length);

    //console.log("Busfahrer: " + busfahrer)
    let bufahrerIndex = [];
    for (let j = 0; j < busfahrer.length; j++) {
        let index = spielerKarten123.findIndex(x => x.length === busfahrer[j].length && x.every((v,i)=> busfahrer[j][i] === v));
        console.log(index);
        bufahrerIndex.push(index);

    }

    if (busfahrer.length < 2) { //Ausgabe der Busfahrer und Co Busfahrer
        document.getElementById("round").innerHTML = "Busfahrer ist Spieler: " + bufahrerIndex.toString() + " und Co Busfahrer ist Spieler: " + coBusfahrerBestimmen(busfahrerArray).toString();
    }
    else {
        document.getElementById("round").innerHTML = "Busfahrer sind Spieler: " + bufahrerIndex.toString();
    }
    sleep(5000);

    document.location.href = "../html/busfahrer.html";

    console.log("Co"+ coBusfahrerBestimmen(busfahrerArray));



}

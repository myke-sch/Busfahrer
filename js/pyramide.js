
let karten_deck = ["karo6" ,"karo7", "karo8","karo9","karo10", "karo11", "karo12", "karo13", "karo14", "kreuz6" ,"kreuz7",
    "kreuz8", "kreuz9", "kreuz10", "kreuz11", "kreuz12", "kreuz13", "kreuz14", "herz6", "herz7", "herz8", "herz9", "herz10", "herz11",
    "herz12", "herz13", "herz14","pik6", "pik7", "pik8", "pik9", "pik10", "pik11", "pik12", "pik13", "pik14"];


var kartenGeladen = false;

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
//import deck from './main';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function pyramideZiehen() {
    let reihePyramide = 0;
    console.log(JSON.parse(localStorage.getItem("karten")));
    console.log(JSON.parse(localStorage.getItem("kartenSpeiler")));
    spielerKarten123 = JSON.parse(localStorage.getItem("kartenSpeiler"));
    deck = JSON.parse(localStorage.getItem("karten"));
    console.log(deck);
    for (let i = 9; i >= 0; i--) {
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
        document.body.appendChild(picture);
        if (i === 9) {
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
        }
    }
    localStorage.clear();
    localStorage.setItem("karten", JSON.stringify(deck));
    kartenGeladen = true;
}


function flipCart(clicked_id) {
    let karte = document.getElementById(clicked_id);
    //console.log(karte.id);
    //console.log(clicked_id);
    //console.log(karte);
    reiheErhoehen(karte);
    karte.style.transitionDuration = "0.75s";
    if (kartenGeladen) {
        deck.shift();
    }
    async function flip() {
        karte.style.transform = "rotateY(-90deg)";
        await sleep(1000);
        karte.src = "/img/" + karte.ariaLabel + ".png";
        await sleep(200);
        karte.style.transform = "rotateY(0deg)";
    }

    flip();
    PyramideUeberpruefen(karte);
    if (parseInt(karte.id) === 9) {
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
                if (karte.ariaLabel.match(/\d+/)[0] == spielerKarten[i][j].match(/\d+/)[0]) {
                    //spielerPunkte[i][reihePyramide - 1] = reihePyramide; //nicht die Punkte zählen sondern Karten entfernen -> am Ende schauen wer die meisten Karten hat
                    //console.log("Karten: " + spielerKarten[i][j]);
                    spielerKarten[i].splice(j, 1);
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

function reiheErhoehen(karte){
        if (karte.id == 4 || karte.id == 7 || karte.id == 9){
            reihePyramide++;
    }
}

function busfahrerBestimmen(spielerKarten){
    let gleicherWert;
    let kartenWerte = [];
    let niedrigeKarte = spielerKarten[0];
    let spielerKartenSortiert = [];
    let spielerKartenSortiert2 = [];
    let spielerKartenSortiert3 = [];
    let spielerKartenSortiert4 = [];
    //tmp = spielerKarten[0]
    //for loop zum überprüfen
    //tmp var um zwischenzuspeichern wenn etwas kürzer ist und dann damit testen

    kartenSortieren(spielerKarten);

    //spielerKarten = spielerKarten.filter(i => i.length !== 0);
//
   /* let min = Math.min(...spielerKarten.map(i => i.length));
        console.log(min);

        let result = spielerKarten.filter(i => i.length !== min);
        spielerKartenSortiert = result
        console.log(spielerKartenSortiert);

//
    let min2 = Math.min(...spielerKartenSortiert.map(i => i.length));
    console.log(min2);
        let result2 = spielerKartenSortiert.filter(i => i.length !== min2);
        spielerKartenSortiert2 = result2
        console.log(spielerKartenSortiert2);



//

///
    let min3 = Math.min(...spielerKartenSortiert.map(i => i.length));
    console.log(min3);
    let result4 = spielerKartenSortiert.filter(i => i.length !== min3); //!== zu == tauschen

    spielerKartenSortiert4 = result4;
    console.log(spielerKartenSortiert4);

    ///
        let max = Math.max(...spielerKartenSortiert.map(i => i.length));
    console.log(max);
        let result3 = spielerKartenSortiert.filter(i => i.length === max); //!== zu == tauschen

    spielerKartenSortiert3 = result3;

        console.log(spielerKartenSortiert3);
//
    for (let i = 0; i < spielerKartenSortiert3.length; i++) {
        busfahrer.push(spielerKartenSortiert3[i]);
    }*/
//

    console.log("Busfahrer: "  + spielerBestimmen());

    //const isDup = (x,y) => {
      //  spielerKarten.find(it => JSON.stringify(it) == JSON.stringify([x,y])) == undefined) : null
    //}
    //console.log("Busfahrer: " + spielerKarten.findIndex(spielerKartenSortiert3));

    //wenigstens Karten rausfiltern
    //überprüfen bei gleicher Karteanzahl wer die niedrigsten hat

    /*for (let i = 0; i < 6; i++){
        let kartenWert = 0;
        for (let j = 0; j < 4; j++){
            if (spielerKarten[i][j] === undefined){
                console.log("Karte undefiniert");
        }
            else {
                kartenWert += parseInt(spielerKarten[i][j].match(/\d+/)[0]);
            }

        }
        kartenWerte.push(kartenWert);

    }
    console.log(kartenWerte);*/

    //spielerKarten123.splice(spielerKarten123.reduce((minI,el,i,arr) =>
        //(el.length<arr[minI].length) ? i : minI, 0), 1);
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (spielerKarten[i] !== undefined || spielerKarten[j] !== undefined){
                if (spielerKarten[i] === spielerKarten[j]){
                    if (spielerKarten[i].ariaLabel.match(/\d+/)[0] < spielerKarten[j].ariaLabel.match(/\d+/)[0]) {
                        spielerKarten.splice(i, 1);
                    }
                    else if (spielerKarten[i].ariaLabel.match(/\d+/)[0] === spielerKarten[j].ariaLabel.match(/\d+/)[0]) {

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
    let hoheKarteArr = [];

    for (let i = 0; i < coBusfahrerArr.length; i++){
        for (let j = 0; j < coBusfahrerArr[i].length; j++) {
            KartenWert += parseInt(coBusfahrerArr[i][j].match(/\d+/)[0]);
            console.log(KartenWert);
        }
        coBusfahrer.push(KartenWert);
        console.log(coBusfahrer);
        KartenWert = 0;
    }
    let hoehererWert = Math.max(...coBusfahrer.flat());
    let index = coBusfahrer.indexOf(hoehererWert);
    console.log("Co Busfahrer nach Wert: " + coBusfahrerArr[index]);
    console.log(index);
    let index1 = spielerKarten123.findIndex(x => x.length === coBusfahrerArr[index].length && x.every((i)=> coBusfahrerArr[index].includes(i)));
    console.log(index1);
    return index1;




}

function spielerBestimmen() {
    let index = spielerKarten123.findIndex(x => x.length === busfahrer.length && x.every((v,i)=> busfahrer[i] === v));
    console.log(spielerKarten123.findIndex(x => x.length === busfahrer.length && x.every((i)=> busfahrer.includes(i))));
}


function kartenSortieren(spielerKarten){
    let verschiedeneKartenlaengen = [];
    let spielerKartenSortiert = [];
    let busfahrerArray = [];
    spielerKarten = spielerKarten.filter(i => i.length !== 0);

    for (let i = 0; i < spielerKarten.length; i++) {
        if (verschiedeneKartenlaengen.includes(spielerKarten[i].length)) {
            continue;
        }
        else {
            verschiedeneKartenlaengen.push(spielerKarten[i].length);
        }
    }
    console.log(verschiedeneKartenlaengen.length);


    let tmp = spielerKarten;
    for (let i = 0; i < (verschiedeneKartenlaengen.length - 2); i++){
        console.log("i: " + i);

        let min = Math.min(...tmp.map(i => i.length))

        tmp = tmp.filter(i => i.length !== min)

        console.log(tmp)


    }

    let max = Math.max(...tmp.map(i => i.length))

    busfahrerArray = tmp.filter(i => i.length !== max)



    console.log("Sortiert lange: " + busfahrerArray.length);
    spielerKartenSortiert = busfahrerArray.length;



    max = Math.max(...tmp.map(i => i.length))

    let busfahrer = tmp.filter(i => i.length === max)




    let coBusfahrerArray = [];

    for (let i = 0; i < busfahrerArray.length; i++) {
        if (coBusfahrerArray.includes(busfahrerArray[i].length)){
            continue
        }
        else {
            coBusfahrerArray.push(busfahrerArray[i]);
        }
    }
    console.log(coBusfahrerArray.length);


    if (busfahrer.length > 1) {
        console.log("Es gibt 2 Busfahrer");
        console.log("Busfahrer: " + busfahrer)
    }
    else {
        if (coBusfahrerArray.length > 1){
            coBusfahrerBestimmen(busfahrerArray);
            console.log("Co Busfahrer: " + busfahrerArray)
        }
        else {
            console.log("Co Busfahrer: " + busfahrerArray)
        }
    }
    console.log("Busfahrer: " + busfahrer)


    document.getElementById("round").innerText = `Busfahrer ist ${busfahrer} und Co Busfahrer ist Spieler ${coBusfahrerBestimmen()}`;


}
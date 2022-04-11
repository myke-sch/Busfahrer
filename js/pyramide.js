
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
    console.log(karte.id);
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
                    console.log("Karte wurde entfernt");
            }
            else {
                console.log(spielerKarten[i][j]);
                if (karte.ariaLabel.match(/\d+/)[0] == spielerKarten[i][j].match(/\d+/)[0]) {
                    //spielerPunkte[i][reihePyramide - 1] = reihePyramide; //nicht die Punkte zählen sondern Karten entfernen -> am Ende schauen wer die meisten Karten hat
                    console.log("Karten: " + spielerKarten[i][j]);
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

function busfahrerBestimmen(){
    //Vergleiche wer die meisten Karten hat -> bei Gleichstand Kartenwerte zusammenrechnen


}



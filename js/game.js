let round = 1;
let karten_deck = ["karo7", "karo8","karo9","karo10", "karo11", "karo12", "karo13", "karo14", "Kreuz7",
    "kreuz8", "kreuz9", "kreuz10", "kreuz11", "kreuz12", "kreuz13", "kreuz14", "herz7", "herz8", "herz9", "herz10", "herz11",
    "herz12", "herz13", "herz14", "pik7", "pik8", "pik9", "pik10", "pik11", "pik12", "pik13", "pik14"];



let red_cards = ["karo7", "karo8","karo9","karo10", "karo11", "karo12", "karo13", "karo14", "herz7", "herz8", "herz9", "herz10", "herz11",
    "herz12", "herz13", "herz14"];
let black_cards = ["Kreuz7",
    "kreuz8", "kreuz9", "kreuz10", "kreuz11", "kreuz12", "kreuz13", "kreuz14", "pik7", "pik8", "pik9", "pik10", "pik11", "pik12", "pik13", "pik14"];

let deck = [];
let deck_size = 32;
let spieler = 6;
let rundenCounter = 0;
let aktiverSpieler = 1;

window.onload = function() {
    document.getElementById("round").innerHTML += round;
    deck = karten_mischen(karten_deck);
    eingabeÜberprüfen();
    anzahlSpieler();
};




function karten_mischen(deck) {  //Fisher-Yates-Verfahren
    let deck_size_counter = deck.length;

    while (deck_size_counter > 0){
        let karte = Math.floor(Math.random() * deck_size_counter);

        deck_size_counter--;

        let temp = deck[deck_size_counter];
        deck[deck_size_counter] = deck[karte]
        deck[karte] = temp;
    }

    return deck;
}


function shufflecards(){
    console.log(karten_mischen(karten_deck));

}
function game(){

    if (round == 1)  {
        round1();
    }
    else if (round == 2) {
        round2();
    }


}


function eingabeÜberprüfen() {
    let btn1 = document.getElementById("btn1"); //Schwarz, //Höher, //Innerhalb
    let btn2 = document.getElementById("btn2");
    let btn3 = document.getElementById("btn3");
    let btn4 = document.getElementById("btn4");

    btn1.addEventListener("click", () => {
        if (round === 1) {
            round1();
        }
        else if (round === 2){
            round2_1();
        }
        else if (round === 3){
            round3_1();
        }
        else if (round === 4) {
            round4_1();
        }

    });

    btn2.addEventListener("click", () => {
        if (round === 1) {
            round1();
        }
        else if (round === 2){
            round2_2();
        }

        else if (round === 3){
            round3_2();
        }
        else if (round === 4) {
            round4_2();
        }
    });

    btn3.addEventListener("click", () =>{
        round4_3();
    });

    btn4.addEventListener("click", () =>{
        round4_4();
    })


}




//Farbe        eventListener entfernen!
function round1(){

    karteSpeichern();
    console.log(deck);
    if(black_cards.includes(deck[0])) {
            document.getElementById("game_message").innerHTML = "Verteile 1 Schluck"
    }
    else {
            document.getElementById("game_message").innerHTML = "Trinke 1 Schluck"
    }
        //showCard();

    karteZiehen();
    if (aktiverSpieler >= spieler) {
        aktiverSpieler = 1;
        naechsteRunde();
        round++;
    }
    else {
        aktiverSpieler++;
    }

    }


    if(red_cards.includes(deck[0])) {
            document.getElementById("game_message").innerHTML = "Verteile 1 Schluck"
    }
    else {
        document.getElementById("game_message").innerHTML = "Trinke 1 Schluck"
    }
        //showCard();
karteSpeichern();
    karteZiehen();
    if (aktiverSpieler >= spieler) {
        aktiverSpieler = 1;
        naechsteRunde();
        round++;
    }
    else {
        aktiverSpieler++;

}

//Höher
function round2_1(){
    console.log(deck);
    karteSpeichern();
    console.log("Runde 2 1");
    //Ass, Bube, Dame, König muss noch überprüft werden
    //document.getElementById("herz9").ariaLabel.match(/\d+/)[0]

    let card1 = document.getElementById(`player${aktiverSpieler}_img${round - 1}`).ariaLabel.match(/\d+/)[0];
    let card2 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.match(/\d+/)[0];

    if (parseInt(card1) < parseInt(card2)) {
        console.log(document.getElementById(`player${aktiverSpieler}_img${round - 1}`).ariaLabel.match(/\d+/)[0], document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.match(/\d+/)[0]);
        console.log("war richtig");
        document.getElementById("game_message").innerHTML = "Verteile 1 Schluck";
    }
    else {
        console.log("war falsch");
        document.getElementById("game_message").innerHTML = "Trinke 1 Schluck";

    }
    //showCard();

        karteZiehen();
        if (aktiverSpieler >= spieler) {
            aktiverSpieler = 1;
            naechsteRunde();
            round++;
        } else {
            aktiverSpieler++;
        }
}
    //tiefer
function round2_2(){
    karteSpeichern();
    console.log("Runde 2 2");
    let card1 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.match(/\d+/)[0];
    let card2 = document.getElementById(`player${aktiverSpieler}_img${round - 1}`).ariaLabel.match(/\d+/)[0];
    if (parseInt(card1) < parseInt(card2)) {
        document.getElementById("game_message").innerHTML = "Verteile 1 Schluck"
        console.log("war richtig");
        console.log(document.getElementById(`player${aktiverSpieler}_img${round - 1}`).ariaLabel.match(/\d+/)[0], document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.match(/\d+/)[0]);
    }
    else {
        document.getElementById("game_message").innerHTML = "Trinke 1 Schluck";
        console.log("war faslch");
    }
    //showCard();

    karteZiehen();
    if (aktiverSpieler >= spieler) {
        aktiverSpieler = 1;
        naechsteRunde();
        round++;
    } else {
        aktiverSpieler++;
    }
}
//Höher tiefer
//document.getElementById("player1_img1").ariaLabel.match(/\d+/)[0]

function round3_1(){
    karteSpeichern();
    console.log("Runde 3 1");
    let card1 = document.getElementById(`player${aktiverSpieler}_img${round - 2}`).ariaLabel.match(/\d+/)[0];
    let card2 = document.getElementById(`player${aktiverSpieler}_img${round - 1}`).ariaLabel.match(/\d+/)[0];
        let card3 = parseInt(document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.match(/\d+/)[0]);
        if(card3 > kartenSortieren_niedrig(card1, card2) && card3 <  kartenSortieren_hoch(card1, card2)){
            document.getElementById("game_message").innerHTML = "Trinke 1 Schluck";
        }
        else {
            document.getElementById("game_message").innerHTML = "Verteile 1 Schluck";
        }
    karteZiehen();
    if (aktiverSpieler >= spieler) {
        aktiverSpieler = 1;
        naechsteRunde();
        round++;
    } else {
        aktiverSpieler++;
    }
}

function round3_2(){
    karteSpeichern();
    console.log("Runde 3 1");
    let card1 = document.getElementById(`player${aktiverSpieler}_img${round - 2}`).ariaLabel.match(/\d+/)[0]; //11
    let card2 = document.getElementById(`player${aktiverSpieler}_img${round - 1}`).ariaLabel.match(/\d+/)[0]; //8
    let card3 = parseInt(document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.match(/\d+/)[0]); //5
    if(card3 > kartenSortieren_niedrig(card1, card2) && card3 >  kartenSortieren_hoch(card1, card2) || card3 < kartenSortieren_niedrig(card1, card2) && card3 <  kartenSortieren_hoch(card1, card2)){
        document.getElementById("game_message").innerHTML = "Verteile 1 Schluck";
    }
    else {
        document.getElementById("game_message").innerHTML = "Trinke 1 Schluck";
    }
    karteZiehen();
    if (aktiverSpieler >= spieler) {
        aktiverSpieler = 1;
        naechsteRunde();
        round++;
    }
    else {
        aktiverSpieler++;
    }
}

function resetPlayer() {
        if (aktiverSpieler >= spieler) {
            aktiverSpieler = 1;
            naechsteRunde();
            round++;
        } else {
            aktiverSpieler++;
        }
    }

//Herz
function round4_1() {
    karteSpeichern();
    let card4 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.replace(/[0-9]/g, '');
    if (card4 === "herz") {
        document.getElementById("game_message").innerHTML = "Verteile 1 Schluck";
    } else {
        document.getElementById("game_message").innerHTML = "Trinke 1 Schluck";
    }

    karteZiehen();
    resetPlayer();
}

function round4_2() {
    karteSpeichern();
    let card4 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.replace(/[0-9]/g, '');
    if (card4 === "pik"){
        document.getElementById("game_message").innerHTML = "Verteile 1 Schluck";
    }
    else {
        document.getElementById("game_message").innerHTML = "Trinke 1 Schluck";
    }
    karteZiehen();
    resetPlayer();
}

function round4_3() {
    karteSpeichern();
    let card4 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.replace(/[0-9]/g, '');
    if (card4 === "kreuz"){
        document.getElementById("game_message").innerHTML = "Verteile 1 Schluck";
    }
    else {
        document.getElementById("game_message").innerHTML = "Trinke 1 Schluck";
    }
    karteZiehen();
    resetPlayer();
}

function round4_4() {
    karteSpeichern();
    let card4 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.replace(/[0-9]/g, '');
    if (card4 === "karo"){
        document.getElementById("game_message").innerHTML = "Verteile 1 Schluck";
    }
    else {
        document.getElementById("game_message").innerHTML = "Trinke 1 Schluck";
    }
    karteZiehen();
    resetPlayer();
}


//document.getElementById(`player${aktiverSpieler - 1}_img${round}`).ariaLabel.replace(/[0-9]/g, '');

function showCard() {
    let picture = document.createElement("img");
    picture.src = "/img/" + deck[0] + ".png";
    //picture.onclick = flipCart();
    document.body.appendChild(picture);
}

function karteZiehen(){//1. Karte aus var deck entfernen
    if (deck.length > 0) {
        deck.shift();
    }
    else {
        console.log("Deck leer - neu mischen");
    }
}

function anzahlSpieler() {
    for (let i = 1; i <= spieler; i++) {
        globalThis.spieler1 = document.createElement("p");
        spieler1.innerHTML += `Spieler ${i}:`;
        spieler1.setAttribute("id", `player${i}`);
        document.body.appendChild(spieler1);
    }
}

function karteSpeichern(){
    switch (aktiverSpieler){
        case 1:
            let spieler_karte = document.createElement("img");

            spieler_karte.src = "/img/" + deck[0] + ".png";
            spieler_karte.ariaLabel = deck[0];
            spieler_karte.setAttribute("id", `player${aktiverSpieler}_img${round}`);
            document.getElementById("player1").appendChild(spieler_karte);
            break;
        case 2:
            let spieler_karte2 = document.createElement("img");

            spieler_karte2.src = "/img/" + deck[0] + ".png";
            spieler_karte2.ariaLabel = deck[0];

            spieler_karte2.setAttribute("id", `player${aktiverSpieler}_img${round}`);
            document.getElementById("player2").appendChild(spieler_karte2);
            break;
        case 3:
            let spieler_karte3 = document.createElement("img");
            spieler_karte3.ariaLabel = deck[0];
            spieler_karte3.src = "/img/" + deck[0] + ".png";
            spieler_karte3.setAttribute("id", `player${aktiverSpieler}_img${round}`);
            document.getElementById("player3").appendChild(spieler_karte3);
            break;
        case 4:
            let spieler_karte4 = document.createElement("img");
            spieler_karte4.ariaLabel = deck[0];
            spieler_karte4.src = "/img/" + deck[0] + ".png";
            spieler_karte4.setAttribute("id", `player${aktiverSpieler}_img${round}`);
            document.getElementById("player4").appendChild(spieler_karte4);
            break;

        case 5:
            let spieler_karte5 = document.createElement("img");
            spieler_karte5.ariaLabel = deck[0];
            spieler_karte5.src = "/img/" + deck[0] + ".png";
            spieler_karte5.setAttribute("id", `player${aktiverSpieler}_img${round}`);
            document.getElementById("player5").appendChild(spieler_karte5);
            break;

        case 6:
            let spieler_karte6 = document.createElement("img");
            spieler_karte6.ariaLabel = deck[0];
            spieler_karte6.src = "/img/" + deck[0] + ".png";
            spieler_karte6.setAttribute("id", `player${aktiverSpieler}_img${round}`);
            document.getElementById("player6").appendChild(spieler_karte6);
            break;
    }
}

function naechsteRunde() {
    switch (round) {
        case 1:
            document.getElementById("round").innerHTML = `Karte wählen | Runde: ${round + 1}`;
            document.getElementById("btn1").textContent = "Höher";
            document.getElementById("btn2").textContent = "Tiefer";
            break;
        case 2:
            document.getElementById("round").innerHTML = `Karte wählen | Runde: ${round + 1}`;
            document.getElementById("btn1").textContent = "Innerhalb";
            document.getElementById("btn2").textContent = "Außerhalb";
            break;
        case 3:
            document.getElementById("round").innerHTML = `Karte wählen | Runde: ${round + 1}`;
            document.getElementById("btn1").textContent = "Herz";
            document.getElementById("btn2").textContent = "Pik";
            document.getElementById("btn3").hidden = false;
            document.getElementById("btn4").hidden = false;

            break;
        default:
            document.getElementById("round").innerHTML = `Runde vorbei`;
            break;
    }
}

    //nimmt die letzen beiden Karten und ordnet sie nach Größe (für Innerhalb außerhalb)
function kartenSortieren_hoch(card1, card2){
        if (card1 > card2) {
            return card1;
        }
        else {
            return card2;
        }
}

function kartenSortieren_niedrig(card1, card2){
    if (card1 < card2) {
        return card1;
    }
    else {
        return card2;
    }
}
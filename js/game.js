let round = 1;
let karten_deck = ["karo7", "karo8","karo9","karo10", "karoB", "karoD", "karoK", "karoA", "Kreuz7",
    "kreuz8", "kreuz9", "kreuz10", "kreuzB", "kreuzD", "kreuzK", "kreuzA", "herz7", "herz8", "herz9", "herz10", "herzB",
    "herzD", "herzK", "herzA", "pik7", "pik8", "pik9", "pik10", "pikB", "pikD", "pikK", "pikA"];

let red_cards = ["karo7", "karo8","karo9","karo10", "karoB", "karoD", "karoK", "karoA", "herz7", "herz8", "herz9", "herz10", "herzB",
    "herzD", "herzK", "herzA"];
let black_cards = ["Kreuz7",
    "kreuz8", "kreuz9", "kreuz10", "kreuzB", "kreuzD", "kreuzK", "kreuzA", "pik7", "pik8", "pik9", "pik10", "pikB", "pikD", "pikK", "pikA"];

let deck = [];
let deck_size = 32;
let spieler = 6;
let rundenCounter = 0;
let aktiverSpieler = 1;

window.onload = function() {
    game();
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
    document.getElementById("round").innerHTML += round;
    deck = karten_mischen(karten_deck);
    round1();
    round2();

}
//Farbe
function round1(){
    let btn1 = document.getElementById("btn1"); //Schwarz
    let btn2 = document.getElementById("btn2"); //Rot
    console.log(deck);
    btn1.addEventListener("click", () => {
        if(black_cards.includes(deck[0])) {
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

    });

    btn2.addEventListener("click", () => {
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
    });

}

//Höher tiefer

//document.getElementById("player1_img1").ariaLabel.match(/\d+/)[0]
function round2(){
    let btn1 = document.getElementById("btn1"); //Höher
    let btn2 = document.getElementById("btn2"); //Tiefer
    console.log(deck);
    btn1.addEventListener("click", () => {
        //Ass, Bube, Dame, König muss noch überprüft werden
        if(document.getElementById(`player${aktiverSpieler}_img${round - 1}`).ariaLabel.match(/\d+/)[0]) > document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.match(/\d+/)[0])) {
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

    });

    btn2.addEventListener("click", () => {
        if(document.getElementById(`player${aktiverSpieler}_img${round - 1}`).ariaLabel.match(/\d+/)[0]) < document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.match(/\d+/)[0])) {
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
    });

}

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

function naechsteRunde(){
    switch (round) {
        case 1:
            document.getElementById("round").innerHTML = `Karte wählen | Runde: ${round+1}`;
            document.getElementById("btn1").textContent = "Höher";
            document.getElementById("btn2").textContent = "Tiefer";
            break;
        case 2:
            document.getElementById("round").innerHTML = `Karte wählen | Runde: ${round+1}`;
            document.getElementById("btn1").textContent = "Innerhalb";
            document.getElementById("btn2").textContent = "Außerhalb";
            break;
        case 3:
            document.getElementById("round").innerHTML = `Karte wählen | Runde: ${round+1}`;
            document.getElementById("btn1").textContent = "Herz";
            document.getElementById("btn2").textContent = "Pik";

            let btnKreuz = document.createElement("button");
            btnKreuz.textContent = "Kreuz";
            document.getElementById("buttons").appendChild(btnKreuz);

            let btnKaro = document.createElement("button");
            btnKaro.textContent = "Karo";
            document.getElementById("buttons").appendChild(btnKaro);

            break;
        default:
            document.getElementById("round").innerHTML = `Runde vorbei`;
            break;
    }
}
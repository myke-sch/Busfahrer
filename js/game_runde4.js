function round4_1(){
    karteSpeichern();
    let card4 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.replace(/[0-9]/g, ``);
    if(card4 === "herz"){
        document.getElementById("game_message").innerHTML = "Verteile 1 Schluck";
    } else {
        document.getElementById("game_message").innerHTML = "Trinke 1 Schluck";
    }
    karteZiehen();
    resetPlayer();
}

function round4_2(){
    karteSpeichern();
    let card4 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.replace(/[0-9]/g, ``);
    if(card4 === "pik"){
        document.getElementById("game_message").innerHTML = "Verteile 1 Schluck";
    } else {
        document.getElementById("game_message").innerHTML = "Trinke 1 Schluck";
    }
    karteZiehen();
    resetPlayer();
}

function round4_3(){
    karteSpeichern();
    let card4 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.replace(/[0-9]/g, ``);
    if(card4 === "kreuz"){
        document.getElementById("game_message").innerHTML = "Verteile 1 Schluck";
    } else {
        document.getElementById("game_message").innerHTML = "Trinke 1 Schluck";
    }
    karteZiehen();
    resetPlayer();
}

function round4_4(){
    karteSpeichern();
    let card4 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.replace(/[0-9]/g, ``);
    if(card4 === "karo"){
        document.getElementById("game_message").innerHTML = "Verteile 1 Schluck";
    } else {
        document.getElementById("game_message").innerHTML = "Trinke 1 Schluck";
    }
    karteZiehen();
    resetPlayer();
}

function kartenSortieren_hoch(card1, card2){
    if (card1 > card2){
        return card1;
    }
    else {
        return card2;
    }
}

function kartenSortieren_niedrig(card1, card2){
    if (card1 < card2){
        return card1;
    }
    else {
        return card2;
    }
}

function karteZiehen(){//1. Karte aus var deck entfernen
    if (deck.length > 0){
        deck.shift();
    } else {
        console.log("Deck leer - neu mischen");
    }
}

function anzahlSpieler(){
    for (let i = 1; i <= spieler; i++){
        globalThis.spieler1 = document.createElement("p");
        spieler1.innerHTML += `Spieler $ {i}:`;
        spieler.setAttribute ("id", `player${i}`);
        document.body.appendChild(spieler1);
    }
}
let round = 1;
let karten_deck = ["karo6" ,"karo7", "karo8","karo9","karo10", "karo11", "karo12", "karo13", "karo14", "kreuz6", "kreuz7",
    "kreuz8", "kreuz9", "kreuz10", "kreuz11", "kreuz12", "kreuz13", "kreuz14", "herz6", "herz7", "herz8", "herz9", "herz10", "herz11",
    "herz12", "herz13", "herz14","pik6", "pik7", "pik8", "pik9", "pik10", "pik11", "pik12", "pik13", "pik14"];


let red_cards = ["karo6" ,"karo7", "karo8","karo9","karo10", "karo11", "karo12", "karo13", "karo14", "herz6", "herz7", "herz8", "herz9", "herz10", "herz11",
    "herz12", "herz13", "herz14"];
let black_cards = ["kreuz6", "kreuz7",
    "kreuz8", "kreuz9", "kreuz10", "kreuz11", "kreuz12", "kreuz13", "kreuz14", "pik6", "pik7", "pik8", "pik9", "pik10", "pik11", "pik12", "pik13", "pik14"];

let deck = [];
let deck_size = 32;
let spieler = parseInt(JSON.parse(localStorage.getItem("spielerAnzahl")));
let rundenCounter = 0;
let aktiverSpieler = 1;

let spielerKarten = [
    [],
    [],
    [],
    [],
    [],
    [],

];
let spielerKartenJSON; //Array um "spielerKarten" in JSON Format zu konvertieren um es zu speichern

function sleep(ms) { //Funktion um code zu unterbrechen
    return new Promise(resolve => setTimeout(resolve, ms));
}


window.onload = function() { //wartet bis Website geladen ist und läd danach funktionen und variablen -> nötig um Fehler zu umgehen
    document.getElementById("round").innerHTML += round;
    deck = karten_mischen(karten_deck);
    eingabeUeberpruefen();
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


function eingabeUeberpruefen() {
    let btn1 = document.getElementById("btn1"); //Schwarz, //Höher, //Innerhalb
    let btn2 = document.getElementById("btn2");
    let btn3 = document.getElementById("btn3");
    let btn4 = document.getElementById("btn4");

    btn1.addEventListener("click", () => { //eventlistener für den 1. button
        let myNode = document.getElementById("karten_pos");
        myNode.innerHTML = '';
        if (round === 1) {
            round1();
        } else if (round === 2) {
            round2_1();
        } else if (round === 3) {
            round3_1();
        } else if (round === 4) {
            round4_1();
        }

        localStorage.clear(); //löscht  Speicher
        localStorage.setItem("karten", JSON.stringify(deck));//speichert das Deck unter "karten" ab
        localStorage.setItem("kartenSpeiler", JSON.stringify(spielerKarten)); // speichert die gezogenen Karten der Spieler

        btn1.disabled = true;

    });

    btn2.addEventListener("click", () => {
        let myNode = document.getElementById("karten_pos");
        myNode.innerHTML = '';
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

        localStorage.clear();
        localStorage.setItem("karten", JSON.stringify(deck));
        localStorage.setItem("kartenSpeiler", JSON.stringify(spielerKarten));
        btn2.disabled = true;
    });

    btn3.addEventListener("click", () =>{
        let myNode = document.getElementById("karten_pos");
        myNode.innerHTML = '';
        round4_3();

        localStorage.clear();
        localStorage.setItem("karten", JSON.stringify(deck));
        localStorage.setItem("kartenSpeiler", JSON.stringify(spielerKarten));
        btn3.disabled = true;
    });

    btn4.addEventListener("click", () =>{
        let myNode = document.getElementById("karten_pos");
        myNode.innerHTML = '';
        round4_4();

        localStorage.clear();
        localStorage.setItem("karten", JSON.stringify(deck));
        localStorage.setItem("kartenSpeiler", JSON.stringify(spielerKarten));
        btn4.disabled = true;
    })


}




//Farbe        eventListener entfernen!
function round1(){


    //console.log(deck);
    if(black_cards.includes(deck[0])) { //untersucht ob sich die oberste Karte eine schwarze Karte ist
            document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} trinke 1 Schluck`
    }
    else {
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} verteile 1 Schluck`
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

    }


    /*if(red_cards.includes(deck[0])) {
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} trinke 1 Schluck`
    }
    else {
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} verteile 1 Schluck`
    }*/
        //showCard();

//Höher
function round2_1(){
    console.log(deck);

    karteSpeichern();
    console.log("Runde 2 1");
    //Ass, Bube, Dame, König muss noch überprüft werden
    //document.getElementById("herz9").ariaLabel.match(/\d+/)[0]

    let card1 = document.getElementById(`player${aktiverSpieler}_img${round - 1}`).ariaLabel.match(/\d+/)[0]; //gibt nur die Zahlen am Ende der Karte aus
    let card2 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.match(/\d+/)[0];

    if (parseInt(card1) < parseInt(card2)) {
        console.log(document.getElementById(`player${aktiverSpieler}_img${round - 1}`).ariaLabel.match(/\d+/)[0], document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.match(/\d+/)[0]);
        console.log("war richtig");
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} Verteile 2 Schlücke`
    }
    else {
        console.log("war falsch");
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} trinke 2 Schlücke`

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
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} Verteile 2 Schlücke`
        console.log("war richtig");
        console.log(document.getElementById(`player${aktiverSpieler}_img${round - 1}`).ariaLabel.match(/\d+/)[0], document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.match(/\d+/)[0]);
    }
    else {
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} trinke 2 Schlücke`

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
        if(card3 > kartenSortieren_niedrig(card1, card2) && card3 <  kartenSortieren_hoch(card1, card2)){ //überpruft ob Karte innerhalb bzw außerhalb der vorherigen 2 Kartenwerte ist
            document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} Verteile 3 Schlücke`;
        }
        else {
            document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} trinke 3 Schlücke`;

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
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} Verteile 3 Schlücke`;
    }
    else {
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} trinke 3 Schlücke`;
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

function resetPlayer() { //setzt den aktiven Spieler wieder auf 1 wenn alle Spieler an der Reihe waren
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
    let card4 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.replace(/[0-9]/g, ''); //entfernt die Zahlenwerte von den Karten
    if (card4 === "herz") {
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} Verteile 4 Schlücke`;
    } else {
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} trinke 4 Schlücke`;;
    }

    karteZiehen();
    resetPlayer();
}

function round4_2() {
    karteSpeichern();
    let card4 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.replace(/[0-9]/g, '');
    if (card4 === "pik"){
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} Verteile 4 Schlücke`;
    }
    else {
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} trinke 4 Schlücke`;
    }
    karteZiehen();
    resetPlayer();
}

function round4_3() {
    karteSpeichern();
    let card4 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.replace(/[0-9]/g, '');
    if (card4 === "kreuz"){
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} Verteile 4 Schlücke`;
    }
    else {
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} trinke 4 Schlücke`;
    }
    karteZiehen();
    resetPlayer();
}

function round4_4() {
    karteSpeichern();
    let card4 = document.getElementById(`player${aktiverSpieler}_img${round}`).ariaLabel.replace(/[0-9]/g, '');
    if (card4 === "karo"){
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} Verteile 4 Schlücke`;
    }
    else {
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} trinke 4 Schlücke`;
    }
    karteZiehen();
    resetPlayer();
}


//document.getElementById(`player${aktiverSpieler - 1}_img${round}`).ariaLabel.replace(/[0-9]/g, '');

function karteZiehen(){//1. Karte aus Variable deck entfernen
    if (deck.length > 0) {
        deck.shift();
    }
    else {
        console.log("Deck leer - neu mischen");
    }
}

function anzahlSpieler() {
    for (let i = 1; i <= spieler; i++) {
        globalThis.spieler1 = document.createElement("p"); //macht Variable global verfügbar
        spieler1.innerHTML += `Spieler ${i}:`;
        spieler1.setAttribute("id", `player${i}`);
        document.body.appendChild(spieler1);
    }
}

function karteSpeichern() {
    setTimeout( function () { //wartet 2 Sekunden und führt dann Code aus
        document.getElementById("karten_pos").innerHTML = "";
        document.getElementById("game_message").innerHTML = `Spieler ${aktiverSpieler} ist dran`;
        for (let i = 1; i <= 4; i++){
            document.getElementById("btn" + i).disabled = false; //deaktiviert die Knöpfe damit Spieler nicht zu schnell klicken
        }
        vorherigeKarten();
    }, 2000);
    switch (aktiverSpieler){
        case 1:
            console.log(aktiverSpieler - 1);
            spielerKarten[aktiverSpieler - 1].push(deck[0]);
            spielerKartenJSON = JSON.stringify(spielerKarten); //fügt Spielerkarten in Array ein
            for(let i=0; i<2 ;i++)
            {
                let spieler_karte = document.createElement('img'); //erstellt img Element
                spieler_karte.src = "/img/" + deck[0] + ".png"; //gibt dem Image das Element der obersten Karte des Decks
                spieler_karte.ariaLabel = deck[0]; //ariaLabel zur späteren Identifizierung
                spieler_karte.setAttribute("id", `player${aktiverSpieler}_img${round}`);
                if (i === 0) {
                    document.getElementById("karten_pos").appendChild(spieler_karte); //zeigt Karte mittig an
                }
                else {
                    document.getElementById("player1").appendChild(spieler_karte); //speichert Karte für späteren Gebrauch nochmals grafisch aber versteckt
                    spieler_karte.hidden = true;
                }

            }
            //let spieler_karte = document.createElement("img");
            //let spieler_karte_cp = spieler_karte.cloneNode(true);

            //document.getElementById("karten_pos").appendChild(spieler_karte);

            break;
        case 2:
            console.log(aktiverSpieler - 1);
            spielerKarten[aktiverSpieler - 1].push(deck[0]);
            spielerKartenJSON = JSON.stringify(spielerKarten);
            for(let i=0; i<2 ;i++)
            {
                let spieler_karte2 = document.createElement('img');
                spieler_karte2.src = "/img/" + deck[0] + ".png";
                spieler_karte2.ariaLabel = deck[0];
                spieler_karte2.setAttribute("id", `player${aktiverSpieler}_img${round}`);
                if (i === 0) {
                    document.getElementById("karten_pos").appendChild(spieler_karte2);
                }
                else {
                    document.getElementById("player2").appendChild(spieler_karte2);
                    spieler_karte2.hidden = true;
                }

            }
            break;
        case 3:
            spielerKarten[aktiverSpieler - 1].push(deck[0]);
            spielerKartenJSON = JSON.stringify(spielerKarten);
            for(let i=0; i<2 ;i++)
            {
                let spieler_karte3 = document.createElement('img');
                spieler_karte3.src = "/img/" + deck[0] + ".png";
                spieler_karte3.ariaLabel = deck[0];
                spieler_karte3.setAttribute("id", `player${aktiverSpieler}_img${round}`);
                if (i === 0) {
                    document.getElementById("karten_pos").appendChild(spieler_karte3);
                }
                else {
                    document.getElementById("player3").appendChild(spieler_karte3);
                    spieler_karte3.hidden = true;
                }

            }
            //  document.getElementById("player3").appendChild(spieler_karte3);
            break;
        case 4:
            spielerKarten[aktiverSpieler - 1].push(deck[0]);
            spielerKartenJSON = JSON.stringify(spielerKarten);
            for(let i=0; i<2 ;i++)
            {
                let spieler_karte4 = document.createElement('img');
                spieler_karte4.src = "/img/" + deck[0] + ".png";
                spieler_karte4.ariaLabel = deck[0];
                spieler_karte4.setAttribute("id", `player${aktiverSpieler}_img${round}`);
                if (i === 0) {
                    document.getElementById("karten_pos").appendChild(spieler_karte4);
                }
                else {
                    document.getElementById("player4").appendChild(spieler_karte4);
                    spieler_karte4.hidden = true;
                }

            }
            break;

        case 5:
            spielerKarten[aktiverSpieler - 1].push(deck[0]);
            spielerKartenJSON = JSON.stringify(spielerKarten);
            for(let i=0; i<2 ;i++)
            {
                let spieler_karte5 = document.createElement('img');
                spieler_karte5.src = "/img/" + deck[0] + ".png";
                spieler_karte5.ariaLabel = deck[0];
                spieler_karte5.setAttribute("id", `player${aktiverSpieler}_img${round}`);
                if (i === 0) {
                    document.getElementById("karten_pos").appendChild(spieler_karte5);
                }
                else {
                    document.getElementById("player5").appendChild(spieler_karte5);
                    spieler_karte5.hidden = true;
                }


            }
            break;

        case 6:
            spielerKarten[aktiverSpieler - 1].push(deck[0]);
            spielerKartenJSON = JSON.stringify(spielerKarten);
            for(let i=0; i<2 ;i++)
            {
                let spieler_karte6 = document.createElement('img');
                spieler_karte6.src = "/img/" + deck[0] + ".png";
                spieler_karte6.ariaLabel = deck[0];
                spieler_karte6.setAttribute("id", `player${aktiverSpieler}_img${round}`);
                if (i === 0) {
                    document.getElementById("karten_pos").appendChild(spieler_karte6);
                }
                else {
                    document.getElementById("player6").appendChild(spieler_karte6);
                    spieler_karte6.hidden = true;
                }

            }
            break;
    }

}
function naechsteRunde() { //ändert die Runde nachdem alle Spieler einmal dran waren
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

            document.getElementById("btn1").disabled = true;
            document.getElementById("btn2").disabled = true;
            document.getElementById("btn3").disabled = true;
            document.getElementById("btn4").disabled = true;
            sleep(5000);
            document.location.href = "../html/runde2.html";
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




function vorherigeKarten(){
    document.getElementById("vorherigeKarten").innerHTML = "Vorherige Karten:";
        for (let i = 0; i <= spielerKarten[aktiverSpieler - 1].length; i++) {
            let spielerKartenVorher = document.createElement('img');
            spielerKartenVorher.src = "/img/" + spielerKarten[aktiverSpieler - 1][i] + ".png";
            spielerKartenVorher.ariaLabel = deck[0];
            document.getElementById("vorherigeKarten").appendChild(spielerKartenVorher);
        }
}
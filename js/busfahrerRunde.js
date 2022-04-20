let karten_deck = ["karo7", "karo8","karo9","karo10", "karo11", "karo12", "karo13", "karo14", "Kreuz7",
    "kreuz8", "kreuz9", "kreuz10", "kreuz11", "kreuz12", "kreuz13", "kreuz14", "herz7", "herz8", "herz9", "herz10", "herz11",
    "herz12", "herz13", "herz14", "pik7", "pik8", "pik9", "pik10", "pik11", "pik12", "pik13", "pik14"];


window.onload = function() {
    eingabeUeberpruefen();

};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let aktuelleKarte = 0;
let gelegteKarten = [];

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

function reihenLegen(){
    deck = karten_mischen(karten_deck);
    for (let i = 10; i >= 2; i = i - 2) {
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
        document.getElementById("karten").appendChild(picture);
        gelegteKarten[parseInt(pic_id)] = deck[i];
    }

    let neueReihe = document.createElement("br");
    document.getElementById("karten").appendChild(neueReihe);

    for (let i = 9; i >= 1; i = i - 2) {
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
        document.getElementById("karten").appendChild(picture);
        gelegteKarten[parseInt(pic_id)] = deck[i];
    }
    gelegteKarten.shift();
    flipCart(1);

}

function flipCart(clicked_id) {
    let karte = document.getElementById(clicked_id);
    //console.log(karte.id);
    //console.log(clicked_id);
    //console.log(karte);
    karte.style.transitionDuration = "0.75s";
    async function flip() {
        karte.style.transform = "rotateY(-90deg)";
        await sleep(1000);
        karte.src = "/img/" + karte.ariaLabel + ".png";
        await sleep(200);
        karte.style.transform = "rotateY(0deg)";
    }

    flip();
    aktuelleKarte++;
    /*karte.style.transform = "rotateY(-90deg)";
    sleep(2000).then(() => { karte.src = "/img/" + deck[0] + ".png"; })
    karte.style.transform = "rotateY(-90deg)";*/

}


function eingabeUeberpruefen(){
    let btn1 = document.getElementById("btn1"); //Höher
    let btn2 = document.getElementById("btn2");//Tiefer
    let btn3 = document.getElementById("btn3");//Gleich

    btn1.addEventListener("click", () => {
        if (document.getElementById(parseInt(aktuelleKarte)).ariaLabel.match(/\d+/)[0] > document.getElementById(parseInt(aktuelleKarte) + 1).ariaLabel.match(/\d+/)[0]) {
            document.getElementById("message").innerHTML = "Stark";
            gewinner();
        }
        else {
            document.getElementById("message").innerHTML = "Verloren";
            resetSpiel();
        }
        flipCart(aktuelleKarte + 1);
    });

    btn2.addEventListener("click", () => {
        if (document.getElementById(parseInt(aktuelleKarte)).ariaLabel.match(/\d+/)[0] < document.getElementById(parseInt(aktuelleKarte) + 1).ariaLabel.match(/\d+/)[0]) {
            document.getElementById("message").innerHTML = "Stark";
            gewinner();
        }
        else {
            document.getElementById("message").innerHTML = "Verloren";
            resetSpiel();
        }
        flipCart(aktuelleKarte + 1);
    });

    btn3.addEventListener("click", () => {
        if (document.getElementById(parseInt(aktuelleKarte)).ariaLabel.match(/\d+/)[0] === document.getElementById(parseInt(aktuelleKarte) + 1).ariaLabel.match(/\d+/)[0]) {
            document.getElementById("message").innerHTML = "Stark";
            gewinner();
        }
        else {
            document.getElementById("message").innerHTML = "Verloren";
            resetSpiel();
        }
        flipCart(aktuelleKarte + 1);
    });
}

function resetSpiel(){
    document.getElementById("message").innerText = `Ihr müsst ${aktuelleKarte} Schlücke trinken`;
    aktuelleKarte = -1;
    let myNode = document.getElementById("karten");
    myNode.innerHTML = '';

    reihenLegen();

}

function gewinner() {
    if (aktuelleKarte === 10){
        document.getElementById("message").innerText = "Das Spiel ist vorbei";
    }
}
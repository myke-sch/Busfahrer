//B = Bube, D = Dame, K = König, A = Ass

//let karo_deck = ["karo7", "karo8","karo9","karo10", "karoB", "karoD", "karoK", "karoA"];
let karo_deck = ["karo7", "karo8","karo9","karo10", "karoB", "karoD", "karoK", "karoA"];
let kreuzArrary = ["Kreuz7", "Kreuz8", "Kreuz9", "Kreuz10", "Kreuz11", "Kreuz12", "Kreuz13", "Kreuz14",];

let herzArray = ["Herz 7", "Herz 8", "Herz 9", "Herz 10", "Herz 11", "Herz 12", "Herz 13", "Herz 14",
];
let pik_deck = ["pik7", "pik8", "pik9", "pik10", "pikB", "pikD", "pikK", "pikA"];

let karten_deck = ["karo7", "karo8","karo9","karo10", "karoB", "karoD", "karoK", "karoA", "Kreuz7",
    "kreuz8", "kreuz9", "kreuz10", "kreuzB", "kreuzD", "kreuzK", "kreuzA", "herz7", "herz8", "herz9", "herz10", "herzB",
    "herzD", "herzK", "herzA", "pik7", "pik8", "pik9", "pik10", "pikB", "pikD", "pikK", "pikA"];


let deck = [];
let deck_size = 32;

function changePic() {
    
    deck = karten_mischen(karten_deck)
    console.log(deck);
    showDeck();

}

/*function createDeck() {
    let deck_size_counter = 0;
    while(deck_size_counter < deck_size)  {
        let karo_karte = karten_deck[Math.floor(Math.random() * (karten_deck.length - 0)) + 0];
        if(deck.includes(karo_karte)) {
            console.log("Doppelt " + karo_karte);
        }
        else {
            deck.push(karo_karte);
            deck_size_counter++;
        }
    }
} */


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

function showDeck(){

    for (let i = 0; i < deck_size; i++) {

        let picture = document.createElement("img");
        picture.src = "/img/" + deck[i] + ".png"
        document.body.appendChild(picture);
    }
}
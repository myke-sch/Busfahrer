function zufaelligeKarte(){
    let herzArray = [
        "Herz 7",
        "Herz 8",
        "Herz 9",
        "Herz 10",
        "Herz 11",
        "Herz 12",
        "Herz 13",
        "Herz 14",
    ];
    let randomItem = herzArray[Math.floor(Math.random()*myArray.length)];
    document.getElementById("kartendeck").innerHTML = zufaelligeKarte;
}
let karo_deck = ["herz7", "herz8","herz9","herz10", "herzB", "herzD", "herzK", "herzA"];
karo_karte = karo_deck[Math.floor(Math.random() * (karo_deck.length - 0)) + 0];

console.log(karo_karte);

karten_bilder = document.getElementById("karo_bilder");

karten_bilder.src =
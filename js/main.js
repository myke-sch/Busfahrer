//B = Bube, D = Dame, K = König, A = Ass

let karo_deck = ["karo7", "karo8","karo9","karo10", "karoB", "karoD", "karoK", "karoA"];
karo_karte = karo_deck[Math.floor(Math.random() * (karo_deck.length - 0)) + 0];

console.log(karo_karte);

karten_bilder = document.getElementById("karo_bilder");

karten_bilder.src = karo_karte;

let pik_deck = ["pik7", "pik8", "pik9", "pik10", "pikB", "pikD", "pikK", "pikA"];
pik_karte = pik_deck[Math.floor(Math.random() * (pik_deck.length - 0)) + 0]

console.log(pik_karte);

karten_bilder = document.getElementById("pik_bilder");

karten_bilder.src = pik_karte;
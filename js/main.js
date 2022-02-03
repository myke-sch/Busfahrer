//B = Bube, D = Dame, K = König, A = Ass

//let karo_deck = ["karo7", "karo8","karo9","karo10", "karoB", "karoD", "karoK", "karoA"];
let karo_deck = ["karo7", "karo8","karo9","karo10", "karoB", "karoD", "karoK", "karoA"];
karo_karte = karo_deck[Math.floor(Math.random() * (karo_deck.length - 0)) + 0];

console.log(karo_karte);

karten_bilder = document.getElementsByClassName("image1");

karten_bilder.src = "img/karo7.png";
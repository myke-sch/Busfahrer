let karten_deck = ["karo7", "karo8","karo9","karo10", "karo11", "karo12", "karo13", "karo14", "Kreuz7",
    "kreuz8", "kreuz9", "kreuz10", "kreuz11", "kreuz12", "kreuz13", "kreuz14", "herz7", "herz8", "herz9", "herz10", "herz11",
    "herz12", "herz13", "herz14", "pik7", "pik8", "pik9", "pik10", "pik11", "pik12", "pik13", "pik14"];


console.log(deck_import);

//import deck from './main';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

function changePic() {

    //deck = karten_mischen(karten_deck)

    console.log(deck);

}

function pyramideZiehen() {
    let reihePyramide = 0;
    console.log(JSON.parse(localStorage.getItem("karten")));
    deck = JSON.parse(localStorage.getItem("karten"));
    console.log(deck);
    for (let i = 9; i >= 0; i--) {
        let picture = document.createElement("img");
        picture.src = "/img/" + "back" + ".png";
        //picture.onclick = flipCart();
        picture.ariaLabel = deck[i];
        picture.setAttribute("class", "image");
        picture.setAttribute("id", deck[i]);
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
    deck.shift();
    localStorage.clear();
    localStorage.setItem("karten", JSON.stringify(deck));
}

function flipCart(clicked_id) {
    let karte = document.getElementById(clicked_id);
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

    /*karte.style.transform = "rotateY(-90deg)";
    sleep(2000).then(() => { karte.src = "/img/" + deck[0] + ".png"; })
    karte.style.transform = "rotateY(-90deg)";*/

}
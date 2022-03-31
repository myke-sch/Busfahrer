let karten_deck = ["karo7", "karo8","karo9","karo10", "karo11", "karo12", "karo13", "karo14", "Kreuz7",
    "kreuz8", "kreuz9", "kreuz10", "kreuz11", "kreuz12", "kreuz13", "kreuz14", "herz7", "herz8", "herz9", "herz10", "herz11",
    "herz12", "herz13", "herz14", "pik7", "pik8", "pik9", "pik10", "pik11", "pik12", "pik13", "pik14"];

console.log(deck_import);
var kartenGeladen = false;


//import deck from './main';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function pyramideZiehen() {
    let reihePyramide = 0;
    console.log(JSON.parse(localStorage.getItem("karten")));
    deck = JSON.parse(localStorage.getItem("karten"));
    console.log(deck);
    console.log(spielerKarten);
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
    localStorage.clear();
    localStorage.setItem("karten", JSON.stringify(deck));
    kartenGeladen = true;
}


function flipCart(clicked_id) {
    let karte = document.getElementById(clicked_id);
    //console.log(clicked_id);
    //console.log(karte);
    karte.style.transitionDuration = "0.75s";
    if (kartenGeladen) {
        deck.shift();
    }
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
function zufaelligeKarte (){
    let kreuzArrary = [
        "Kreuz7",
        "Kreuz8",
        "Kreuz9",
        "Kreuz10",
        "Kreuz11",
        "Kreuz12",
        "Kreuz13",
        "Kreuz14",
    ];
    let zufaelligeKarte = kreuzArrary[Math.floor(Math.random()*kreuzArray.length)];
    document.getElementById("kartendeck").innerHTML = zufaelligeKarte;

}
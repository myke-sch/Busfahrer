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
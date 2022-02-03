function zufaelligeKarte (){
    let myArrary = [
        "Kreuz7",
        "Kreuz8",
        "Kreuz9",
        "Kreuz10",
        "Kreuz11",
        "Kreuz12",
        "Kreuz13",
        "Kreuz14",
    ];
    let randomItem = myArray[Math.floor(Math.random()*myArray.length)];
    document.getElementById("kartendeck").innerHTML = randomItem;

}

window.onload = function() { //wartet bis Website geladen ist und läd danach funktionen und variablen -> nötig um Fehler zu umgehen
    let startbtn = document.getElementById("start-btn");
    startbtn.addEventListener("click", () => {
        location.href = "../html/runde1.html";
        let spielerAnzahl = document.getElementById("spielerAnzahl").value;
        localStorage.setItem("spielerAnzahl", JSON.stringify(spielerAnzahl));
    });
};


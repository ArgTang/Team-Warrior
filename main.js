/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */
"use strict"; //compile all js in strict mode
function dropdownopen() {
    //funksjon for å vise mobil nav
    var dropdown = document.getElementById("dropmenu");
    
    if (dropdown.className === "visible") {
        dropdown.className = "closed";
    } else {
        dropdown.className = "visible";
    }
}

function apne(i) {
    console.log("apne(" + i + ")");
    //funksjonen for å åpne luke
	var d = new Date(),
        n = d.getDate(),
        m = d.getMonth(),
        flipper = document.getElementById("flipper" + i);
    //åpner luke hvis desember og dag < dagen i dag
    if (flipper.className === "flipper" && i <= n && m === 10) {
        flipper.className = "flipperopen";
    } else {
        flipper.className = "flipper";
    }
}

function GjemGammelLuke() {
    //funksjon for å gjemme gamle luker på mobil
    //funker ikke for dag == 7 ??
    var width = document.body.offsetWidth,
        i,
        luker,
        dag = new Date();
    //Safari hack http://browserhacks.com/
    if(/constructor/i.test(window.HTMLElement)){
        luker = document.querySelector(".internetexplorer");
        luker.innerHTML = "Som du ser har vi ikke fått til denne siden til safari enda, den fungerer derimot fint sammen med chrome, opera eller Firefox.";
        luker.style.display = "block";
    }
    
    dag = dag.getDate();
    console.log("GjemGammelLuke()");
    console.log("width " + width + "px");
    //legger invertert farge til dagen i dag
    luker = document.getElementById("front" + dag);
    luker.style.backgroundColor = "white";
    luker.style.color = "rgb(172,45,66)";
    //sjekker om mobilside
    if (width < 620 && dag < 25){
        //gjemmer luker 5 eller 6 dager før dagen i dag (sånn at det blir partall antall luker igjenn)
        luker = document.querySelectorAll(".luke");
        for (i = 0; i < (dag - 4); i++) {
            luker[i].style.display = "none";
            //Teller til Lukenummer så de blir riktige
            if (i ===  (dag - 6) || dag === 5) {
                luker[i + 2 - (dag === 5)].style.counterIncrement = "luke " + (i + 3 - (dag === 5) );
            }
        }
    }
}

function ESCclose(evt) {
    //lukke konkuranse vindu med ESC
    console.log("ESClose");
  if (evt.keyCode == 27) {
      window.history.back(-1);//Bare FF
  }
}

// info om localstorage http://diveintohtml5.info/storage.html
function supportsLocalStorage() {
    //sjekker om localstorage er støttet (for alle uten veldig gamle nettlesere)
    return typeof (Storage) !== "undefined";
}

function inputvalidering(streng) {
    //sjekker om input er et tall
    console.log("inputvalidering()");
    if (streng === "") { return false; } //sjekker om det er fylt inn noe
    if (streng.indexOf("s") !== -1) {
        streng = streng.slice(1);
    } //fjerner s
    return (!isNaN(streng)); //return hvis nummer  
}

function lagrebruker(studentnummer) {
    //Lagrer bruker i localstorage
    console.log("lagrebruker()");
    if (!supportsLocalStorage()) { return -1; } //sjekker om localstorage metode er tiljengelig
    if (inputvalidering(studentnummer)) { //kan nok skrives om sammen med inputvalidering
        if (studentnummer.indexOf("s") !== -1) {
            studentnummer = studentnummer.slice(1);
        } //fjerner s
        
        localStorage['deltaker'] = studentnummer;
        console.log("localStorage['deltaker'] " + localStorage['deltaker']);
        return true;
    } else {
        return false;
    }
}

function fyllinnbruker() {
    //funksjon for å hente bruker fra localstorage
    console.log("fyllinnbruker()");
    if (!supportsLocalStorage()) { console.log("LocalStorage not supported"); return; }
    var studentnummer = parseInt(localStorage['deltaker'], 10);
    //sjekker om nummer finnes i minne && dobbeltsjekk om det er et nummer
    console.log("Studentummer: " + studentnummer);
    if (studentnummer !== undefined && !isNaN(studentnummer)) {
        document.getElementById("stdnr").value = studentnummer;
    } else {
        return;
    }
}
    
function sendskjema() {
    //sjekker om alle felt er utfylt, og sender avgårde svar, gir også tilbakemeling
    console.log("sendskjema()");
    var input = document.getElementById('stdnr').value,
        bruker_lagret = lagrebruker(input),
        melding = "",
        answers = document.querySelectorAll('.skjema input[type="radio"]'),
        i,
        srver = new Array();
        
    //sjekker om lagring suksessfull eller input er godkjent hvis "cookies" er slått av
    if (bruker_lagret || (bruker_lagret === -1 && inputvalidering(input))) {
        // fryser og finner hvilken radialmeny som er krysset av
        console.log("radio " + answers[0]);
        for (i = 0; i < answers.length; i++) {
            answers[i].disabled = true; //disable radiobutton
            if (answers[i].checked) {
                srver[srver.length] = i + 1;
            }
        }
        srver[srver.length] = input;
        if (srver[srver.length - 1] !== "" && srver[0] > 0 && srver[1] > 0) {
            //Hvis det er krysset av på begge spørsmål, send svarene til server
            var sendSvaret = new XMLHttpRequest();
            console.log("sendSvaret()");
            sendSvaret.onreadystatechange = function () {
                if (sendSvaret.readyState === 4 && sendSvaret.status === 200) {
                    melding = "Svar mottat. Takk for innsats";
                    console.log(melding);
                    document.getElementById("spmmelding").innerHTML = melding;
                }
            };
            sendSvaret.open("GET", "server.php?sendskjema=" + JSON.stringify(srver), true);
            console.log(JSON.stringify(srver));
            sendSvaret.send();
        } else {
            //melding hvis ikke svart på begge spørsmål
            melding = "Vennligst sjekk at du har krysset av et svar på begge spørsmål!";
            console.log("her");
            for (i = 0; i < answers.length; i++) {
                answers[i].disabled = false; //låser opp igjen radial knappene
            }
        }
    } else {
        //melding hvis ikke studentnr godkjent
        melding = "Vennligst sjekk at du har skrevet inn ditt studentnummer!";
    }
    
    if (melding !== "") {
        document.getElementById("spmmelding").innerHTML = melding;
        document.getElementById("spmmelding").style.color = 'rgb(172,45,66)';
    }
}

function visKonkurranse(dag) {
    //Henter konkuranse fra etterspurt dag og setter inn i skjema
    console.log("visKonkuranse(" + dag + ")");
    fyllinnbruker(); //fyller inn studnummer hvis dette er i cache
    var sporsmol = new XMLHttpRequest(),
        d = new Date(),
        n = d.getDate(),
        i,
        resp,
        spm = document.querySelectorAll(".sporsmal");

    //spør server om dagens spørsmål
    
    sporsmol.onreadystatechange = function () {
        if (sporsmol.readyState === 4 && sporsmol.status === 200) {
            console.log(sporsmol.responseText);
            resp = JSON.parse(sporsmol.responseText);
            //display dagens spørsmål til bruker
            for (i = 0; i < spm.length; i++) {
                spm[i].innerHTML = resp[i * 6] + '<br> ' +
                    '<input type="radio" label="alternativ1" title="velg svaralternativ"  name="svar' + (i + 1) + '"  value=" ">' + resp[i * 6 + 1] + '<br>' +
                    '<input type="radio" label="alternativ2" title="velg svaralternativ" name="svar' + (i + 1) + '"  value=" ">' + resp[i * 6 + 2] + '<br>' +
                    '<input type="radio" label="alternativ3" title="velg svaralternativ" name="svar' + (i + 1) + '"  value=" ">' + resp[i * 6 + 3] + '<br>' +
                    '<input type="radio" label="alternativ4" title="velg svaralternativ" name="svar' + (i + 1) + '"  value=" ">' + resp[i * 6 + 4] + '<br>';
                console.log(spm[i]);
            }
        }
    };
    sporsmol.open("GET", "server.php?visKonkurranse=" + dag, true);
    sporsmol.send();
}



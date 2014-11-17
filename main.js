"use strict"; //compile all js in strict mode

function getDato() {
    var xmlhttp = new XMLHttpRequest();
    //metode for å finne dato fra PHP server
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var dato = xmlhttp.responseText;
            console.log("Dato: " + dato);
            document.getElementById("serverDato").value = dato;
            document.getElementById("serverDato").innerHTML = dato;
        }
    };
    xmlhttp.open("GET", "server.php?dato=", true);
    xmlhttp.send();
    console.log("getDato()");
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


// info om localstorage http://diveintohtml5.info/storage.html
function supportsLocalStorage() {
    return typeof (Storage) !== "undefined";
}

function inputvalidering(streng) {
    console.log("inputvalidering()");
    if (streng === "") { return false; } //sjekker om det er fylt inn noe
    if (streng.indexOf("s") !== -1) {
        streng = streng.slice(1);
    } //fjerner s
    return (!isNaN(streng)); //return hvis nummer  
}

function lagrebruker(studentnummer) {
    console.log("lagrebruker()");
    if (!supportsLocalStorage()) { return -1; } //sjekker om localstorage metode er tiljengelig
    if (inputvalidering(studentnummer)) {       //bug her!!!!
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

function hentebruker() {
    console.log("hentebruker()");
    if (!supportsLocalStorage()) { return false; }
    var studentnummer = parseInt(localStorage['deltaker'], 10);
    //sjekker om nummer finnes i minne && dobbeltsjekk om det er et nummer
    console.log(studentnummer);
    if (studentnummer !== null && !isNaN(studentnummer)) {
        return ('s' + studentnummer);
    } else {
        return null;
    }
}

function fyllinnbruker() {
    console.log("fyllinnbruker()");
    var stud = hentebruker();
    if (stud !== null || stud !== undefined) { //hvis bruker er lagret
        document.getElementById("stdnr").value = stud;
    }
}
    
function sendskjema() { //not working, tenk at dette er pseudokode
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
        for(i = 0; i< answers.length; i++){
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
            for(i = 0; i < answers.length; i++)
                answers[i].disabled = false; //låser opp igjrn radial knappene
        }
    } else {
        //melding hvis ikke studentnr godkjent
        melding = "Vennligst sjekk at du har skrevet inn ditt studentnummer!";
    }
    
    if (melding !== "") {
        document.getElementById("spmmelding").innerHTML = melding;
        document.getElementById("spmmelding").style.color = 'red';
    }
}

function visKonkurranse(dag) {
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
                    '<input type="radio"  name="svar' + (i + 1) + '"  value=" ">' + resp[i * 6 + 1] + '<br>' +
                    '<input type="radio"  name="svar' + (i + 1) + '"  value=" ">' + resp[i * 6 + 2] + '<br>' +
                    '<input type="radio"  name="svar' + (i + 1) + '"  value=" ">' + resp[i * 6 + 3] + '<br>' +
                    '<input type="radio"  name="svar' + (i + 1) + '"  value=" ">' + resp[i * 6 + 4] + '<br>';
                console.log(spm[i]);
            }
        }
    };
    sporsmol.open("GET", "server.php?visKonkurranse=" + dag, true);
    sporsmol.send();
}



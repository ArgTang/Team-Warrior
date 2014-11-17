"use strict"; //compile all js in strict mode

function getDato() {
    var xmlhttp = new XMLHttpRequest();
    //metode for å finne dato fra PHP server
    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.readyState + " " + xmlhttp.status);
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var dato = xmlhttp.responseText;
            console.log("Dato: " + dato);
            document.getElementById("serverDato").value = dato;
            document.getElementById("serverDato").innerHTML = dato;
        }
    }
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

function inputvalidering(a) {
    console("inputvalidering()");
    if (a === "") { return false; } //sjekker om det er fylt inn noe
    if (String.indexOf('s') !== -1) {
        a = String.slice(1);
    } //fjerner s
    return (isNaN(a)); //return hvis nummer  
}

function lagrebruker(studentnummer) {
    console.log("lagrebruker()");
    if (!supportsLocalStorage()) { return -1; } //sjekker om localstorage metode er tiljengelig
    if (inputvalidering(studentnummer)) {
        localStorage['deltaker'] = studentnummer;
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
    if (studentnummer !== null && isNaN(studentnummer)) {
        return ('s' + studentnummer);
    }
}

function fyllinnbruker() {
    console.log("fyllinnbruker()");
    var stud = hentebruker();
    console.log(stud);
    if (stud !== false) { //hvis bruker er lagret
        document.getElementsByName("Snr").value = stud;
    }
}
    
/*function sendskjema() { //not working, tenk at dette er pseudokode
    console.log("sendskjema");
    var input = document.getElementsByName("Snr"),
        temp = lagrebruker(input),
        svar,
        melding = "";
        
    //sjekker om lagring suksessfull eller input er godkjent hvis cookies er slått av
    if (temp || (temp === -1 && inputvalidering(input))) {
        // fryser og finner hvilken radialmeny som er krysset av
        if (document.getElementsName("alt1").checked) {
            document.getElementsByName("alt1").disabled = true;
            svar[0] = 1;
        } else if (document.getElementsName("alt2").checked) {
            document.getElementsByName("alt2").disabled = true;
            svar[0] = 2;
        } else if (document.getElementsName("alt3").checked) {
            document.getElementsByName("alt3").disabled = true;
            svar[0] = 3;
        } else if (document.getElementsName("alt4").checked) {
            document.getElementsByName("alt4").disabled = true;
            svar[0] = 4;
        }
        document.getElementsName("svar1").value = svar[0];
        
        if (document.getElementsName("alt5").checked) {
            document.getElementsByName("alt5").disabled = true;
            svar[1] = 1;
        } else if (document.getElementsName("alt6").checked) {
            document.getElementsByName("alt6").disabled = true;
            svar[1] = 2;
        } else if (document.getElementsName("alt7").checked) {
            document.getElementsByName("alt7").disabled = true;
            svar[1] = 3;
        } else if (document.getElementsName("alt8").checked) {
            document.getElementsByName("alt8").disabled = true;
            svar[1] = 4;
        }     
        document.getElementsName("svar2").value = svar[1];
        
        if (svar[0] > 0 && svar[1] > 0) {
            //SendSvar(temp, svar);
            //Hvis det er krysset av på begge spørsmål, send svarene til server
            var sendSvaret = new XMLHttpRequest();
            sendSvaret.onreadystatechange = function () {
                if (sendSvaret.readyState === 4 && sendSvaret.status === 200) {
                    melding = "Svar mottat. Takk for innsats";
                }
            };
            sendSvaret.open("GET", "server.php?sendskjema=", true);
            sendSvaret.send();
        
        } else {
            //melding hvis ikke svart på begge spørsmål
            melding = "Vennligst sjekk at du har krysset av et svar på begge spørsmål";
        }
    } else {
        //melding hvis ikke studentnr godkjent
        melding = "Vennligst sjekk at du har skrevet inn ditt studentnummer";
    }
    
    if (melding !== "") {
        document.getElementsByClassName("spmmelding").innerHTML = melding;
    }
}*/

function visKonkurranse(dag) {
    console.log("visKonkuranse(" + dag + ")");
    fyllinnbruker(); //fyller inn studnummer hvis dette er i cache
    var spm,
        sporsmol = new XMLHttpRequest(),  
        d = new Date(),
        n = d.getDate(),
        i,resp,
        spm = document.querySelectorAll(".sporsmal");

    //spør server om dagens spørsmål
    /*
    sporsmol.onreadystatechange = function () {
        if (sporsmol.readyState === 4 && sporsmol.status === 200) {
            console.log(sporsmol.responseText);
            resp = JSON.parse(sporsmol.responseText);
            console.log(resp[0]); //Fail her
            console.log(resp[1]);
            //display dagens spørsmål til bruker
            for (i = 0; i < spm.length; i++) {
                spm[i].innerHTML = resp[i*6] + '<br> ' +
                    '<input type="radio"  name="svar' + (i+1) + '"  value=" ">' + resp[i*6 + 1] + '<br>' +
                    '<input type="radio"  name="svar' + (i+1) + '"  value=" ">' + resp[i*6 + 2] + '<br>' +
                    '<input type="radio"  name="svar' + (i+1) + '"  value=" ">' + resp[i*6 + 3] + '<br>' +
                    '<input type="radio"  name="svar' + (i+1) + '"  value=" ">' + resp[i*6 + 4] + '<br>';
                console.log(spm[i]);
            }
        }
    }
    sporsmol.open("GET", "server.php?visKonkurranse=" + dag, true);
    sporsmol.send();
}*/



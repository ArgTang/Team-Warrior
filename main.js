"use strict"; //compile all js in strict mode

function apne(i) {
	var d = new Date(),
        n = d.getDate();
        
        /*serverdate = new XMLHttpRequest();
        serverdate.onreadystatechange = Function() {
            if(serverdate.readyState === 4 &&serverdate.status === 200) {
                var endato = serverdate.responseText();
            }
        serverdate.open("GET", "getDato.php", true);
        serverdate.send();*/ /* incomplete code */
            
    var m = d.getMonth(),
        flipper = document.getElementById("flipper" + i);
    
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
    if (a === "") { return false; } //sjekker om det er fylt inn noe
    if (String.indexOf('s') !== -1) {
        a = String.slice(1);
    } //fjerner s
    return (isNaN(a)); //return hvis nummer  
}

function lagrebruker(studentnummer) {
    if (!supportsLocalStorage()) { return -1; } //sjekker om localstorage metode er tiljengelig
    if (inputvalidering(studentnummer)) {
        localStorage['deltaker'] = studentnummer;
        return true;
    } else {
        return false;
    }
}

function hentebruker() {
    if (!supportsLocalStorage()) { return false; }
    var studentnummer = parseInt(localStorage['deltaker'], 10);
    //sjekker om nummer finnes i minne && dobbeltsjekk om det er et nummer
    if (studentnummer !== null && isNaN(studentnummer)) {
        return ('s' + studentnummer);
    }
}

function fyllinnbruker() {
    var stud = hentebruker();
    if (stud !== false) { //hvis bruker er lagret
        document.getElementsByName("Snr").value = stud;
    }
}
    
function sendskjema() {
    var input = document.getElementsByName("Snr"),
        temp = lagrebruker(input),
        svar,
        melding = "";
    //sjekker om lagring suksessfull eller input er godkjent hvis cookies er slått av
    if (temp || (temp === -1 && inputvalidering(input))) {
        
        if (document.getElementsName("alt1").innerHTML === true) {
            svar[0] = 1;
        } else if (document.getElementsName("alt2").innerHTML === true) {
            svar[0] = 2;
        } else if (document.getElementsName("alt3").innerHTML === true) {
            svar[0] = 3;
        } else if (document.getElementsName("alt4").innerHTML === true) {
            svar[0] = 4;
        }
        
        if (document.getElementsName("alt5").innerHTML === true) {
            svar[1] = 1;
        } else if (document.getElementsName("alt6").innerHTML === true) {
            svar[1] = 2;
        } else if (document.getElementsName("alt7").innerHTML === true) {
            svar[1] = 3;
        } else if (document.getElementsName("alt8").innerHTML === true) {
            svar[1] = 4;
        }
        
        if (svar[0] > 0 && svar[1] > 0) {
            //SendSvar(temp, svar);
            var sendSvaret = new XMLHttpRequest();
            sendSvaret.onreadystatechange = function () {
                if (sendSvaret.readyState === 4 && sendSvaret.status === 200) {
                    melding = "Svar mottat. Takk for innsats";
                }
            };
            sendSvaret.open("GET", "SendSvar.php", true);
            sendSvaret.send();
            
        } else {
            melding = "Vennligst sjekk at du har krysset av et ssvar på begge spørsmål";
        }
    } else {
        melding = "Vennligst sjekk at du har skrevet inn ditt studentnummer";
    }
    
    if (melding !== "") {
        document.getElementsByClassName("spmmelding").innerHTML = melding;
    }
}

function sporrevindu(dag) {
    fyllinnbruker();
    var spm,
        sporsmol = new XMLHttpRequest();
    sporsmol.onreadystatechange = function () {
        if (sporsmol.readyState === 4 && sporsmol.status === 200) {
            spm = JSON.parse(sporsmol.responseText);
        }
    };
    sporsmol.open("GET", "sporsmol.php", true);
    sporsmol.send();
    //var spm = getSporsmal(dag);
    if (spm !== null) {
        document.getElementsByClassName("sporsmal1").innerHTML = spm[0];
        document.getElementsName("alt1").innerHTML = spm[1];
        document.getElementsName("alt2").innerHTML = spm[2];
        document.getElementsName("alt3").innerHTML = spm[3];
        document.getElementsName("alt4").innerHTML = spm[4];
        document.getElementsByClassName("sporsmal2").innerHTML = spm[5];
        document.getElementsName("alt5").innerHTML = spm[6];
        document.getElementsName("alt6").innerHTML = spm[7];
        document.getElementsName("alt7").innerHTML = spm[8];
        document.getElementsName("alt8").innerHTML = spm[9];
    }
}



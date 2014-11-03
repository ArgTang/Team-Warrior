"use strict"; //compile all js in strict mode

function apne(i) {
	var d = new Date();
    var n = d.getDate();
	var m = d.getMonth();
    var myElement = document.getElementById("dato" + i);
    if (myElement.className === "dato" && i <= n && m === 10) {
        myElement.className = "opendato";
    } else {
        myElement.className = "dato";
    }
	
}

function sporrevindu() {

}

// info om localstorage http://diveintohtml5.info/storage.html
function supportsLocalStorage() {
    return 'localStorage' in window && window['localStorage'] !== null;
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
    var studentnummer = parseInt(localstorage['deltaker'], 10);
    //sjekker om nummer finnes i minne && dobbeltsjekk om det er et nummer
    if (studentnummer !== null && isNaN(studentnummer)) {
        return ('s' + studentnummer);
    }
}


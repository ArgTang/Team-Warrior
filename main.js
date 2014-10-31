function åpne(i){
    
        var myElement = document.getElementById("dato"+i);
    
        if (myElement.className == "dato")
            myElement.className = "opendato";   
        else
            myElement.className = "dato";   
}

function spørrevindu(){
    var bruker = hentebruker();
    
        
}


// info om localstorage http://diveintohtml5.info/storage.html
function lagrebruker(studentnummer){
    if (!supportsLocalStorage()) { return -1; }//sjekker om localstorage metode er tiljengelig
    if (inputvalidering(studentnummer)){
        localStorage[deltaker]=studentnummer;
        return true;
    }else
        return false;
}

function hentebruker(){
    if (!supportsLocalStorage()) { return false; }
    studentnummer = parseInt(localstorage[deltaker]);    
    return ('s'+studentnummer);
}

function inputvalidering(a){
    if(a == ""){return false} //sjekker om det er fylt inn noe
    if (String.indexOf('s') != -1)
        a = String.slice(1); //fjerner s
    return (isNaN(a)) //return hvis nummer  
}
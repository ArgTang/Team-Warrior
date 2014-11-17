<?php

if (isset($_GET['dato'])){
    getDato();
} else if (isset($_GET['sendskjema'])) {
    sendSvar(json_decode($_GET['sendskjema']));
} else if (isset($_GET['visKonkurranse'])) {
    $dag = $_GET['visKonkurranse'];
    getSporsmal($dag);
}
   
            
    function getDato() {
    // funksjon for å finne dato i dag
        date_default_timezone_set("Europe/Helsinki"); 
        echo date('d');
    }
            
    function SendSvar($svar) {
    // funksjon til å sende svar til mailen vår

        //sendmail
        $to      = 'teamwarrior14@gmail.com';
        $subject = $svar[2] . " " . $riktig;
        $message = $svar;
        $headers = 'From: Adventskalender@hioa.no';

        mail($to, $subject, $message, $headers);
 
    }

    function getSporsmal($dag) {
    //funksjon for til å sende dagens spørsmål til klient
    //leser inn opgsvene frs oppgsver.txt
    $dag -= 1;
    $oppgaver = file('Oppgaver.txt');
    //get dagen som blir purt etter
    // sjekker dato og sender tilbake oppgavene
    if ($dag <= 30 /*getdato()*/){ // get dato fail
    $oppgave = array($oppgaver[$dag*12] , $oppgaver[$dag*12+1] , $oppgaver[$dag*12+2] , $oppgaver[$dag*12+3] , $oppgaver[$dag*12+4] ,  $oppgaver[$dag*12+5] ,  $oppgaver[$dag*12+6] ,  $oppgaver[$dag*12+7] ,  $oppgaver[$dag*12+8] ,  $oppgaver[$dag*12+9], $oppgaver[$dag*12+10], $oppgaver[$dag*12+11]);
    echo json_encode($oppgave);
    } else {
        echo json_encode(null);
       }
    }
?>
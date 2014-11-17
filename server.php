<?php

/*if (isset($_GET['dato'])){
    getDato();
} else if (isset($_GET['sendskjema'])) {
    sendSvar();
} else*/ if (isset($_GET['visKonkurranse'])) {
    $dag = $_GET['visKonkurranse'];
    getSporsmal($dag);
}
   
            
    function getDato() {
    // funksjon for å finne dato i dag
        date_default_timezone_set("Europe/Helsinki"); 
        echo date('d');
    }
            
    function SendSvar() {
    // funksjon til å sende svar til mailen vår
        //get svar og studnr
        $stdnr = $_POST['Snr'];
        $svar[0] = $_POST['svar1'];
        $svar[1] = $_POST['svar2'];
        $riktig = IKKE_RIKTIG;
        //get riktigsvar
        $riktigsvar = getSpørsmål(getDato());
        //sjekkriktigsvar
        if ($riktigsvar != null && $riktigsvar[4] == $svar[0] && $riktigsvar[9] == $svar[1]);
            $riktig = RIKTIG_SVAR;
        //sendmail
        $to      = 'teamwarrior14@gmail.com';
        $subject = $studnummer . " " . $riktig;
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
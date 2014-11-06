    
       
<?php
            
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
        $headers = 'From: Adventskalender@hioa.no'

        mail($to, $subject, $message, $headers);
 
    }

    function getSporsmal() {
    //funksjon for til å sende dagens spørsmål til klient
    //leser inn opgsvene frs oppgsver.txt
    $oppgaver = file('Oppgaver.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    //get dagen som blir purt etter
    $dag = $_POST['dag'];
    // sjekker dato og sender tilbake oppgavene
    if ($dag <= getdato()){
    $oppgave = array($oppgaver[$dag*10] . $oppgaver[$dag*10+1] . $oppgaver[$dag*10+2] . $oppgaver[$dag*10+3] . $oppgaver[$dag*10+4] .  $oppgaver[$dag*10+5] .  $oppgaver[$dag*10+6] .  $oppgaver[$dag*10+7] .  $oppgaver[$dag*10+8] .  $oppgaver[$dag*10+9]);
    echo json_encode($oppgave);
    } else {
        echo json_encode(null);
    }
?>

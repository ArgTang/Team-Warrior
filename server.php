    
       
<?php
            
    function getDato() {
    // function for å finne dato i dag
        date_default_timezone_set("Europe/Helsinki"); 
        echo date('d');
    }
            
    function SendSvar($studnummer, $svar) {
    // function til å sende svar til mailen vår
        $riktig = IKKE_RIKTIG;
        $riktigsvar = getSpørsmål(getDato());
        if ($riktigsvar[4] == $svar[0] && $riktigsvar[9] == $svar[1]);
            $riktig = RIKTIG_SVAR;
        if ($svar == $riktigsvar) {
            $to      = 'teamwarrior14@gmail.com';
            $subject = $studnummer . " " . $riktig;
            $message = $svar;
            $headers = 'From: Adventskalender@hioa.no'

        mail($to, $subject, $message, $headers);
        }
    }

    function getSpørsmål($dag) {
    //function for til å sende dagens spørsmål til klient
    $oppgaver = file('Oppgaver.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        
    if ($dag <= getdato()){
    $oppgave = array($oppgaver[$dag*10] . $oppgaver[$dag*10+1] . $oppgaver[$dag*10+2] . $oppgaver[$dag*10+3] . $oppgaver[$dag*10+4] .  $oppgaver[$dag*10+5] .  $oppgaver[$dag*10+6] .  $oppgaver[$dag*10+7] .  $oppgaver[$dag*10+8] .  $oppgaver[$dag*10+9]);
    echo json_encode($oppgave);
    } else {
        echo json_encode(null);
    }
?>

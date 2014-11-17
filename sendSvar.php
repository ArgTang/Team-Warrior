<?php
    function sendSvar() {
        // funksjon til å sende svar til mailen vår
        //get svar og studnr
        $stdnr = $_POST['Snr'];
        $svar[0] = $_POST['svar1'];
        $svar[1] = $_POST['svar2'];
        $riktig = IKKE_RIKTIG;
        //get riktigsvar
        $riktigsvar = getSporsmal(getDato());
        //sjekkriktigsvar
        if ($riktigsvar != null && $riktigsvar[4] == $svar[0] && $riktigsvar[9] == $svar[1]);
            $riktig = RIKTIG_SVAR;
        //sendmail
        $to      = 'teamwarrior14@gmail.com';
        $subject = $studnummer . " " . $riktig;
        $message = $svar;
        $headers = 'From: adventskalender@hioa.no';

        mail($to, $subject, $message, $headers);
    }
?>
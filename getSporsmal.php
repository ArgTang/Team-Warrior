<?php
    function getSporsmal($dag) {
        //funksjon for til å sende dagens spørsmål til klient
        //leser inn opgsvene frs oppgsver.txt
        $dag -= 1;
        $oppgaver = file('Oppgaver.txt');
        //get dagen som blir purt etter
        // sjekker dato og sender tilbake oppgavene
        if ($dag <= 30 /*getdato()*/){ // get dato fail
            $oppgave = array($oppgaver[$dag*10] , $oppgaver[$dag*10+1] , $oppgaver[$dag*10+2] , $oppgaver[$dag*10+3] , $oppgaver[$dag*10+4] ,  $oppgaver[$dag*10+5] ,  $oppgaver[$dag*10+6] ,  $oppgaver[$dag*10+7] ,  $oppgaver[$dag*10+8] ,  $oppgaver[$dag*10+9]);
            echo json_encode($oppgave);
        } else {
            echo json_encode(null);
        }
    }
?>
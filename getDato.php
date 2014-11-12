<?php
            
    function getDato() {
    // funksjon for å finne dato i dag
        date_default_timezone_set("Europe/Helsinki"); 
        echo date('d');
    }
?>
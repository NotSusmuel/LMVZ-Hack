// ==UserScript==
// @name         LMVZ Solver 02
// @namespace    http://tampermonkey.net/
// @version      2024-10-01
// @description  delete or insert to start
// @author       Claimingnine
// @match        https://003.lmvz.ch/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lmvz.ch
// @grant        none
// ==/UserScript==

(function() {
    let isRunning = false;
    let intervalId;

    function wiederholen() {
        tzeigen();
        tbewerten();
        var resultatElement = document.querySelector('#resultat.resultate');
        if (resultatElement) {
            var centerElement = resultatElement.querySelector('center');
            var resultText = centerElement ? centerElement.innerText : '';
            var inputFeld = document.querySelector('input[name="tresultat"]');

            if (inputFeld) {
                var allText = resultText.replace(/%/g, ''); // Entfernt nur %

                inputFeld.value = allText;
                trichtige += 1;s
                tpruefen();
            }
        }
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Delete') {
            if (!isRunning) {
                intervalId = setInterval(wiederholen, 100);
                isRunning = true;
            } else {
                clearInterval(intervalId);
                isRunning = false;
            }
        } else if (e.key === 'Insert') {
            var eingabe = prompt("Wie viele gelöste Aufgaben willst du?");
            var zahl = parseInt(eingabe, 10);
            if (!isNaN(zahl)) {
                trichtige += zahl;
                wiederholen();
            }
        } else if (e.key === '§') {
            trichtige = (trichtige * 2) - 1;
            wiederholen();
        } else if (e.key === 'b') {
            wiederholen();
        }
    });
})();

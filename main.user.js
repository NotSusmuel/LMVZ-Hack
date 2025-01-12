// ==UserScript==
// @name         LMVZ Digital Hack Ultimate
// @namespace    http://tampermonkey.net/
// @version      2024-03-12
// @description  Lässt jedes Quiz gelöst aussehen.
// @author       Claimingnine
// @match        https://*.lmvz.ch/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lmvz.ch
// @grant        none
// ==/UserScript==

let roundCounter = 1426;

function start() {
    function updateRoundCounter() {
        roundCounter++;
    }

    setInterval(updateRoundCounter, 100);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'h') {
            roundCounter = "∞";
        }
    });

    var buttons = document.querySelectorAll('.buttons.exercise');
    buttons.forEach(function(button) {
        var score = button.getAttribute('data-quiz-score');
        if (score === '' || score === '0' || score === '1' || score === '2' || !score) {
            button.setAttribute('data-quiz-score', '2');
        }
    });

    var element = document.querySelector('.col-auto img[src="https://004.lmvz.ch/disdonc/images/hand-bad.svg"]');
    if (element) {
        element.setAttribute('src', 'https://004.lmvz.ch/disdonc/images/hand-good.svg');
    }

    var elements = document.querySelectorAll('.point.-question.-answered.-wrong');
    elements.forEach(function(element) {
        element.classList.remove('-wrong');
        element.classList.add('-correct');
    });

    var feedbackContainer = document.querySelector('[js="feedback-container"]');
    if (feedbackContainer) {
        feedbackContainer.classList.remove('-v', '-wrong');
        feedbackContainer.classList.add('-correct');
        var feedbackText = feedbackContainer.querySelector('.padding-box p');
        if (feedbackText) {
            feedbackText.innerHTML = 'C’est juste.';
        }
    }

    var teleportView = document.querySelectorAll('div[view="TeleportView"]');
    teleportView.forEach(function(element) {
        var nestedView = element.querySelector('div[view]');
        if (nestedView) {
            var viewType = nestedView.getAttribute('view');
            if (viewType === 'PuzzleGameOver') {
                element.remove();
            }
        }
    });

    var liveElements = document.querySelectorAll('.live.spacer-box.-m-right-s4');
    liveElements.forEach(function(liveElement) {
        liveElement.classList.add('-avaiable');
    });

    var scoreElements = document.querySelectorAll('div');
    scoreElements.forEach(function(scoreElement) {
        var textContent = scoreElement.textContent;
        var match = textContent.match(/^(\d+) \/ (\d+)$/);
        if (match && match[1] !== match[2]) {
            scoreElement.textContent = `${match[2]} / ${match[2]}`;
        }
    });

    var repeatElements = document.querySelectorAll('div[view="Repeat"].lives.flex-layout.-items-center.spacer-box.-m-right-s16.-low.-medium, div[view="Repeat"].lives.flex-layout.-items-center.spacer-box.-m-right-s16.-medium');
    repeatElements.forEach(function(repeatElement) {
        repeatElement.classList.remove('-low', '-medium');
    });

    function updateTextElement() {
        var textElement = document.querySelector('div.text-style.-s17.-black.-center.-router.spacer-box.-m-bottom-s32');
        if (textElement) {
            var textContent = textElement.textContent;
            var roundMatch = textContent.match(/Du hast Runde \d+ geschafft\./);
            if (roundMatch) {
                textElement.textContent = `Du hast Runde ${roundCounter} geschafft. (drücke H)`;
            }
        }
    }

    setInterval(updateTextElement, 0);

    setTimeout(start, 0);
}

start();

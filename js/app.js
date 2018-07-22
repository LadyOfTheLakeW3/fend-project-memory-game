/*
 * Create a list that holds all of your cards
 */
const cardsArray = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initGame() {
    let deck = document.querySelector('.deck');
    let cardHTML = shuffle(cardsArray).map(function (card) {
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join('');

    let cards = document.querySelectorAll('.card');
    let openCards = [];
    let match = 0;

    cards.forEach(function (card) {
        card.addEventListener('click', function (e) {

            if (startGame === 0) {
                timer();
                startGame++;
            }
            if (!card.classList.contains('open') &&
                !card.classList.contains('show') &&
                !card.classList.contains('match')
            ) {
                openCards.push(card);
                card.classList.add('open', 'show');

                if (openCards.length == 2) {
                    moveCount();
                    //matching cards
                    if (openCards[0].dataset.card == openCards[1].dataset.card) {
                        openCards[0].classList.add('match');
                        openCards[0].classList.add('open');
                        openCards[0].classList.add('show');

                        openCards[1].classList.add('match');
                        openCards[1].classList.add('open');
                        openCards[1].classList.add('show');

                        openCards = [];
                        match++;
                        winGame(match);

                    } else {
                        setTimeout(function () {
                            openCards.forEach(function (card) {
                                card.classList.remove('open', 'show');
                            });
                            openCards = [];
                        }, 400);
                    }
                }
            }
        });
    });

    let moves = 0;
    let counter = document.querySelector('.moves');
    //Counting moves and showing stars according to moves value
    function moveCount() {
        moves++;
        counter.innerHTML = moves;
        if (moves > 15 && moves < 21) {
            document.getElementById('third').style.color = "white";
        } else if (moves >= 21) {
            document.getElementById('second').style.color = "white";
        }
    }
};

let modal = document.querySelector('.modal');
let matchedCards = document.getElementsByClassName('.match');
let span = document.getElementsByClassName("close")[0];

//Setting timer
let lastTime = document.querySelector('totaltime');
let time = document.querySelector('.displayTime');
let startGame = 0;
let gameInterval;

function timer() {
    let minutes = 0;
    let seconds = 0;
    gameInterval = setInterval(function () {
        seconds = parseInt(seconds, 10) + 1;
        minutes = parseInt(minutes, 10);
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        time.innerHTML = minutes + ":" + seconds;
        lastTime.textContent = time.textContent;
    }, 1000);
}
//Finishing game if all cards match
function winGame(match) {
    if (match === 8) {
        stopTimer()
        modal.style.display = "block";
        finish();
    }
}

function stopTimer() {
    clearInterval(gameInterval);
}

function finish() {
    model.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
};
//Congratulations Popup
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    let totalMoves = document.querySelector('.moves').textContent;
    document.getElementById('totalMoves').textContent = totalMoves + " moves";
    let theStars = document.getElementsByClassName('stars');
    if (totalMoves > 15 && totalMoves < 21) {
        document.getElementById('totalStars').innerHTML = 2 + " stars";
    } else if (totalMoves >= 21) {
        document.getElementById('totalStars').innerHTML = 1 + " star";
    } else {
        document.getElementById('totalStars').innerHTML = 3 + " stars";
    }
    document.getElementById('totaltime').textContent = time.textContent;
};

let moves = document.querySelector('.moves');

document.querySelector('.button').addEventListener('click', newGame);
document.querySelector('.restart').addEventListener('click', newGame);

//Reseting board, scores and initialize new game
function newGame() {
    modal.style.display = "none";
    moves.innerHTML = 0;
    document.getElementById('third').style.color = "black";
    document.getElementById('second').style.color = "black";
    modal.classList.remove('showed');
    modal.classList.add('hide');
    startGame = 0;
    time.innerHTML = '00:00';
    stopTimer();
    initGame();
}

initGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

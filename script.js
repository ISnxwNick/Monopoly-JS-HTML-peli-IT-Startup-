// Haetaan pelilauta HTML-sivulta
const board = document.getElementById("board");
const currentPlayerDisplay = document.getElementById("current-player");
const squareInfo = document.getElementById("square-info");
const player1Name = '<span class="player-one">Pelaaja 1</span>';
const player2Name = '<span class="player-two">Pelaaja 2</span>';
let playerPosition = 0;
let playerMoney = 1000;
let player2Position = 0;
let player2Money = 1000;
let timeLeft = 5 * 60;
let timerInterval = null;
let gameEnded = false;
let currentPlayer = "player";
// Tallennetaan ostettava kohde
let propertyForSale = null;
let currentBuyer = null;
const rollButton = document.getElementById("roll-button")   // Haetaan pelaajan heittonappi
const rollButton2 = document.getElementById("roll-button-2");
// Asetetaan pelaajien nopanheittonappien alkutila
rollButton.disabled = false;
rollButton2.disabled = true;
const buyButton = document.getElementById("buy-button");    // Haetaan ostonappi
const declineButton = document.getElementById("decline-button");    // Haetaan oston ohituspainike
// Haetaan pelaajien rahamäärät
const moneyDisplayPlayer1 = document.getElementById("money-player-1");
const moneyDisplayPlayer2 = document.getElementById("money-player-2");
const assetsDisplayPlayer1 = document.getElementById("assets-player-1");
const assetsDisplayPlayer2 = document.getElementById("assets-player-2");
const propertiesDisplayPlayer1 = document.getElementById("properties-player-1");
const propertiesDisplayPlayer2 = document.getElementById("properties-player-2");
const instructionsButton = document.getElementById("instructions-button");
const instructionsWindow = document.getElementById("instructions-window");
const instructionsOverlay = document.getElementById("instructions-overlay");
const closeInstructions = document.getElementById("close-instructions");

instructionsButton.addEventListener("click", function() {           // Avataan ohjeikkuna
    instructionsWindow.hidden = false;
    instructionsOverlay.hidden = false;
});
closeInstructions.addEventListener("click", function() {            // Suljetaan ohjeikkuna
    instructionsWindow.hidden = true;
    instructionsOverlay.hidden = true;
});
instructionsOverlay.addEventListener("click", function() {          // Suljetaan ohjeikkuna taustaa klikkaamalla
    instructionsWindow.hidden = true;
    instructionsOverlay.hidden = true;
});

// Näytetään molempien pelaajien alkupääoma
moneyDisplayPlayer1.textContent = "Rahaa: " + playerMoney + " €";
moneyDisplayPlayer2.textContent = "Rahaa: " + player2Money + " €";

// Peliruudut
const squares = [
    {
        name: "Aloitus",
        type: "start",
        row: 1,
        column: 1
    },
    {
        name: "Palvelin",
        type: "property",
        row: 1,
        column: 2,
        price: 200,
        rent: 50,
        owner: null
    },
    {
        name: "Tapahtuma",
        type: "event",
        row: 1,
        column: 3
    },
    {
        name: "Toimisto",
        type: "property",
        row: 1,
        column: 4,
        price: 250,
        rent: 60,
        owner: null
    },
    {
        name: "Sijoittaja",
        type: "investor",
        row: 1,
        column: 5
    },
    {
        name: "Markkinointi",
        type: "property",
        row: 1,
        column: 6,
        price: 150,
        rent: 40,
        owner: null
    },
    {
        name: "Pilvipalvelu",
        type: "property",
        row: 2,
        column: 6,
        price: 300,
        rent: 75,
        owner: null
    },
    {
        name: "Tapahtuma",
        type: "event",
        row: 3,
        column: 6
    },
    {
        name: "Kehittäjä",
        type: "property",
        row: 4,
        column: 6,
        price: 250,
        rent: 60,
        owner: null
    },
    {
        name: "Asiakas",
        type: "customer",
        row: 5,
        column: 6
    },
    {
        name: "Julkaisu",
        type: "release",
        row: 6,
        column: 6
    },
    {
        name: "Palvelin",
        type: "property",
        row: 6,
        column: 5,
        price: 200,
        rent: 50,
        owner: null
    },
    {
        name: "Tapahtuma",
        type: "event",
        row: 6,
        column: 4
    },
    {
        name: "Toimisto",
        type: "property",
        row: 6,
        column: 3,
        price: 250,
        rent: 60,
        owner: null
    },
    {
        name: "Markkinointi",
        type: "property",
        row: 6,
        column: 2,
        price: 150,
        rent: 40,
        owner: null
    },
    {
        name: "Sijoittaja",
        type: "investor",
        row: 6,
        column: 1
    },
    {
        name: "Pilvipalvelu",
        type: "property",
        row: 5,
        column: 1,
        price: 300,
        rent: 75,
        owner: null
    },
    {
        name: "Tapahtuma",
        type: "event",
        row: 4,
        column: 1
    },
    {
        name: "Kehittäjä",
        type: "property",
        row: 3,
        column: 1,
        price: 250,
        rent: 60,
        owner: null
    },
    {
        name: "Asiakas",
        type: "customer",
        row: 2,
        column: 1
    }    
];

const player = document.createElement("div");   // Luodaan pelaajan merkki
player.classList.add("player");     // Lisätään pelaajalle luokka
board.appendChild(player);   // Lisätään pelaaja pelilaudalle

//Samaa toiselle
const player2 = document.createElement("div");
player2.classList.add("player", "player2");
board.appendChild(player2);

// Asetetaan pelaaja aloitusruutuun
player.style.gridRow = squares[playerPosition].row;
player.style.gridColumn = squares[playerPosition].column;

//Samaa toiselle
player2.style.gridRow = squares[player2Position].row;
player2.style.gridColumn = squares[player2Position].column;

// Käydään kaikki peliruudut läpi
for (let i = 0; i < squares.length; i++) {

    // Luodaan uusi div-elementti
    const square = document.createElement("div");

    // Lisätään elementille luokka
    square.classList.add("square");

    // Lisätään ruudun tyyppi luokaksi
    square.classList.add(squares[i].type);

    // Lisätään ruudun nimi
    square.textContent = squares[i].name;

    // Määritetään ruudun sijainti
    square.style.gridRow = squares[i].row;
    square.style.gridColumn = squares[i].column;

    // Lisätään ruutu pelilaudalle
    board.appendChild(square);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    // Muotoillaan aika kahdella numerolla
    document.getElementById("timer").textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

function startTimer() {
    // Tarkistetaan, ettei ajastin ole jo käynnissä
    if (timerInterval !== null) {
        return;
    }

    // Vähennetään aikaa sekunti kerrallaan
    timerInterval = setInterval(function() {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timeLeft = 0;
            endGame();                  // Päätetään peli ajan loppuessa
        }

        // Päivitetään ajastimen näyttö
        updateTimerDisplay();

    }, 1000);
}

// Päätetään peli ajan loppuessa
function endGame(winner = null) {
    gameEnded = true;
    // Pysäytetään ajastin
    clearInterval(timerInterval);
    timerInterval = null;

    // Estetään nopan heittäminen
    rollButton.disabled = true;
    rollButton2.disabled = true;

    // Piilotetaan ostamisen painikkeet
    buyButton.hidden = true;
    declineButton.hidden = true;
    // Nollataan keskeneräinen ostotapahtuma
    propertyForSale = null;
    currentBuyer = null;

    // Lasketaan pelaajien omaisuuden kokonaisarvo
    const player1Total = calculateTotalAssets("player", playerMoney);
    const player2Total = calculateTotalAssets("player2", player2Money);

    // Tarkistetaan pelin voittaja
    if (winner === "player") {
        squareInfo.innerHTML = player1Name + " voitti! " + player2Name + " meni konkurssiin!";
    } else if (winner === "player2") {
        squareInfo.innerHTML = player2Name + " voitti! " + player1Name + " meni konkurssiin!";
    } else if (player1Total > player2Total) {
        squareInfo.innerHTML = player1Name + " voitti! Omaisuuden arvo: " + player1Total + " €";
    } else if (player2Total > player1Total) {
        squareInfo.innerHTML = player2Name + " voitti! Omaisuuden arvo: " + player2Total + " €";
    } else {
        squareInfo.textContent = "Tasapeli! Molempien omaisuuden arvo: " + player1Total + " €";
    }

    squareInfo.classList.add("game-over");
}

// Lasketaan pelaajan omaisuuden kokonaisarvo
function calculateTotalAssets(owner, money) {
    let totalAssets = money;

    // Käydään kaikki peliruudut läpi
    squares.forEach(function(square) {
        // Tarkistetaan, omistaako pelaaja kyseisen kohteen
        if (square.owner === owner) {
            // Lisätään kohteen ostohinta omaisuuden arvoon
            totalAssets += square.price;
        }
    });

    // Palautetaan omaisuuden kokonaisarvo
    return totalAssets;
}

function updatePropertiesDisplay() {
    // Haetaan pelaajan 1 omistamat kohteet
    const player1Properties = squares.filter(function(square) {
        return square.owner === "player";
    });

    // Haetaan pelaajan 2 omistamat kohteet
    const player2Properties = squares.filter(function(square) {
        return square.owner === "player2";
    });

    // Näytetään pelaajan 1 omaisuus
    if (player1Properties.length > 0) {
        propertiesDisplayPlayer1.textContent = player1Properties.map(square => square.name).join(", ");
    } else {
        propertiesDisplayPlayer1.textContent = "Ei omaisuutta";
    }

    // Näytetään pelaajan 2 omaisuus
    if (player2Properties.length > 0) {
        propertiesDisplayPlayer2.textContent = player2Properties.map(square => square.name).join(", ");
    } else {
        propertiesDisplayPlayer2.textContent = "Ei omaisuutta";
    }
}

function updateAssetsDisplay() {                    // Päivitetään pelaajien omaisuuden kokonaisarvo
    assetsDisplayPlayer1.textContent = "Omaisuuden arvo: " + calculateTotalAssets("player", playerMoney) + " €";
    assetsDisplayPlayer2.textContent = "Omaisuuden arvo: " + calculateTotalAssets("player2", player2Money) + " €";
}

// Vaihdetaan vuoro seuraavalle pelaajalle
function switchPlayer() {
    // Tarkistetaan, onko peli päättynyt
    if (gameEnded) {
        return;
    }

    if (currentPlayer === "player") {
        currentPlayer = "player2";
    } else {
        currentPlayer = "player";
    }
    // Päivitetään vuorossa olevan pelaajan nimi näytölle
    if (currentPlayer === "player") {
        currentPlayerDisplay.innerHTML = "Vuorossa: " + player1Name;
    } else {
        currentPlayerDisplay.innerHTML = "Vuorossa: " + player2Name;
    }
    // Päivitetään nopanheittonappien tila
    rollButton.disabled = currentPlayer !== "player";
    rollButton2.disabled = currentPlayer !== "player2";
}
currentPlayerDisplay.innerHTML = "Vuorossa: " + player1Name;        // Näytetään ensimmäinen pelaaja pelin alussa

rollButton.addEventListener("click", function() {
    if (gameEnded) {
        return;
    }
    // Tarkistetaan, onko pelaajan vuoro
    if (currentPlayer !== "player") {
        return; // 
    }
    startTimer();

    buyButton.hidden = true;        // Piilotetaan ostonappi
    declineButton.hidden = true;
    propertyForSale = null;     // Tyhjennetään ostettava kohde
    currentBuyer = null;
    // Tähän tulee nopan heitto
    const dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice-result").textContent = "Nopan tulos: " + dice;
    const previousPosition = playerPosition;
    playerPosition = (playerPosition + dice) % squares.length;      // Päivitetään pelaajan sijainti
    // Tarkistetaan, ohittiko pelaaja lähtöruudun
    let passedStart = false;
    if (playerPosition < previousPosition) {
        playerMoney += 200;
        moneyDisplayPlayer1.textContent = "Rahaa: " + playerMoney + " €";
        passedStart = true;
    }
    // Siirretään pelaajan merkki
    player.style.gridRow = squares[playerPosition].row;
    player.style.gridColumn = squares[playerPosition].column;
    // Haetaan nykyisen ruudun tiedot
    const currentSquare = squares[playerPosition];
    
    if (currentSquare.type === "event") {
        // Arvotaan tapahtuma
        if (Math.random() < 0.5) {
            // Pelaaja saa rahaa
            playerMoney += 200;
            squareInfo.textContent = "Sait 200 €!";
        } else {
            // Pelaaja menettää rahaa
            playerMoney -= 100;
            squareInfo.textContent = "Menetit 100 €!";
        }
        // Päivitetään rahamäärä näytölle
        moneyDisplayPlayer1.textContent = "Rahaa: " + playerMoney + " €";

        } else if (currentSquare.type === "investor") {
            // Pelaaja saa sijoituksen
            playerMoney += 300;
            squareInfo.textContent = "Sait sijoittajalta 300 €!";
            // Päivitetään rahamäärä näytölle
            moneyDisplayPlayer1.textContent = "Rahaa: " + playerMoney + " €";
        
        } else if (currentSquare.type === "customer") {
            // Pelaaja saa uuden asiakkaan
            playerMoney += 150;
            squareInfo.textContent = "Sait uuden asiakkaan! +150 €";
            // Päivitetään rahamäärä näytölle
            moneyDisplayPlayer1.textContent = "Rahaa: " + playerMoney + " €";

        } else if (currentSquare.type === "release") {
            // Pelaaja saa bonuksen onnistuneesta julkaisusta
            playerMoney += 500;
            squareInfo.textContent = "Onnistunut julkaisu! Pelaaja 1 sai 500 €!";
            // Päivitetään pelaajan rahamäärä näytölle
            moneyDisplayPlayer1.textContent = "Rahaa: " + playerMoney + " €";

        } else if (currentSquare.type === "property") {
            if (currentSquare.owner === null) {     // Kohde on vapaa
                if (playerMoney >= currentSquare.price) {       // Pelaajalla on tarpeeksi rahaa
                    currentBuyer = "player";    // Potentiaalinen ostaaja
                    propertyForSale = currentSquare;    // Tallennetaan ostettava kohde
                    buyButton.hidden = false;   // Näytetään ostonappi
                    declineButton.hidden = false;
                    rollButton.disabled = true;
                    squareInfo.textContent = currentSquare.name + " maksaa " + currentSquare.price + " €. Voit ostaa sen!";
                } else {
                    squareInfo.textContent = "Sinulla ei ole tarpeeksi rahaa ostaa " + currentSquare.name + "!";
                }
            } else {
                squareInfo.textContent = "Tämä kohde on jo omistettu. Vuokra: " + currentSquare.rent + " €";
                if (currentSquare.owner !== "player") {     // Vuokra maksetaan toiselle pelaajalle

                    // Tarkistetaan, riittävätkö pelaajan rahat vuokraan
                    if (playerMoney < currentSquare.rent) {
                        endGame("player2");
                        return;
}
                    playerMoney -= currentSquare.rent;
                    player2Money += currentSquare.rent;
                    moneyDisplayPlayer2.textContent = "Rahaa: " + player2Money + " €";
                    moneyDisplayPlayer1.textContent = "Rahaa: " + playerMoney + " €";
                    squareInfo.innerHTML = player1Name + " maksoi " + player2Name + ":lle vuokraa " + currentSquare.rent + " €!";
                } else {
                    squareInfo.textContent = "Tämä on sinun kohteesi!";
                }
            }
        } else {
        // Näytetään ruudun nimi
        squareInfo.textContent = "Ruutu: " + currentSquare.name;
    }
    // Näytetään ilmoitus lähtöruudun ohittamisesta
    if (passedStart) {
        squareInfo.innerHTML += " (" + player1Name + " ohitti Aloitus-ruudun ja sai 200 €!)";
    }
    // Tarkistetaan, onko ostettavaa kohdetta
    if (propertyForSale === null) {
        switchPlayer(); // Vuoro siirtyy seuraavalle pelaajalle
    }
    updateAssetsDisplay();
});


rollButton2.addEventListener("click", function() {
    if (gameEnded) {
        return;
    }
    // Tarkistetaan, onko pelaajan vuoro
    if (currentPlayer !== "player2") {
        return;
    }

    // Piilotetaan edellinen ostotarjous
    buyButton.hidden = true;
    declineButton.hidden = true;
    propertyForSale = null;
    currentBuyer = null;
    // Heitetään noppaa
    const dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice-result").textContent = "Nopan tulos: " + dice;    
    const previousPositionPlayer2 = player2Position;
    player2Position = (player2Position + dice) % squares.length;            // Päivitetään toisen pelaajan sijainti
    // Tarkistetaan, ohittiko pelaaja lähtöruudun
    let passedStartPlayer2 = false;
    if (player2Position < previousPositionPlayer2) {
        player2Money += 200;
        moneyDisplayPlayer2.textContent = "Rahaa: " + player2Money + " €";
        passedStartPlayer2 = true;
    }
    // Siirretään toinen pelaaja
    player2.style.gridRow = squares[player2Position].row;
    player2.style.gridColumn = squares[player2Position].column;
    const currentSquarePlayer2 = squares[player2Position];

    if (currentSquarePlayer2.type === "event") {
        // Arvotaan tapahtuma
        if (Math.random() < 0.5) {
            // Pelaaja saa rahaa
            player2Money += 200;
            squareInfo.textContent = "Sait 200 €!";
        } else {
            // Pelaaja menettää rahaa
            player2Money -= 100;
            squareInfo.textContent = "Menetit 100 €!";
        }
        // Päivitetään rahamäärä näytölle
        moneyDisplayPlayer2.textContent = "Rahaa: " + player2Money + " €";

        } else if (currentSquarePlayer2.type === "investor") {
            // Pelaaja saa sijoituksen
            player2Money += 300;
            squareInfo.textContent = "Sait sijoittajalta 300 €!";
            // Päivitetään rahamäärä näytölle
            moneyDisplayPlayer2.textContent = "Rahaa: " + player2Money + " €";
        
        } else if (currentSquarePlayer2.type === "customer") {
            // Pelaaja saa uuden asiakkaan
            player2Money += 150;
            squareInfo.textContent = "Sait uuden asiakkaan! +150 €";
            // Päivitetään rahamäärä näytölle
            moneyDisplayPlayer2.textContent = "Rahaa: " + player2Money + " €";

        } else if (currentSquarePlayer2.type === "release") {
            player2Money += 500;
            squareInfo.textContent = "Onnistunut julkaisu! Pelaaja 2 sai 500 €!";
            moneyDisplayPlayer2.textContent = "Rahaa: " + player2Money + " €";

        } else if (currentSquarePlayer2.type === "property") {
            if (currentSquarePlayer2.owner === null) {     // Kohde on vapaa
                if (player2Money >= currentSquarePlayer2.price) {       // Pelaajalla on tarpeeksi rahaa
                    currentBuyer = "player2";
                    propertyForSale = currentSquarePlayer2;    // Tallennetaan ostettava kohde
                    buyButton.hidden = false;   // Näytetään ostonappi
                    declineButton.hidden = false;
                    rollButton2.disabled = true;
                    squareInfo.textContent = currentSquarePlayer2.name + " maksaa " + currentSquarePlayer2.price + " €. Voit ostaa sen!";
                } else {
                    squareInfo.textContent = "Sinulla ei ole tarpeeksi rahaa ostaa " + currentSquarePlayer2.name + "!";
                }
            } else {
                squareInfo.textContent = "Tämä kohde on jo omistettu. Vuokra: " + currentSquarePlayer2.rent + " €";
                if (currentSquarePlayer2.owner !== "player2") {     // Vuokra maksetaan toiselle pelaajalle

                    // Tarkistetaan, riittävätkö pelaajan rahat vuokraan
                    if (player2Money < currentSquarePlayer2.rent) {
                        endGame("player");
                        return;
                    }

                    player2Money -= currentSquarePlayer2.rent;
                    playerMoney += currentSquarePlayer2.rent;
                    moneyDisplayPlayer2.textContent = "Rahaa: " + player2Money + " €";
                    moneyDisplayPlayer1.textContent = "Rahaa: " + playerMoney + " €";
                    squareInfo.innerHTML = player2Name + " maksoi " + player1Name + ":lle vuokraa " + currentSquarePlayer2.rent + " €!";
                } else {
                    squareInfo.textContent = "Tämä on sinun kohteesi!";
                }
            }
        } else {
        // Näytetään ruudun nimi
        squareInfo.textContent = "Ruutu: " + currentSquarePlayer2.name;
    }
    // Näytetään ilmoitus lähtöruudun ohittamisesta
    if (passedStartPlayer2) {
        squareInfo.innerHTML += " (" + player2Name + " ohitti Aloitus-ruudun ja sai 200 €!)";
    }
    // Tarkistetaan, onko ostettavaa kohdetta
    if (propertyForSale === null) {
        switchPlayer(); // Vuoro siirtyy seuraavalle pelaajalle
    }
    updateAssetsDisplay();
});

buyButton.addEventListener("click", function() {
    if (gameEnded) {
        return;
    }
    if (propertyForSale !== null) {         // Tarkistetaan, että ostettava kohde on olemassa
        if (currentBuyer === "player") {
            playerMoney -= propertyForSale.price;   // Vähennetään ostohinta pelaajan rahoista
            propertyForSale.owner = "player";       // Asetetaan pelaaja kohteen omistajaksi
            moneyDisplayPlayer1.textContent = "Rahaa: " + playerMoney + " €";      // Päivitetään rahamäärä näytölle
        } else if (currentBuyer === "player2") {
            player2Money -= propertyForSale.price;
            propertyForSale.owner = "player2";
            moneyDisplayPlayer2.textContent = "Rahaa: " + player2Money + " €";
        }
        updatePropertiesDisplay();
        updateAssetsDisplay();
        // Näytetään ostoviesti
        // Näytetään ostajan nimi ja ostettu kohde
        if (currentBuyer === "player") {
            squareInfo.innerHTML = player1Name + " osti kohteen: " + propertyForSale.name + "!";
        } else if (currentBuyer === "player2") {
            squareInfo.innerHTML = player2Name + " osti kohteen: " + propertyForSale.name + "!";
        }

        buyButton.hidden = true;        // Piilotetaan ostonappi
        declineButton.hidden = true;
        propertyForSale = null;     // Tyhjennetään ostettava kohde
        currentBuyer = null;
        // Vuoro siirtyy seuraavalle pelaajalle
        switchPlayer();
    }
});

// Käsitellään kohteen ostamisesta kieltäytyminen
declineButton.addEventListener("click", function() {
    if (gameEnded) {
        return;
    }
    // Piilotetaan ostonapit
    buyButton.hidden = true;
    declineButton.hidden = true;

    // Näytetään, kuka kieltäytyi ostamasta kohdetta
    if (currentBuyer === "player") {
        squareInfo.innerHTML = player1Name + " kieltäytyi ostamasta kohdetta.";
    } else if (currentBuyer === "player2") {
        squareInfo.innerHTML = player2Name + " kieltäytyi ostamasta kohdetta.";
    }
    
    // Tyhjennetään ostotiedot
    propertyForSale = null;
    currentBuyer = null;

    // Vaihdetaan vuoro seuraavalle pelaajalle
    switchPlayer();
});

updateTimerDisplay();
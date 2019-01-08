
var masterWordList = [
    "BROADWAY",
    "SKYSCRAPPERS",
    "WALL STREET",
    "BIG APPLE",
    "MADISON AVENUE",
    "GRAND CENTRAL",
    "STATUE OF LIBERTY",
    "TIMES SQUARE"
]

var guessedArray = [];
var showLetter = [];
var currentWordPointer;
var currentWord;
var guessesRemaining;
var currentDashes
var winCounter;
var losses = 0;
var wins = 0;
var flag1 = 1; // Flag for current key already pressed
var gameState = "";

// Create iframe for audio to be played when game is Won; can be created directly in HTML but preferred here for future reference
var iframe = document.createElement('iframe');
iframe.style.display = "none";
iframe.src = ""
iframe.allow="autoplay"
iframe.id="audio"
document.body.appendChild(iframe);
// Create iframe for audio to be played when game is Won; can be created directly in HTML but preferred here for future reference

// Clear everything for new game
function clear(){
    guessedArray = [];
    showLetter = [];
    document.getElementById("lettersGuessed").innerHTML = guessedArray;
    document.getElementById("audio").src = ""
}

// Select Random word and initialize game
function initialize() {
    clear();
    currentWordPointer = Math.floor(Math.random() * masterWordList.length);
    currentWord = masterWordList[currentWordPointer];
    guessesRemaining = Math.ceil(2 + (currentWord.length / 3)); // Guesses left based on word length, using Math.ceil to round up number to the nearest integer
    winCounter = currentWord.length;
    
    // ------------ Set Hint Photo ------------
    if (currentWordPointer == 0){
        var hintImage = '<img src="./assets/images/BW.jpg" height="150" width="225" alt=""></img>';
        document.getElementById("hint").innerHTML = hintImage;
    }
    else if (currentWordPointer == 1){
        var hintImage = '<img src="./assets/images/SS.jpg" height="150" width="113" alt=""></img>';
        document.getElementById("hint").innerHTML = hintImage;
    }
    else if (currentWordPointer == 2){
        var hintImage = '<img src="./assets/images/WS.jpg" height="150" width="207" alt=""></img>';
        document.getElementById("hint").innerHTML = hintImage;
    }
    else if (currentWordPointer == 3){
        var hintImage = '<img src="./assets/images/BA.jpg" height="150" width="225" alt=""></img>';
        document.getElementById("hint").innerHTML = hintImage;
    }
    else if (currentWordPointer == 4){
        var hintImage = '<img src="./assets/images/MA.jpg" height="150" width="123" alt=""></img>';
        document.getElementById("hint").innerHTML = hintImage;
    }
    else if (currentWordPointer == 5){
        var hintImage = '<img src="./assets/images/GC.jpg" height="150" width="291" alt=""></img>';
        document.getElementById("hint").innerHTML = hintImage;
    }
    else if (currentWordPointer == 6){
        var hintImage = '<img src="./assets/images/SL.jpg" height="150" width="225" alt=""></img>';
        document.getElementById("hint").innerHTML = hintImage;
    }
    else if (currentWordPointer == 7){
        var hintImage = '<img src="./assets/images/TS.jpg" height="150" width="225" alt=""></img>';
        document.getElementById("hint").innerHTML = hintImage;
    }
    else {
        var hintImage = '';
        document.getElementById("hint").innerHTML = hintImage;
    }
    // ---------- Set hint Photo End ----------

    var dashes = document.getElementById("dashes");
    dashes.innerHTML = dashLength(currentWord);
	document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
    
    // console.log("currentWord: " + currentWord);
    // console.log("guessesRemaining: " + guessesRemaining);
    // console.log("winCounter: " + winCounter);
}

// Create dases based on word length
function dashLength () {
    var dashCells = "";
    for (var i=0; i < currentWord.length; i++) {
        if (currentWord[i] == " ") {
                winCounter--; // Reduce counter if there is a space (more than one word)
                dashCells += "<td id='char" + i + "'> </td>";
        }
        else{
            dashCells += "<td id='char" + i + "'>_</td>";
        }
    }
    return dashCells;
}

// Display the letters that were gusessed
function lettersGuessed(key) {
    var flag = 1; // flag so that the same letter is not pushed more than once to Letters Guessed
    for (var i = 0; i < guessedArray.length; i++) {
        if (guessedArray[i] == key) {
            flag = 0;
        }
    }
    if (flag) {
        guessedArray.push(key);
    }
    document.getElementById("lettersGuessed").innerHTML = guessedArray.join(' ');
}

// Check if key pressed is a letter
function isLetter(key){
    if (key.length === 1 && key.match(/[a-z]/i)) {// key.length === 1 -> to avoid Caps Lock, etc; /i to ignore case
        return true;
    }
    else {
        return false;
    }
}

// Grab key pressed, this is where all the magic happens
document.onkeyup = function(event) {
    if (gameState == "playing") {
        var key = event.key.toUpperCase();
        if(isLetter(key)) { // Check if it is a letter
            flag1 = 1; // Flag for current letter already pressed
            if (currentWord.indexOf(key) != -1 ) { // Will enter if key is part of currentWord; currentWord.indexOf(key) will equal to -1 if not part of currentWord
                flag1 = 0; // Flag for current letter already pressed
                showLetter = [];
                for (var i = 0; i < currentWord.length; i++) {
                    if (currentWord[i] === key) {
                        lettersGuessed(key)
                        showLetter.push(i);
                    }
                }
                if (showLetter.length > 0) { // Will enter if letter has been pushed to showLetter  
                    for (var i = 0; i< showLetter.length; i++) { // Need to repeat for if there are multiple same letters in the word
                        var position = showLetter[i]; // Get the position
                        if (document.getElementById("char" + position).textContent == "_") { // Confirm this key has not already been pushed for winCounter to work
                            document.getElementById("char" + position).textContent = key;
                            document.getElementById("char" + position).value = key;
                            winCounter--;
                        }
                        else {
                            flag1 = 1; // Flag for current letter already pressed
                        }
                    }
                    console.log("winCounter =" + winCounter);
                    if (winCounter==0) {
                        gameState = "won";
                    }
                }
            }
            if ((guessedArray.indexOf(key) != -1) && flag1) { // Adding Flag here so that it doent enter the first time a letter from the current word is pressed
                alert("Letter already guessed!")
            }
            if (guessedArray.indexOf(key) == -1) {
                guessesRemaining--;
                document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
                lettersGuessed(key)
                if (guessesRemaining == 0) {
                    gameState = "lost";
                }
            }
        }
        else {
            alert("Not a letter");
        }
        if (gameState == "won") {
            gameState = "";
            winSound();
            wins++;
            document.getElementById("wins").innerHTML = wins;
            document.getElementById("game").style.display = "none";
            document.getElementById("gameWon").style.display = "block";
        }
        if (gameState == "lost") {
            gameState = "";
            losses++;
            document.getElementById("losses").innerHTML = losses;
            document.getElementById("game").style.display = "none";
            document.getElementById("gameLost").style.display = "block";
        }
    }
    // Start Game By Pressing Enter
    var x = event.charCode || event.keyCode; // depending on browser - for compatibility
    if (x === 13) {
        if (gameState != "playing") { // If Enter is pressed while playing game, avoid reset
            gameState = "playing";
            document.getElementById("gameStart").style.display = "none";
            document.getElementById("gameWon").style.display = "none";
            document.getElementById("gameLost").style.display = "none";
            document.getElementById("game").style.display = "block";
            initialize();
        }
    }

    function winSound() {
        document.getElementById("audio").src = "./assets/audio/FS.mp3"
    }
}

// Game starts here
window.onload = function() {
    document.getElementById("game").style.display = "none";
    document.getElementById("gameWon").style.display = "none";
    document.getElementById("gameLost").style.display = "none";
    initialize();
}
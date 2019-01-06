
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
var guesses;
var currentDashes
var winCounter;
var losses = 0;
var wins = 0;
var flag1 = 1; // Flag for current key already pressed
var gameState = "";

// Clear everything for new game
function clear(){
    guessedArray = [];
    showLetter = [];
    document.getElementById("guessed").innerHTML = guessedArray;
}

// Select Random word and initialize game
function initialize() {
    clear();

    currentWordPointer = Math.floor(Math.random() * masterWordList.length);
    currentWord = masterWordList[currentWordPointer];
    guesses = Math.ceil(2 + (currentWord.length / 3)); // guesses based on word length, using Math.ceil to round up number to the nearest integer
    winCounter = currentWord.length;

    // ------------ Set hint Photo ------------
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

    dashes.innerHTML = dashLength(currentWord);
	document.getElementById("guesses").innerHTML = guesses;
    
    // console.log("currentWord: " + currentWord);
    // console.log("guessesLeft: " + guesses);
    // console.log("winCounter: " + winCounter);
}

function dashLength () {
    
    var dashes = document.getElementById("dashes");
    var dashCells = "";
    for (var i=0; i < currentWord.length; i++) {
        if (currentWord[i] == " ") {
                winCounter--; // Reduce counter if there is a space (more than one word)
                dashCells += "<td id='char" + i + "'> </td>";
        }
        else{
            dashCells += "<td id='char" + i + "'>_</td>";
            // dashCells += "<td id='char" + i + "'>_</td>";
        }
    }
    return dashCells;
}

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
    document.getElementById("guessed").innerHTML = guessedArray.join(' ');
}

//Check if it is a letter
function isLetter(key){
    if (key.length === 1 && key.match(/[a-z]/i)) {// key.length === 1 -> to avoid Caps Lock, etc; /i to ignore case
        return true;
    }
    else {
        return false;
    }
}

document.onkeyup = function() {
    
    if (gameState == "playing"){
    var key = event.key.toUpperCase();
    if(isLetter(key)) { // Check if it is a letter

        flag1 = 1; // Flag for current letter already pressed
        if (currentWord.indexOf(key) != -1 ){ // Will enter if key is part of currentWord; currentWord.indexOf(key) will equal to -1 if not part of currentWord
            flag1 = 0; // Flag for current letter already pressed
            showLetter = [];
            for (var i = 0; i < currentWord.length; i++){
                if (currentWord[i] === key) {
                    lettersGuessed(key)
                    showLetter.push(i);
                }
            }
            if (showLetter.length > 0) { // Will enter if letter has been pushed to showLetter  
                for (var i = 0; i< showLetter.length; i++) { // Need to repeat for if there are multiple same letters in the word
                    var position = showLetter[i]; // Get the position
                    if (document.getElementById("char" + position).textContent == "_"){ // Confirm this key has not already been pushed for winCounter to work
                        document.getElementById("char" + position).textContent = key;
                        document.getElementById("char" + position).value = key;
                        winCounter--;
                    }
                    else {
                        flag1 = 1; // Flag for current letter already pressed
                    }
                }
                console.log("winCounter =" + winCounter);
                if (winCounter==0){
                    gameState = "won";
                }
            }
        }
        if ((guessedArray.indexOf(key) != -1) && flag1) { // Adding Flag here so that it doent enter the first time a letter from the current word is pressed
            alert("Letter already guessed!")
        }
        if (guessedArray.indexOf(key) == -1) {
            guesses--;
            document.getElementById("guesses").innerHTML = guesses;
            lettersGuessed(key)
            if (guesses == 0) {
                gameState = "lost";
            }
        }
    }
    else {
        alert("Not a letter");
    }
    if (gameState == "won") {
        gameState = "";
        // winSound();
        wins++;
        document.getElementById("wins").innerHTML = wins;
        document.getElementById("game").style.display = "none";
        document.getElementById("gameWon").style.display = "block";
        // <audio id="player" autoplay loop><source src="./assets/audio/FS.mp3" type="audio/mp3"></audio>
        // <iframe src="./assets/audio/FS.mp3" allow="autoplay" id="audio" style="display:none"></iframe>
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
    if (event.keyCode === 13) {
        if (gameState != "playing") { // If Enter is pressed while playing game, avoid reset
            gameState = "playing";
            document.getElementById("gameStart").style.display = "none";
            document.getElementById("gameWon").style.display = "none";
            document.getElementById("gameLost").style.display = "none";
            document.getElementById("game").style.display = "block";
            initialize();
        }
    }
    function winSound(){
        var iframe = document.createElement('iframe');
        iframe.style.display = "none";
        iframe.src = "./assets/audio/FS.mp3"
        iframe.allow="autoplay"
        iframe.id="audio"
        document.body.appendChild(iframe);
    }
}



// Game starts here
window.onload = function() {
    document.getElementById("game").style.display = "none";
    document.getElementById("gameWon").style.display = "none";
    document.getElementById("gameLost").style.display = "none";
    initialize();
}
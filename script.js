playerName = prompt("Enter your Name:").toLowerCase();
playerName = playerName[0].toUpperCase() + playerName.slice(1);
console.log(playerName);

let correct = 0;
let guesses = 0;
let roundStartTime = 0;
let totalTime = 0;
let roundsPlayed = 0;
let fastestTime = Infinity;
let wins = 0;
let totalGuesses = 0;
let averageGuesses = 0;
let range = 3;

function getDate(){
    let date = new Date();
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = monthNames[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();
    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");
    let suffix = getSuffix(day);
    document.getElementById("date").textContent = month + " " + day + suffix + ", " + year + " " + hours + ":" + minutes + ":" + seconds;
}

function getSuffix(day){
    let tens = day % 100;
    if (tens >= 11 && tens <= 13){
        return "th";
    }
    switch (day % 10){
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

getDate();
setInterval(getDate, 1000);

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", processGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

// Add event listeners to radio buttons for custom input visibility
let levelRadios = document.getElementsByName("level");
for (let radio of levelRadios) {
    radio.addEventListener("change", function() {
        let customInput = document.getElementById("custom");
        if (this.id === "c") {
            customInput.style.display = "inline";
        } else {
            customInput.style.display = "none";
        }
    });
}

function play(){
    document.getElementById("guess").value = "";
    guesses = 0;
    let difficulties = document.getElementsByName("level");
    range = 3;
    for(let i = 0; i < difficulties.length; i++){
        if(difficulties[i].checked){
            if (difficulties[i].id === "c") {
                range = parseInt(document.getElementById("custom").value) || 100; 
            } else {
                range = parseInt(difficulties[i].value);
            }
        }
    }
    correct = Math.floor(Math.random() * range) + 1;
    roundStartTime = new Date().getTime();
    document.getElementById("msg").textContent = "Ready, " + playerName + "? Guess a number between 1 and " + range + 
        ", hang tight for a moment, sit down if you haven't and keep sitting if you have, be present in the moment with yourself, " +
        "have a moment of contemplation, ponder your life choices, think about" +
        " the meaning of life, have an existential crisis, think about the universe, think about the meaning of the universe, think about the meaning of the" +
        " meaning of the universe, have an existential criss about the meaning of the meaning of the universe, and then click the Guess button to see if you were right!";
    document.getElementById("playBtn").disabled = true;
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
}

function giveUp(){
    guesses = range;
    alert(range);
    document.getElementById("msg").textContent = "You gave up! The number was " + correct + ".";
    document.getElementById("playBtn").disabled = false;
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("guess").value = "";
    let elapsedSeconds = Math.round((Date.now() - roundStartTime) / 1000);
    endRound(elapsedSeconds);
}

function processGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if (guess === correct){
        document.getElementById("msg").textContent = "Correct! Congratulations, " + playerName + "!";
        document.getElementById("playBtn").disabled = false;
        document.getElementById("guessBtn").disabled = true;
        document.getElementById("giveUpBtn").disabled = true;
        guesses += 1;
        totalGuesses += guesses;
        wins += 1;
        averageGuesses = totalGuesses / wins;
        document.getElementById("wins").textContent = "Total wins: " + wins;
        document.getElementById("avgScore").textContent = "Average Score: " + averageGuesses.toFixed(2);
        document.getElementById("guess").value = "";
        updateLeaderboard();
        if (document.getElementById("f").checked) {
            document.getElementById("finalChallengeSection").style.display = "block";
        }
        let elapsedSeconds = Math.round((Date.now() - roundStartTime) / 1000);
        endRound(elapsedSeconds);
    }
    else if (guess < correct){
        document.getElementById("msg").textContent = "Too low, try again!";
        guesses += 1;
        determineHotness();
    }
    else{
        document.getElementById("msg").textContent = "Too high, try again!";
        guesses += 1;
        determineHotness();
    }
    function determineHotness(){
        let difference = Math.abs(guess - correct);
        if (difference <= 2){
            document.getElementById("msg").textContent += " Your guess was hot!";
        }
        else if (difference <= 5){
            document.getElementById("msg").textContent += " Your guess was warm!";
        }
        else{
            document.getElementById("msg").textContent += " Your guess was cold!";
        }
    }
}

function endRound(elapsedSeconds){
    roundsPlayed += 1;
    totalTime += elapsedSeconds;
    if (elapsedSeconds < fastestTime){
        fastestTime = elapsedSeconds;
    }
    document.getElementById("fastest").textContent = "Fastest Game: " + fastestTime + " seconds";
    document.getElementById("avgTime").textContent = "Average Time: " + (totalTime / roundsPlayed).toFixed(2) + " seconds";
    roundStartTime = 0;
}

function updateLeaderboard(){
    let leaderboards = document.getElementsByName("leaderboard");
    for (let i = 0; i < 3; i++){
        if (guesses < parseInt(leaderboards[i].textContent)){
            if (i === 0){
                leaderboards[2].textContent = leaderboards[1].textContent;
                leaderboards[1].textContent = leaderboards[0].textContent;
            }
            else if (i === 1){
                leaderboards[2].textContent = leaderboards[1].textContent;
            }
            leaderboards[i].textContent = guesses;
            break;
        }
    }
}

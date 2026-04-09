playerName = prompt("Enter your Name:").toLowerCase();
playerName = playerName[0].toUpperCase() + playerName.slice(1);
console.log(playerName);

wins = 0;
totalGuesses = 0;
averageGuesses = 0;
let correct = 0;
let guesses = 0;
document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", processGuess);
    function play(){
        guesses = 0;
        let difficulties = document.getElementsByName("level");
        let range = 3;
        for(let i = 0; i < difficulties.length; i++){
            if(difficulties[i].checked){
                range = parseInt(difficulties[i].value);
            }
        }
        correct = Math.floor(Math.random() * range) + 1;
        document.getElementById("msg").textContent = "Ready, " + playerName + "? Guess a number between 1 and " + range + 
        ", brew yourself a cup of coffee, sit down, have a moment of contemplation, ponder your life choices, think about" +
        " the meaning of life, have an existential crisis, think about the universe, think about the meaning of the universe, think about the meaning of the" +
        " meaning of the universe, have an existential criss about the meaning of the meaning of the universe, and then click the Guess button to see if you were right!";
        document.getElementById("playBtn").disabled = true;
        document.getElementById("guessBtn").disabled = false;
        document.getElementById("giveUpBtn").disabled = false;
        // Guess button listener is attached once globally and reused for each round.
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
                alert(wins);
                alert(averageGuesses);
                checkAchievements();
                function checkAchievements(){
                    alert("placeholder");
                }
                return;
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
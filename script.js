playerName = prompt("Enter your Name:").toLowerCase();
playerName = playerName[0].toUpperCase() + playerName.slice(1);
console.log(playerName);

document.getElementById("playBtn").addEventListener("click", play);
    function play(){
        let difficulties = document.getElementsByName("level");
        let range = 3;
        for(let i = 0; i < difficulties.length; i++){
            if(difficulties[i].checked){
                range = parseInt(difficulties[i].value);
            }
        }
        let correct = Math.floor(Math.random() * range) + 1;
        document.getElementById("msg").textContent = "Guess!";
        document.getElementById("playBtn").disabled = true;
        document.getElementById("guessBtn").disabled = false;
        document.getElementById("giveUpBtn").disabled = false;
        document.getElementById("guessBtn").addEventListener("click", processGuess);
        function processGuess(){
            let guess = parseInt(document.getElementById("guess").value);
            if (guess === correct){
                document.getElementById("msg").textContent = "Correct! Congratulations, " + playerName + "!";
                checkAchievements();
                function checkAchievements(){
                    alert("placeholder");
                }
            }
            else if (guess < correct){
                document.getElementById("msg").textContent = "Too low, try again!";
            }
            else{
                document.getElementById("msg").textContent = "Too high, try again!";
            }
        }
    }
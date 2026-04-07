playerName = prompt("Enter your Name:").toLowerCase();
playerName = playerName[0].toUpperCase() + playerName.slice(1);
console.log(playerName);

const range = document.getElementsByName("level");
number = range.values;

document.getElementById("playBtn").addEventListener("click", 
    function(){
        let difficulties = document.getElementsByName("level");
        let range = 3;
        for(let i = 0; i < radios.length; i++){
            if(difficulties[i].checked){
                range = parseint(radios[i].value);
            }
        }
        let correct = Math.floor(Math.random() * range) + 1;
        document.getElementById("msg").textContent = "Guess!";
    })
    


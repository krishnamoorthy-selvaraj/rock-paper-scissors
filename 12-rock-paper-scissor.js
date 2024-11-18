let score = JSON.parse(localStorage.getItem('score')) || {
    Wins : 0,
    Losses : 0,
    Tie : 0
};
updateScoreElement();

console.log(JSON.parse(localStorage.getItem('score')));

 let isAutoPlaying = false;
 let intervalId;

function autoPlay () {
    if (!isAutoPlaying) {
      intervalId =  setInterval(function () {
        const playerMove = pickComputerMove();
        playGame(playerMove);
         }, 1000);
    isAutoPlaying = true;
    } 
    else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }

}

    document.querySelector('.js-rock-button').addEventListener('click', () =>{
        playGame('rock');
    });
    document.querySelector('.js-paper-button').addEventListener('click', () =>{
        playGame('paper');
    });
    document.querySelector('.js-scissors-button').addEventListener('click', () =>{
        playGame('scissors');
    });
    
    document.body.addEventListener('keydown', (event) => {
        if(event.key === 'r'){
            playGame('rock');
        }
        else if(event.key === 'p'){
            playGame('paper');
        }
        else if(event.key === 's'){
            playGame('scissors');
        }
    });
function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === computerMove) {
        result = 'Tie.';
        score.Tie += 1;
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        result = 'You Win.';
        score.Wins += 1;
    } else {
        result = 'You Loss.';
        score.Losses += 1;
    }

    localStorage.setItem('score',JSON.stringify(score));
   
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You  <img src = "images/${playerMove}-emoji.png" class = "move-icon"> <img src = "images/${computerMove}-emoji.png" class = "move-icon"> Computer`;

}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = ` Wins: ${score.Wins}. Losses: ${score.Losses}. Ties: ${score.Tie}`;
};




function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }

    return computerMove;
}

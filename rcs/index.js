const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");

let choice = ['Rock', 'Paper', 'Scissors'];

function playerGame(playerChoice) {

    let computerChoice = choice[Math.floor(Math.random() * 3)];

    if (playerChoice === computerChoice) {
        resultDisplay.textContent = "It's a tie!"
        playerDisplay.textContent = `${playerChoice}`;
        computerDisplay.textContent = `${computerChoice}`;
    }
    else if(playerChoice==='Reset')
    {
        resultDisplay.textContent=` `;
        playerDisplay.textContent=` `;
        computerDisplay.textContent=` `;
    }

    else {
        switch (playerChoice) {
            case 'Rock':
                resultDisplay.textContent = (computerChoice === 'Scissors') ? `Result:You Won!` : `Result:You loose`;
                playerDisplay.textContent = `Player Choice:${playerChoice}`;
                computerDisplay.textContent = `Computer Choice:${computerChoice}`;
                break;
            case 'Paper':
                resultDisplay.textContent = (computerChoice === 'Rock') ? `Result:You Won!` : `Result:You loose`;
                playerDisplay.textContent = `Player Choice:${playerChoice}`;
                computerDisplay.textContent = `Computer Choice:${computerChoice}`;
            case 'Scissors':
                resultDisplay.textContent = (computerChoice === 'Paper') ? `Result:You Won!` : `Result:You loose`;
                playerDisplay.textContent = `Player Choice:${playerChoice}`;
                computerDisplay.textContent = `Computer Choice:${computerChoice}`;

        }
    }

}
let grid = document.querySelector("#container");
const square = document.querySelectorAll(".square");
const restart = document.querySelector("#restart");
const endMssg = document.getElementById("endMssg");
let gameOver = false;
let counter = 0;

const start = (() => {
    let form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        for(let i = 0; i < 9; i++) {
            square[i].textContent = "";
            counter = 0;
        }
        endMssg.textContent = "";

        gameOver = false;
        game();
    });    
})();

const game = (() => {
    const player = (name, choice) => {
        this.name = name;
        this.choice = choice;
        return{name, choice};
    }

    let player1 = player(document.querySelector('input[name=name1]').value, document.querySelector('input[name=choice1]').value);
    let player2 = player(document.querySelector('input[name=name2]').value, document.querySelector('input[name=choice2]').value);

    counter = 0;
    let turn = 0;
    for(let i = 0; i < 9; i++) {
        square[i].addEventListener("click", () => {
            if(square[i].textContent !== "") {}
            else if(turn === 0 && !gameOver) {
                display(square[i], player1.choice);
                turn++;
                counter++;
                if(checkWin(square)) {endGame(player1);}
            } else if (turn === 1 && !gameOver) {
                display(square[i], player2.choice);
                turn--;
                if(checkWin(square)) {endGame(player2);}
                counter++;
            }

            if(counter >= 9) {
                endGame();
            }
        });
    }
    
    const display = (square, choice) => {
        let fill = document.createElement("p");
        fill.classList.add("fill");
        fill.textContent = choice;
        square.appendChild(fill);
    }

    const endGame = (winner) => {
        if(winner === undefined) {
            endMssg.textContent = "The game is a tie!";
        } else {
            endMssg.textContent = `The winner is ${winner.name}`;
        }
    }

    restart.addEventListener("click", () => {
        start();
    });
})

const checkWin = ((array) => {
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i = 0; i < 8; i++) {
        if(array[winningCombinations[i][0]].textContent !== "" && array[winningCombinations[i][0]].textContent === array[winningCombinations[i][1]].textContent && array[winningCombinations[i][1]].textContent === array[winningCombinations[i][2]].textContent) {
            gameOver = true;
            listen = false;
            return true;
        }
    }
    return false;
}); 


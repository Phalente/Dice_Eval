const useNewGame = document.querySelector(".feature__newGame");
const useFaceDice = document.querySelector(".feature__dice");
const useRollDice = document.querySelector(".feature__rollDice");
const useHold = document.querySelector(".feature__hold");
const dom = document.getElementsByTagName("body");
const editPlayer1 = document.querySelector(".player1");
const editPlayer2 = document.querySelector(".player2");
const displayFaceDice = document.getElementById("img-dice");
const displayPlayer1Name = document.querySelector(".player__userName1-h2");
const displayPlayer2Name = document.querySelector(".player__userName2-h2");
const player1GlobalScore = document.querySelector(".player__globalScore1-p");
const player2GlobalScore = document.querySelector(".player__globalScore2-p");
const player1CurrentScore = document.querySelector(
  ".player__current__score1-p"
);
const player2CurrentScore = document.querySelector(
  ".player__current__score2-p"
);
function changeFaceDice() {
  displayFaceDice.src = `./images/dice-${diceScore}.svg`;
}
function randomDice() {
  diceScore = Math.floor(Math.random() * 6 + 1);
  changeFaceDice();
  console.log(`dice = ${diceScore}`);
}
class Player {
  constructor(name, globalScore, currentScore) {
    this.name = name;
    this.globalScore = globalScore;
    this.currentScore = currentScore;
  }

  initPlayer(global, current) {
    this.globalScore = global;
    this.currentScore = current;
  }

  current() {
    if (diceScore !== 1) {
      this.currentScore += diceScore;
    } else {
      this.currentScore = 0;
    }
  }

  hold() {
    this.globalScore += this.currentScore;
    this.currentScore = 0;
  }
}

let player1 = new Player("Jb", 0, 0);
let player2 = new Player("Charles", 0, 0);
let currentPlayer = player1;
let diceScore = "";

[useRollDice, useFaceDice].forEach((item) => {
  item.addEventListener("click", (event) => {
    console.log(currentPlayer);
    randomDice();
    if (currentPlayer == player1) {
      player1.current();
      player1CurrentScore.textContent = `${player1.currentScore}`;
      console.log(
        `currentScore de ${currentPlayer.name} = ${player1.currentScore}`
      );
      if (diceScore == 1) {
        player1.currentScore = 0;
        currentPlayer = player2;
        console.log(currentPlayer);
      }
    } else {
      player2.current();
      player2CurrentScore.textContent = `${player2.currentScore}`;
      console.log(
        `currentScore de ${currentPlayer.name} = ${currentPlayer.currentScore}`
      );
      if (diceScore == 1) {
        player2.currentScore = 0;
        currentPlayer = player1;
        console.log(currentPlayer);
      }
    }
  });
});

useHold.addEventListener("click", (event) => {
  console.log(
    `currentPlayer : ${currentPlayer.name}, player1 : ${player1.name}, player2 : ${player2.name}`
  );
  if (currentPlayer == player1) {
    player1.hold();
    player1GlobalScore.textContent = `${player1.globalScore}`;
    player1CurrentScore.textContent = `${player1.currentScore}`;
    currentPlayer = player2;
    console.log(
      `currentPlayer : ${currentPlayer.name}, player1 : ${player1.name}, player2 : ${player2.name}`
    );
  } else {
    player2.hold();
    player2GlobalScore.textContent = `${player2.globalScore}`;
    player2CurrentScore.textContent = `${player2.currentScore}`;
    currentPlayer = player1;
    console.log(
      `currentPlayer : ${currentPlayer.name}, player1 : ${player1.name}, player2 : ${player2.name}`
    );
  }
});

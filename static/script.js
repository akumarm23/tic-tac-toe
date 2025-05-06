let currentPlayer = "X";
let gameOver = false;
let xWins = 0;
let oWins = 0;
let draws = 0;
let totalGames = 0;

function makeMove(cell) {
  if (cell.textContent === "" && !gameOver) {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
    if (checkWinner()) {
      document.getElementById(
        "status"
      ).textContent = `Player ${currentPlayer} wins!`;
      if (currentPlayer === "X") xWins++;
      else oWins++;
      endGame();
    } else if (
      [...document.querySelectorAll(".cell")].every((c) => c.textContent)
    ) {
      document.getElementById("status").textContent = "It's a draw!";
      draws++;
      endGame();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById(
        "status"
      ).textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function endGame() {
  gameOver = true;
  totalGames++;
  updateScoreboard();
  if (totalGames === 5) {
    xWins = 0;
    oWins = 0;
    draws = 0;
    totalGames = 0;
    updateScoreboard();
  }
}

function checkWinner() {
  const cells = document.querySelectorAll(".cell");
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return combos.some((combo) =>
    combo.every((i) => cells[i].textContent === currentPlayer)
  );
}

function resetGame() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  currentPlayer = "X";
  gameOver = false;
  document.getElementById("status").textContent = "Player X's turn";
}

function updateScoreboard() {
  document.getElementById("x-wins").textContent = xWins;
  document.getElementById("o-wins").textContent = oWins;
  document.getElementById("draws").textContent = draws;
  document.getElementById("total").textContent = totalGames;
}

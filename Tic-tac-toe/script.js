
document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("resetButton");

    const cells = Array.from({ length: 9 }, (_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        board.appendChild(cell);
        return cell;
    });

    let currentPlayer = "X";
    let boardState = Array(9).fill("");

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }

        if (boardState.every((cell) => cell !== "")) {
            return "Draw";
        }

        return null;
    }

    function handleClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (boardState[index] || checkWinner()) {
            return;
        }

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            status.textContent = winner === "Draw" ? "It's a draw!" : `Player ${winner} wins!`;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function resetGame() {
        boardState = Array(9).fill("");
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        status.textContent = "Player X's turn";
    }

    cells.forEach((cell) => {
        cell.addEventListener("click", handleClick);
    });

    resetButton.addEventListener("click", resetGame);
});


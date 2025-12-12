const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const pvpBtn = document.getElementById('pvp');
const pvaiBtn = document.getElementById('pvai');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = false;
let isAI = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] !== '' || !isGameActive) return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (checkDraw()) {
        status.textContent = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;

    if (isAI && currentPlayer === 'O') {
        setTimeout(aiMove, 500); // Delay for AI move
    }
}

function aiMove() {
    const availableCells = gameBoard.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    if (availableCells.length === 0) return;

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameBoard[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    cells[randomIndex].classList.add('taken');

    if (checkWin()) {
        status.textContent = 'AI wins!';
        isGameActive = false;
        return;
    }

    if (checkDraw()) {
        status.textContent = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => gameBoard[index] === currentPlayer);
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = false;
    isAI = false;
    status.textContent = 'Choose a mode to start!';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
}

function startPVP() {
    resetGame();
    isGameActive = true;
    isAI = false;
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function startPVAI() {
    resetGame();
    isGameActive = true;
    isAI = true;
    status.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
pvpBtn.addEventListener('click', startPVP);
pvaiBtn.addEventListener('click', startPVAI);
// Estado del juego
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;
let scores = {
    x: 0,
    o: 0,
    draws: 0
};

// Combinaciones ganadoras
const winningCombinations = [
    [0, 1, 2], // fila superior
    [3, 4, 5], // fila media
    [6, 7, 8], // fila inferior
    [0, 3, 6], // columna izquierda
    [1, 4, 7], // columna media
    [2, 5, 8], // columna derecha
    [0, 4, 8], // diagonal principal
    [2, 4, 6]  // diagonal secundaria
];

// Elementos del DOM
const squares = document.querySelectorAll('.square');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const resetButton = document.getElementById('resetButton');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraws = document.getElementById('scoreDraws');

// Inicializar el juego
function initGame() {
    squares.forEach((square, index) => {
        square.addEventListener('click', () => handleSquareClick(index));
    });
    
    resetButton.addEventListener('click', resetGame);
    updateDisplay();
}

// Manejar click en casilla
function handleSquareClick(index) {
    // Verificar si la casilla está vacía y el juego está activo
    if (board[index] !== null || !gameActive) {
        return;
    }
    
    // Realizar movimiento
    makeMove(index);
    
    // Verificar ganador
    const winner = checkWinner();
    
    if (winner) {
        handleGameEnd(winner);
    } else if (board.every(cell => cell !== null)) {
        // Empate
        handleGameEnd('draw');
    } else {
        // Cambiar turno
        switchPlayer();
    }
    
    updateDisplay();
}

// Realizar movimiento
function makeMove(index) {
    board[index] = currentPlayer;
    const square = squares[index];
    square.textContent = currentPlayer;
    square.classList.add(currentPlayer.toLowerCase());
    
    // Efecto visual
    square.style.transform = 'scale(1.1)';
    setTimeout(() => {
        square.style.transform = 'scale(1)';
    }, 150);
}

// Verificar ganador
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Resaltar casillas ganadoras
            highlightWinningSquares([a, b, c]);
            return board[a];
        }
    }
    return null;
}

// Resaltar casillas ganadoras
function highlightWinningSquares(indices) {
    indices.forEach(index => {
        squares[index].style.background = '#90EE90';
        squares[index].style.boxShadow = '0 0 20px rgba(144, 238, 144, 0.8)';
    });
}

// Cambiar jugador
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Manejar fin del juego
function handleGameEnd(result) {
    gameActive = false;
    
    if (result === 'draw') {
        scores.draws++;
        showGameResult('¡Empate!', '#FFD700');
    } else {
        if (result === 'X') {
            scores.x++;
            showGameResult('¡Jugador X Gana!', '#4A90E2');
        } else {
            scores.o++;
            showGameResult('¡Jugador O Gana!', '#FF4444');
        }
    }
    
    updateScoreDisplay();
}

// Mostrar resultado del juego
function showGameResult(message, color) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'game-result';
    resultDiv.textContent = message;
    resultDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${color};
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 1.5rem;
        font-weight: bold;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: resultAnimation 0.5s ease-out;
    `;
    
    // Agregar animación CSS
    if (!document.querySelector('#result-animation-style')) {
        const style = document.createElement('style');
        style.id = 'result-animation-style';
        style.textContent = `
            @keyframes resultAnimation {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                100% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(resultDiv);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (resultDiv.parentNode) {
            resultDiv.remove();
        }
    }, 3000);
}

// Reiniciar juego
function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    
    // Limpiar casillas
    squares.forEach(square => {
        square.textContent = '';
        square.className = 'square';
        square.style.background = '';
        square.style.boxShadow = '';
        square.style.transform = '';
    });
    
    // Remover mensaje de resultado si existe
    const existingResult = document.querySelector('.game-result');
    if (existingResult) {
        existingResult.remove();
    }
    
    updateDisplay();
    
    // Efecto visual en el botón
    resetButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        resetButton.style.transform = 'scale(1)';
    }, 100);
}

// Actualizar display
function updateDisplay() {
    currentPlayerDisplay.textContent = currentPlayer;
    currentPlayerDisplay.style.background = currentPlayer === 'X' ? '#4A90E2' : '#FF4444';
    
    // Actualizar indicador de turno
    const turnIndicator = document.querySelector('.turn-indicator h2');
    if (!gameActive) {
        turnIndicator.textContent = 'Juego Terminado';
    } else {
        turnIndicator.textContent = 'Turno del Jugador:';
    }
}

// Actualizar marcador
function updateScoreDisplay() {
    scoreX.textContent = scores.x;
    scoreO.textContent = scores.o;
    scoreDraws.textContent = scores.draws;
    
    // Efecto visual en el marcador actualizado
    const updatedScore = scores.x > parseInt(scoreX.textContent) ? scoreX :
                        scores.o > parseInt(scoreO.textContent) ? scoreO : scoreDraws;
    
    updatedScore.style.transform = 'scale(1.2)';
    updatedScore.style.color = '#28a745';
    setTimeout(() => {
        updatedScore.style.transform = 'scale(1)';
        updatedScore.style.color = '';
    }, 500);
}

// Funciones adicionales para mejorar la experiencia

// Efecto hover mejorado
squares.forEach(square => {
    square.addEventListener('mouseenter', function() {
        if (this.textContent === '' && gameActive) {
            this.style.background = '#f0f8ff';
            this.textContent = currentPlayer;
            this.style.opacity = '0.5';
        }
    });
    
    square.addEventListener('mouseleave', function() {
        if (this.style.opacity === '0.5') {
            this.textContent = '';
            this.style.background = '';
            this.style.opacity = '';
        }
    });
});

// Atajos de teclado
document.addEventListener('keydown', function(event) {
    // Tecla R para reiniciar
    if (event.key.toLowerCase() === 'r') {
        resetGame();
    }
    
    // Teclas numéricas 1-9 para jugar
    const num = parseInt(event.key);
    if (num >= 1 && num <= 9) {
        handleSquareClick(num - 1);
    }
});

// Guardar puntuaciones en localStorage
function saveScores() {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
}

function loadScores() {
    const savedScores = localStorage.getItem('ticTacToeScores');
    if (savedScores) {
        scores = JSON.parse(savedScores);
        updateScoreDisplay();
    }
}

// Función para resetear puntuaciones
function resetScores() {
    scores = { x: 0, o: 0, draws: 0 };
    updateScoreDisplay();
    saveScores();
}

// Agregar botón para resetear puntuaciones
function addResetScoresButton() {
    const resetScoresBtn = document.createElement('button');
    resetScoresBtn.textContent = '🗑️ Resetear Puntuaciones';
    resetScoresBtn.className = 'reset-scores-button';
    resetScoresBtn.style.cssText = `
        background: #dc3545;
        color: white;
        border: none;
        padding: 8px 16px;
        font-size: 0.9rem;
        font-weight: 600;
        border-radius: 20px;
        cursor: pointer;
        margin-top: 15px;
        transition: all 0.2s ease;
    `;
    
    resetScoresBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres resetear todas las puntuaciones?')) {
            resetScores();
        }
    });
    
    resetScoresBtn.addEventListener('mouseenter', function() {
        this.style.background = '#c82333';
        this.style.transform = 'translateY(-2px)';
    });
    
    resetScoresBtn.addEventListener('mouseleave', function() {
        this.style.background = '#dc3545';
        this.style.transform = 'translateY(0)';
    });
    
    document.querySelector('.score-section').appendChild(resetScoresBtn);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    loadScores();
    initGame();
    addResetScoresButton();
    
    // Guardar puntuaciones cada vez que cambien
    const originalHandleGameEnd = handleGameEnd;
    handleGameEnd = function(result) {
        originalHandleGameEnd(result);
        saveScores();
    };
});

// Prevenir selección de texto en las casillas
squares.forEach(square => {
    square.addEventListener('selectstart', e => e.preventDefault());
});

// Mensaje de bienvenida
console.log('🎮 TicTacToe cargado correctamente!');
console.log('💡 Tip: Usa la tecla "R" para reiniciar o las teclas 1-9 para jugar');

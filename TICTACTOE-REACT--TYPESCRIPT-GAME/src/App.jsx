import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });
  const [winner, setWinner] = useState(null);

  function handleClick(index) {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      setScore((prev) => ({
        ...prev,
        [win]: prev[win] + 1,
      }));
    } else if (newBoard.every((cell) => cell)) {
      setWinner("Empate");
      setScore((prev) => ({
        ...prev,
        draws: prev.draws + 1,
      }));
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setWinner(null);
  }

  function checkWinner(b) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return null;
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1 className="title">TicTacToe</h1>
        <p className="subtitle">Construido con React.js ⚛️</p>
      </header>

      {/* Game Section */}
      <main className="main-content">
        <div className="game-container">
          <div className="turn-indicator">
            <h2>Turno del Jugador:</h2>
            <div className="current-player">
              {winner ? (winner === "Empate" ? "Empate" : `Ganó ${winner}`) : turn}
            </div>
          </div>

          <div className="board">
            {board.map((cell, idx) => (
              <div
                key={idx}
                className="square"
                onClick={() => handleClick(idx)}
                style={{ cursor: winner ? "not-allowed" : "pointer" }}
              >
                {cell}
              </div>
            ))}
          </div>

          <button className="reset-button" onClick={resetGame}>
            🔄 Reiniciar Juego
          </button>
        </div>

        {/* Score Section */}
        <div className="score-section">
          <h3>🏆 Puntuación</h3>
          <div className="score-board">
            <div className="score-item player-x">
              <div className="score-icon">✕</div>
              <div className="score-info">
                <span className="player-name">Jugador X</span>
                <span className="score-value">{score.X}</span>
              </div>
            </div>
            <div className="score-item player-o">
              <div className="score-icon">○</div>
              <div className="score-info">
                <span className="player-name">Jugador O</span>
                <span className="score-value">{score.O}</span>
              </div>
            </div>
            <div className="score-item draws">
              <div className="score-icon">🤝</div>
              <div className="score-info">
                <span className="player-name">Empates</span>
                <span className="score-value">{score.draws}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="instructions-section">
          <h3>🎮 Cómo Jugar</h3>
          <div className="instruction-steps">
            <div className="step">
              <div className="step-number">1</div>
              <p>Haz clic en una casilla vacía para marcarla</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>Consigue 3 en línea para ganar</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>Puede ser horizontal, vertical o diagonal</p>
            </div>
          </div>
          <div className="highlight-note">
            <span className="highlight-icon">✕</span>
            <strong>¡El jugador X siempre empieza!</strong>
          </div>
        </div>

        {/* React Concepts Section */}
        <div className="concepts-section">
          <h3>⚛️ Conceptos React</h3>
          <div className="concept-cards">
            <div className="concept-card useState">
              <h4>useState</h4>
              <p>State para el tablero y jugador actual</p>
            </div>
            <div className="concept-card event-handlers">
              <h4>Event Handlers</h4>
              <p>onClick para manejar clics</p>
            </div>
            <div className="concept-card conditional">
              <h4>Conditional Rendering</h4>
              <p>Mostrar ganador o turno actual</p>
            </div>
            <div className="concept-card array-methods">
              <h4>Array Methods</h4>
              <p>map() para renderizar casillas</p>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="tech-stack-section">
          <h3>🛠️ Stack Tecnológico</h3>
          <div className="tech-cards">
            <div className="tech-card react">
              <div className=
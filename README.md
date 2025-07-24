

# TicTacToe

## Project Overview
TicTacToe is an interactive web-based game developed using React.js and TypeScript. It allows two players to compete in a classic game of Tic Tac Toe, tracking scores and providing a user-friendly interface. This project serves as an educational tool for demonstrating modern web development practices and the use of React Hooks.

## Installation
To get started with the TicTacToe project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/tictactoe.git
   cd tictactoe
   ```

2. **Install dependencies**:
   If you're using npm, run:
   ```bash
   npm install
   ```
   If you're using yarn, run:
   ```bash
   yarn install
   ```

3. **Start the development server**:
   Using npm:
   ```bash
   npm run dev
   ```
   Using yarn:
   ```bash
   yarn dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` (or the specified port) to view the game.

## Usage
- Click on an empty square to place your mark (either X or O).
- The objective is to align three of your marks either horizontally, vertically, or diagonally.
- Click the "Reiniciar Juego" (Reset Game) button to start a new game at any time.
- The scores of both players, as well as the number of draws, are displayed and updated automatically.

## Features
- Player vs. Player mode, where users can take turns.
- Tracks and displays scores for both players and draws.
- Resets game state and scores with a dedicated button.
- Clear instructions on how to play the game.
- Responsive design for mobile and desktop devices.
- Utilizes React.js concepts such as State management, Event Handlers, Conditional Rendering, and Array Methods.

## Dependencies
This project utilizes the following key dependencies:
- **React**: For building user interfaces.
- **TypeScript**: For static type checking.
- **Vite**: As the development server and build tool.

You may find these dependencies directly specified in the `package.json` file.

## Project Structure
```
tictactoe/
├── index.html         # Main HTML file for the application
├── styles.css         # Styles for the application
└── script.js          # Main JavaScript file with game logic
```

### Key Files
- `index.html`: The entry point for the web application that contains the main layout and structure.
- `styles.css`: Contains all the styling for the TicTacToe game, creating an appealing user interface.
- `script.js`: Implements the game logic, including player turns, win conditions, score tracking, and game reset functionality.

---

Feel free to customize and expand this README file based on your specific needs or additional features you would like to highlight!

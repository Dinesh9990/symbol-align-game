import { useState } from 'react';
import Button from '@mui/material/Button';
import '../SymbolAlign.css';

import Grid from './Grid';
import { symbols } from '../constants/symbols';
import { generateRandomGrid } from '../utils/generateRandomGrid';
import { checkWin } from '../utils/checkWin';

export default function SymbolAlign() {

  const SIZE = 4;

  const [gamestarted, setGameStarted] = useState(false);
  const [grid, setGrid] = useState([]);
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  const gameStart = () => {

    setGameStarted(true);
    setGrid(generateRandomGrid(SIZE, symbols));
    setSelected(null);
    setMoves(0);
    setWon(false);
    setFinalScore(null);

  };

  const handleSymbolClick = (row,col)=>{
    if(won) return;
    setSelected({row,col});
  };

  const swapSymbols = (r1,c1,r2,c2)=>{

    if(won) return;

    const newGrid = grid.map(row => [...row]);

    [newGrid[r1][c1],newGrid[r2][c2]] =
    [newGrid[r2][c2],newGrid[r1][c1]];

    setGrid(newGrid);
    setSelected(null);
    setMoves(prev=>prev+1);

    checkWin(newGrid, SIZE, winGame);

  };

  const winGame = ()=>{
    setWon(true);
    const score = Math.max(100 - moves*4,0);
    setFinalScore(score);
  };

  return (

    <div>

      <h1>Symbol Align</h1>

      <hr/>

      <h3>
        Arrange 4 matching symbols in a row or column to win.
      </h3>

      {!won && (
        <h3 className="info">
          Solve the 4×4 puzzle with minimum moves.
        </h3>
      )}

      {won && (
        <div className="win-container">

          🎉 You Won!

          <br/>

          <span className="score-text">
            Final Score: {finalScore}
          </span>

          <br/>

          <Button
          className="restart-button"
          onClick={gameStart}>
            Restart Game
          </Button>

        </div>
      )}

      {!gamestarted && (
        <Button
        onClick={gameStart}
        variant="contained">
          Start Game
        </Button>
      )}

      {gamestarted && (

        <Grid
          grid={grid}
          SIZE={SIZE}
          selected={selected}
          handleSymbolClick={handleSymbolClick}
          swapSymbols={swapSymbols}
        />

      )}

    </div>

  );

}
import { useState } from 'react';
import { ArrowUpward, ArrowDownward, ArrowBack, ArrowForward } from "@mui/icons-material";
import Button from '@mui/material/Button';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './SymbolAlign.css';

export default function SymbolAlign() {

  const SIZE = 4;

  const [gamestarted, setGameStarted] = useState(false);
  const [grid, setGrid] = useState([]);
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  const symbols = [
    <img src={viteLogo} className="logo" alt="Vite logo" />,
    "❤️",
    <img src={reactLogo} className="logo react" alt="React logo" />,
    "⭐"
  ];

  const generateRandomGrid = () => {

    let cells = [
      0,0,0,0,
      1,1,1,1,
      2,2,2,2,
      3,3,3,3
    ];

    const shuffle = (array) => {
      let arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    let grid;
    let valid = false;

    while (!valid) {

      const shuffled = shuffle(cells);

      grid = [];

      for(let i=0;i<SIZE;i++){
        grid.push(shuffled.slice(i*SIZE,(i+1)*SIZE));
      }

      valid = true;

      const aligned = (arr)=> arr.every(v => v === arr[0]);

      for(let i=0;i<SIZE;i++){

        if(aligned(grid[i])) valid = false;

        let column = [];
        for(let j=0;j<SIZE;j++){
          column.push(grid[j][i]);
        }

        if(aligned(column)) valid = false;
      }

    }

    return grid.map(row => row.map(i => symbols[i]));

  };

  const gameStart = () => {

    setGameStarted(true);
    setGrid(generateRandomGrid());
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

    checkWin(newGrid);

  };

  const renderArrows = (row,col)=>(
    <>
      {row>0 && (
        <ArrowUpward
        className="arrow arrow-up"
        onClick={()=>swapSymbols(row,col,row-1,col)}
        />
      )}

      {row<SIZE-1 && (
        <ArrowDownward
        className="arrow arrow-down"
        onClick={()=>swapSymbols(row,col,row+1,col)}
        />
      )}

      {col>0 && (
        <ArrowBack
        className="arrow arrow-left"
        onClick={()=>swapSymbols(row,col,row,col-1)}
        />
      )}

      {col<SIZE-1 && (
        <ArrowForward
        className="arrow arrow-right"
        onClick={()=>swapSymbols(row,col,row,col+1)}
        />
      )}
    </>
  );

  const symbolToString = (s)=>
    typeof s==="string"?s:s?.props?.alt || "";

  const checkWin = (gridToCheck) => {

  const alignedSymbols = new Set();

  const symbolToString = (s)=>
    typeof s==="string"?s:s?.props?.alt || "";

  const aligned = (a,b,c,d)=>
    symbolToString(a)===symbolToString(b) &&
    symbolToString(b)===symbolToString(c) &&
    symbolToString(c)===symbolToString(d);

  for(let i=0;i<SIZE;i++){

    if(aligned(
      gridToCheck[i][0],
      gridToCheck[i][1],
      gridToCheck[i][2],
      gridToCheck[i][3]
    )){
      alignedSymbols.add(symbolToString(gridToCheck[i][0]));
    }

    if(aligned(
      gridToCheck[0][i],
      gridToCheck[1][i],
      gridToCheck[2][i],
      gridToCheck[3][i]
    )){
      alignedSymbols.add(symbolToString(gridToCheck[0][i]));
    }

  }

  if(alignedSymbols.size === 4){
    winGame();
  }

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

        <div className="grid">

          {grid.map((row,rowIndex)=>(
            <div key={rowIndex} className="row">

              {row.map((symbol,colIndex)=>{

                const isSelected =
                selected?.row===rowIndex &&
                selected?.col===colIndex;

                return(

                  <div key={colIndex} className="cell-wrapper">

                    <div
                    className={`cell ${isSelected?'selected':''}`}
                    onClick={()=>handleSymbolClick(rowIndex,colIndex)}
                    >
                      {symbol}
                    </div>

                    {isSelected && renderArrows(rowIndex,colIndex)}

                  </div>

                );

              })}

            </div>
          ))}

        </div>

      )}

    </div>

  );

}
export const generateRandomGrid = (SIZE, symbols) => {

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
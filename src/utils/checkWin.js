export const checkWin = (gridToCheck, SIZE, winGame) => {

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
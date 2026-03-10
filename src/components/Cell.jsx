import { ArrowUpward, ArrowDownward, ArrowBack, ArrowForward } from "@mui/icons-material";

export default function Cell({
  symbol,
  rowIndex,
  colIndex,
  SIZE,
  selected,
  handleSymbolClick,
  swapSymbols
}) {

  const isSelected =
    selected?.row===rowIndex &&
    selected?.col===colIndex;

  const renderArrows = ()=>(
    <>
      {rowIndex>0 && (
        <ArrowUpward
        className="arrow arrow-up"
        onClick={()=>swapSymbols(rowIndex,colIndex,rowIndex-1,colIndex)}
        />
      )}

      {rowIndex<SIZE-1 && (
        <ArrowDownward
        className="arrow arrow-down"
        onClick={()=>swapSymbols(rowIndex,colIndex,rowIndex+1,colIndex)}
        />
      )}

      {colIndex>0 && (
        <ArrowBack
        className="arrow arrow-left"
        onClick={()=>swapSymbols(rowIndex,colIndex,rowIndex,colIndex-1)}
        />
      )}

      {colIndex<SIZE-1 && (
        <ArrowForward
        className="arrow arrow-right"
        onClick={()=>swapSymbols(rowIndex,colIndex,rowIndex,colIndex+1)}
        />
      )}
    </>
  );

  return(
    <div className="cell-wrapper">

      <div
      className={`cell ${isSelected?'selected':''}`}
      onClick={()=>handleSymbolClick(rowIndex,colIndex)}
      >
        {symbol}
      </div>

      {isSelected && renderArrows()}

    </div>
  );

}
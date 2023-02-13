import "../App.css";

const GridCell = ({ id, index, active, gridChange, beatState, isPlaying }) => {
  const playHead = (beatState) === ((id + 1) % 16) && isPlaying;

  const gridCellHandler = () => {
    gridChange(id);
  };
  return (
    <div className={playHead ? "grid-cell-outer-play" :"grid-cell-outer"}>
      <div
        className={active ? "grid-cell-active" : "grid-cell"}
        onClick={gridCellHandler}
      ></div>
    </div>
  );
};

export default GridCell;

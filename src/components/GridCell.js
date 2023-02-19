import "../App.css";

const GridCell = ({ id, state, gridChange, beatState, isPlaying }) => {
  const playHead = beatState === (id + 1) % 16 && isPlaying;

  const gridCellHandler = () => {
    gridChange(id);
  };
  console.log(id);

  return (
    <div className={playHead ? "grid-cell-outer-play" : "grid-cell-outer"}>
      <div
        className={
          state > 1
            ? "grid-cell-accent"
            : state > 0
            ? "grid-cell-active"
            : "grid-cell"
        }
        onClick={gridCellHandler}
      ></div>
    </div>
  );
};

export default GridCell;

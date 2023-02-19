import "../App.css";

import GridCell from "./GridCell";

const Seq = ({
  isPlaying,
  beatState,
  gridChange,
  gridState,
  playBd,
  playSn,
  playCh,
  playOh,
  playCy,
}) => {
  let patternArray = [];
  let iterator = 0;
  for (const pattern in gridState) {
    const patternModificator = iterator;
    console.log(pattern);
    patternArray[iterator] = gridState[pattern].map((beat, index) => {
      if (beat === 1) {
        return (
          <GridCell
            isPlaying={isPlaying}
            beatState={beatState}
            state={1}
            key={index}
            index={index}
            id={index + 16 * patternModificator}
            gridChange={gridChange}
          />
        );
      }
      if (beat === 2) {
        return (
          <GridCell
            isPlaying={isPlaying}
            beatState={beatState}
            state={2}
            key={index}
            index={index}
            id={index + 16 * patternModificator}
            gridChange={gridChange}
          />
        );
      }
      return (
        <GridCell
          isPlaying={isPlaying}
          beatState={beatState}
          state={0}
          key={index}
          index={index}
          id={index + 16 * patternModificator}
          gridChange={gridChange}
        />
      );
    });
    iterator++;
  }

  return (
    <div className="seq">
      <div className="grid">
        <p>Kick:</p>
        {patternArray[0]}
        <p>Snare:</p>
        {patternArray[1]}
        <p>ClHat:</p>
        {patternArray[2]}
        <p>OpHat:</p>
        {patternArray[3]}
        <p>Cymbal:</p>
        {patternArray[4]}
      </div>

      <div className="pads">
        <div onMouseDown={playBd}>
          <p>Kick</p>
        </div>
        <div onMouseDown={playSn}>
          <p>Snare</p>
        </div>
        <div onMouseDown={playCh}>
          <p>ClHat</p>
        </div>
        <div onMouseDown={playOh}>
          <p>OpHat</p>
        </div>
        <div onMouseDown={playCy}>
          <p>Cym</p>
        </div>
      </div>
    </div>
  );
};

export default Seq;

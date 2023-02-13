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
  const { bPat, sPat, hPat, oPat, cPat } = gridState;

  const bGrid = bPat.map((beat, index) => {
    if (beat === 0) {
      return (
        <GridCell
          isPlaying={isPlaying}
          beatState={beatState}
          active={false}
          key={index}
          index={index}
          id={index}
          gridChange={gridChange}
        />
      );
    }
    return (
      <GridCell
        isPlaying={isPlaying}
        beatState={beatState}
        active={true}
        key={index}
        index={index}
        id={index}
        gridChange={gridChange}
      />
    );
  });
  const sGrid = sPat.map((beat, index) => {
    if (beat === 0) {
      return (
        <GridCell
          isPlaying={isPlaying}
          beatState={beatState}
          active={false}
          key={index}
          index={index}
          id={index + 16}
          gridChange={gridChange}
        />
      );
    }
    return (
      <GridCell
        isPlaying={isPlaying}
        beatState={beatState}
        active={true}
        key={index}
        index={index}
        id={index + 16}
        gridChange={gridChange}
      />
    );
  });
  const hGrid = hPat.map((beat, index) => {
    if (beat === 0) {
      return (
        <GridCell
          isPlaying={isPlaying}
          beatState={beatState}
          active={false}
          key={index}
          index={index}
          id={index + 32}
          gridChange={gridChange}
        />
      );
    }
    return (
      <GridCell
        isPlaying={isPlaying}
        beatState={beatState}
        active={true}
        key={index}
        index={index}
        id={index + 32}
        gridChange={gridChange}
      />
    );
  });
  const oGrid = oPat.map((beat, index) => {
    if (beat === 0) {
      return (
        <GridCell
          isPlaying={isPlaying}
          beatState={beatState}
          active={false}
          key={index}
          index={index}
          id={index + 48}
          gridChange={gridChange}
        />
      );
    }
    return (
      <GridCell
        isPlaying={isPlaying}
        beatState={beatState}
        active={true}
        key={index}
        index={index}
        id={index + 48}
        gridChange={gridChange}
      />
    );
  });
  const cGrid = cPat.map((beat, index) => {
    if (beat === 0) {
      return (
        <GridCell
          isPlaying={isPlaying}
          beatState={beatState}
          active={false}
          key={index}
          index={index}
          id={index + 64}
          gridChange={gridChange}
        />
      );
    }
    return (
      <GridCell
        isPlaying={isPlaying}
        beatState={beatState}
        active={true}
        key={index}
        index={index}
        id={index + 64}
        gridChange={gridChange}
      />
    );
  });

  return (
    <div className="seq">
        <div className="grid">
          <p>Kick:</p>
          {bGrid}
          <p>Snare:</p>
          {sGrid}
          <p>ClHat:</p>
          {hGrid}
          <p>OpHat:</p>
          {oGrid}
          <p>Cymbal:</p>
          {cGrid}
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

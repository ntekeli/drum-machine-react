import "../App.css";
import InstrumentControl from "./InstrumentControl";
import Master from "./Master";
import Dropdown from "../UI/Dropdown";

const Header = ({
  setKit,
  kitState,
  isPlaying,
  setVolume,
  setDist,
  setRev,
  setBpm,
  setFilter,
  start,
  stop,
}) => {
  return (
    <div className="header">
      <div className="sub-header">
        <div className="info">
          <span>Drum-Seq 0.1</span>
            {isPlaying ? (
              <span>{kitState}</span>
            ) : (
              <Dropdown
                onChange={(value) => setKit(value)}
                placeHolder="Select kit..."
                isMulti={false}
              />
            )}
        </div>
        <div className="inst-sect">
          <InstrumentControl id={0} />
          <InstrumentControl id={1} />
          <InstrumentControl id={2} />
          <InstrumentControl id={3} />
          <InstrumentControl id={4} />
        </div>
      </div>
      <Master
        isPlaying={isPlaying}
        setDist={setDist}
        setFilter={setFilter}
        setRev={setRev}
        setVolume={setVolume}
        setBpm={setBpm}
        start={start}
        stop={stop}
      />
    </div>
  );
};
export default Header;

import "../App.css";
import Knob from "react-simple-knob";

const knobStyle = {
  margin: "0 auto",
  height: "5rem",
  fontFamily: "Arial",
  color: "#26547cff",
};

const Master = ({
  setFilter,
  setVolume,
  setDist,
  setRev,
  setBpm,
  start,
  stop,
  isPlaying,
}) => {
  return (
    <div className="master-control">
      <span>Master control section</span>
      <hr />
      <button className={isPlaying ? "play--active" : "play"} onClick={start} />
      <button className={isPlaying ? "stop" : "stop--active"} onClick={stop} />
      <div className="master-knobs">
        <Knob
          name="Volume"
          unit=""
          defaultPercentage={0.5}
          onChange={setVolume}
          bg="black"
          fg="white"
          mouseSpeed={1}
          transform={(p) => parseInt(p * 50, 10) / 50}
          style={knobStyle}
        />
        <Knob
          name="BPM"
          unit=""
          defaultPercentage={0.4}
          onChange={setBpm}
          bg="black"
          fg="white"
          mouseSpeed={1}
          transform={(p) => parseInt(p * 300)}
          style={knobStyle}
        />
        <Knob
          name="Drive"
          unit=""
          defaultPercentage={0}
          onChange={setDist}
          bg="black"
          fg="white"
          mouseSpeed={1}
          transform={(p) => parseInt(p * 50, 10) / 50}
          style={knobStyle}
        />
        <Knob
          name="Reverb"
          unit=""
          defaultPercentage={0}
          onChange={setRev}
          bg="black"
          fg="white"
          mouseSpeed={1}
          transform={(p) => parseInt(p * 50, 10) / 10}
          style={knobStyle}
        />
        <Knob
          name="Filter"
          unit=""
          defaultPercentage={0}
          onChange={setFilter}
          bg="black"
          fg="white"
          mouseSpeed={1}
          transform={(p) => parseInt(p * 20, 10)}
          style={knobStyle}
        />
      </div>
    </div>
  );
};

export default Master;

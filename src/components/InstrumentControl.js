import "../App.css";
import Knob from "react-simple-knob";
import { useState, useContext } from "react";
import VolumeContext from "../store/VolumeContext";

const idMap = ["Kick", "Snare", "ClHat", "OpHat", "Cymbal"];
const knobStyle = {
  margin: "0 auto",
  height: "4rem",
  fontFamily: "Arial",
  color: "#26547cff",
};

const InstrumentControl = ({ id }) => {
  const [mutedState, setMutedState] = useState(true);
  const [volumeState, setVolumeState] = useState(0);
  const [pitchState, setPitchState] = useState(1);
  const [soloState, setSoloState] = useState(false);

  const controlContext = useContext(VolumeContext);

  const volumeRotary = (level) => {
    setVolumeState((prevState) => {
      if (level === prevState) {
        return prevState;
      }
      controlContext.volumeHandler(volumeState, id);
      return level;
    });
  };
  const pitchRotary = (level) => {
    setPitchState((prevState) => {
      if (level === prevState) {
        return prevState;
      }
      controlContext.pitchHandler(pitchState, id);
      return level;
    });
  };
  const muteSet = () => {
    if (!mutedState) {
      setMutedState(true);
      controlContext.muteHandler(id);
    }
    if (mutedState) {
      setMutedState(false);
      controlContext.unmuteHandler(id);
    }
  };
  const soloSet = () => {
    if (!soloState) {
      setSoloState(true);
      controlContext.soloHandler(id);
    }
    if (soloState) {
      setSoloState(false);
      controlContext.unsoloHandler(id);
    }
  };
  return (
    <div className="knobs">
      <p>{idMap[id]}</p>
      <button
        className={!mutedState ? "mute-active" : "mute"}
        onClick={muteSet}
      >
        Mute
      </button>
      <button 
        className={soloState ? "solo-active" : "solo"}
      onClick={soloSet}>Solo</button>
      <Knob
        name="Volume"
        unit=""
        defaultPercentage={0}
        onChange={volumeRotary}
        bg="black"
        fg="white"
        mouseSpeed={1}
        transform={(p) => parseInt(p * -24)}
        style={knobStyle}
      />
      <Knob
        name="Pitch"
        unit=""
        defaultPercentage={0.5}
        onChange={pitchRotary}
        bg="black"
        fg="white"
        mouseSpeed={1}
        transform={(p) => parseInt(p * 20)}
        style={knobStyle}
      />
    </div>
  );
};

export default InstrumentControl;

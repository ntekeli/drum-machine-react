import { useReducer } from "react";
import VolumeContext from "./VolumeContext";

const defaultState = {
  instrumentLevels: [0, 0, 0, 0, 0],
  instrumentMute: [false, false, false, false, false],
  instrumentPitch: [10, 10, 10, 10, 10],
};

const instrumentReducer = (state, action) => {
  const instrumentIndex = state.instrumentLevels.findIndex(
    (instrument, index) => index === action.id
  );

  if (action.type === "VOLUME") {
    const newLevel = action.level;
    const newInstrumentLevels = state.instrumentLevels;
    newInstrumentLevels[instrumentIndex] = newLevel;
    return {
      instrumentLevels: newInstrumentLevels,
      instrumentMute: state.instrumentMute,
      instrumentPitch: state.instrumentPitch,
    };
  }
  if (action.type === "PITCH") {
    const newLevel = action.level;
    const newPitchLevels = state.instrumentPitch;
    newPitchLevels[instrumentIndex] = newLevel;
    return {
      instrumentLevels: state.instrumentLevels,
      instrumentMute: state.instrumentMute,
      instrumentPitch: newPitchLevels,
    }
  }
  if (action.type === "MUTE") {
    const newMuteState = state.instrumentMute;
    newMuteState[instrumentIndex] = false;
    return {
      instrumentLevels: state.instrumentLevels,
      instrumentMute: newMuteState,
      instrumentPitch: state.instrumentPitch,
    };
  }
  if (action.type === "UNMUTE") {
    const newMuteState = state.instrumentMute;
    newMuteState[instrumentIndex] = true;
    return {
      instrumentLevels: state.instrumentLevels,
      instrumentMute: newMuteState,
      instrumentPitch: state.instrumentPitch,
    };
  }
  if (action.type === "SOLO") {
    let newSoloState = state.instrumentMute;
    newSoloState.forEach((element, index) => {
      newSoloState[index] = true;
    })
    
    newSoloState[instrumentIndex] = false;
   
    return {
      instrumentLevels: state.instrumentLevels,
      instrumentMute: newSoloState,
      instrumentPitch: state.instrumentPitch,
    }
  }
  if (action.type === "UNSOLO") {
    
    const newSoloState = [false, false, false, false, false];
    return {
      instrumentLevels: state.instrumentLevels,
      instrumentMute: newSoloState,
      instrumentPitch: state.instrumentPitch,
    }
  }
  return { defaultState };
};

function ControlProvider(props) {
  const [volumeState, dispatchControl] = useReducer(
    instrumentReducer,
    defaultState
  );

  const volumeHandler = (level, id) => {
    dispatchControl({ type: "VOLUME", level: level, id: id });
  };
  const muteHandler = (id) => {
    dispatchControl({ type: "MUTE", id: id });
  };
  const unmuteHandler = (id) => {
    dispatchControl({ type: "UNMUTE", id: id });
  };
  const soloHandler = (id) => {
    dispatchControl({ type: "SOLO", id: id })
  }
  const unsoloHandler = (id) => {
    dispatchControl({ type: "UNSOLO", id: id })
  }
  const pitchHandler = (level, id) => {
    dispatchControl( {type: "PITCH", level: level, id: id})
  }
  const controlContext = {
    instrumentLevels: volumeState.instrumentLevels,
    instrumentMute: volumeState.instrumentMute,
    instrumentPitch: volumeState.instrumentPitch,
    volumeHandler: volumeHandler,
    muteHandler: muteHandler,
    unmuteHandler: unmuteHandler,
    soloHandler: soloHandler,
    unsoloHandler: unsoloHandler,
    pitchHandler: pitchHandler,
  };
  return (
    <VolumeContext.Provider value={controlContext}>
      {props.children}
    </VolumeContext.Provider>
  );
}

export default ControlProvider;

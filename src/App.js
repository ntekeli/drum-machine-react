import "./App.css";
import Header from "./components/Header";
import Modal from "./UI/Modal";
import Seq from "./components/Seq";
import * as Tone from "tone";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

import bd01 from "./assets/bd01.wav";
import sn01 from "./assets/sn01.wav";
import ch01 from "./assets/ch01.wav";
import oh01 from "./assets/oh01.wav";
import cy01 from "./assets/cy01.wav";
import bd02 from "./assets/bd02.wav";
import sn02 from "./assets/sn02.wav";
import ch02 from "./assets/ch02.wav";
import oh02 from "./assets/oh02.wav";
import cy02 from "./assets/cy02.wav";
import bd03 from "./assets/bd03.wav";
import sn03 from "./assets/sn03.wav";
import ch03 from "./assets/ch03.wav";
import oh03 from "./assets/oh03.wav";
import cy03 from "./assets/cy03.wav";

import VolumeContext from "./store/VolumeContext";

const reverbSend = new Tone.Reverb(1);
const gainNode = new Tone.Gain(0.5);
const distNode = new Tone.Distortion(0);
const filter = new Tone.Filter(20000, "lowpass");

const kit1 = new Tone.Players({
  bd: bd01,
  sn: sn01,
  ch: ch01,
  oh: oh01,
  cy: cy01,
}).connect(distNode);

const kit2 = new Tone.Players({
  bd: bd02,
  sn: sn02,
  ch: ch02,
  oh: oh02,
  cy: cy02,
}).connect(distNode);

const kit3 = new Tone.Players({
  bd: bd03,
  sn: sn03,
  ch: ch03,
  oh: oh03,
  cy: cy03,
}).connect(distNode);

distNode.fan(gainNode, reverbSend);
reverbSend.connect(gainNode);
gainNode.chain(filter, Tone.Destination);

const defaultPattern = {
  bPat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  sPat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  hPat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  oPat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  cPat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

let beat = 0;
Tone.Transport.setLoopPoints(0, "16m");
Tone.Transport.loop = true;
Tone.Transport.bpm.rampTo(120, 0.01);

function App() {
  const [gridState, setGridState] = useState(defaultPattern);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filterState, setFilterState] = useState(20);
  const [mainVolumeState, setVolumeState] = useState(0.5);
  const [mainDistState, setDistState] = useState(0);
  const [mainReverState, setReverState] = useState(0.001);
  const [beatState, setBeatState] = useState(0);
  const [bpmState, setBpmState] = useState(120);
  const [justLoaded, setJustLoaded] = useState(true);
  const [kitState, setKitState] = useState(606);

  const controlCtx = useContext(VolumeContext);
  let activeKit;

  if (kitState === 606) {
    activeKit = kit1;
  }
  if (kitState === 808) {
    activeKit = kit2;
  }
  if (kitState === 909) {
    activeKit = kit3;
  }

  activeKit.fadeOut = "64n";

  async function initialization() {
    await Tone.start();
    setJustLoaded(false);
  }

  useEffect(() => {
    gainNode.gain.rampTo(mainVolumeState, 0.01);
  }, [mainVolumeState]);
  useEffect(() => {
    Tone.Transport.bpm.rampTo(bpmState, 0.01);
  }, [bpmState]);
  useEffect(() => {
    distNode.set({
      distortion: mainDistState,
      wet: 1,
    });
  }, [mainDistState]);
  useEffect(() => {
    reverbSend.set({
      decay: mainReverState + 0.001,
    });
  }, [mainReverState]);
  useEffect(() => {
    filter.frequency.rampTo(filterState * 1000 + 100, 0.001);
  }, [filterState]);

  const { instrumentLevels, instrumentMute, instrumentPitch } = controlCtx;

  useEffect(() => {
    activeKit.player("bd").volume.value = instrumentLevels[0];
    activeKit.player("sn").volume.value = instrumentLevels[1];
    activeKit.player("ch").volume.value = instrumentLevels[2];
    activeKit.player("oh").volume.value = instrumentLevels[3];
    activeKit.player("cy").volume.value = instrumentLevels[4];
  }, [controlCtx, instrumentLevels, activeKit]);
  useEffect(() => {
    activeKit.player("bd").mute = instrumentMute[0];
    activeKit.player("sn").mute = instrumentMute[1];
    activeKit.player("ch").mute = instrumentMute[2];
    activeKit.player("oh").mute = instrumentMute[3];
    activeKit.player("cy").mute = instrumentMute[4];
  }, [controlCtx, instrumentMute, activeKit]);
  useEffect(() => {
    let pitches = [...instrumentPitch];
    pitches.forEach((element, index) => {
      if (pitches[index] >= 10) {
        pitches[index] = element / 10;
      }
      if (pitches[index] < 10) {
        pitches[index] = element / 10;
      }
    });
    activeKit.player("bd").playbackRate = pitches[0];
    activeKit.player("sn").playbackRate = pitches[1];
    activeKit.player("ch").playbackRate = pitches[2];
    activeKit.player("oh").playbackRate = pitches[3];
    activeKit.player("cy").playbackRate = pitches[4];
  }, [controlCtx, instrumentPitch, activeKit]);

  const start = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      Tone.Transport.cancel();
      Tone.Transport.scheduleRepeat((time) => {
        if (gridState.bPat[beat] === 1) {
          activeKit.player("bd").start(time, 0, time);
        }
        if (gridState.sPat[beat] === 1) {
          activeKit.player("sn").start(time, 0, time);
        }
        if (gridState.hPat[beat] === 1) {
          activeKit.player("ch").start(time, 0, time);
        }
        if (gridState.oPat[beat] === 1) {
          activeKit.player("oh").start(time, 0, time);
        }
        if (gridState.cPat[beat] === 1) {
          activeKit.player("cy").start(time, 0, time);
        }
        beat = (beat + 1) % 16;
        setBeatState(beat);
      }, "8n");
      Tone.Transport.start();
    }
  };

  const stop = () => {
    setIsPlaying(false);
    Tone.Transport.stop();
    beat = 0;
    setBeatState(beat);
  };

  const gridChange = (id) => {
    const { bPat, sPat, hPat, oPat, cPat } = gridState;
    if (id < 16) {
      bPat[id] = +!bPat[id];
      setGridState({ bPat, sPat, hPat, oPat, cPat });
    }
    if (id < 32 && id >= 16) {
      sPat[id - 16] = +!sPat[id - 16];
      setGridState({ bPat, sPat, hPat, oPat, cPat });
    }
    if (id < 48 && id >= 32) {
      hPat[id - 32] = +!hPat[id - 32];
      setGridState({ bPat, sPat, hPat, oPat, cPat });
    }
    if (id < 64 && id >= 48) {
      oPat[id - 48] = +!oPat[id - 48];
      setGridState({ bPat, sPat, hPat, oPat, cPat });
    }
    if (id < 80 && id >= 64) {
      cPat[id - 64] = +!cPat[id - 64];
      setGridState({ bPat, sPat, hPat, oPat, cPat });
    }
  };

  const playBd = () => {
    activeKit.player("bd").start();
  };
  const playSn = () => {
    activeKit.player("sn").start();
  };
  const playCh = () => {
    activeKit.player("ch").start();
  };
  const playOh = () => {
    activeKit.player("oh").start();
  };
  const playCy = () => {
    activeKit.player("cy").start();
  };

  return (
    <>
      {justLoaded && (
        <Modal setKitState={setKitState} initialization={initialization} />
      )}
      <div className="main">
        <Header
          kitState={kitState}
          isPlaying={isPlaying}
          setKit={setKitState}
          volume={mainVolumeState}
          setBpm={setBpmState}
          setFilter={setFilterState}
          setVolume={setVolumeState}
          setDist={setDistState}
          setRev={setReverState}
          start={start}
          stop={stop}
        />
        <Seq
          isPlaying={isPlaying}
          beatState={beatState}
          gridChange={gridChange}
          gridState={gridState}
          defaultPattern={defaultPattern}
          playBd={playBd}
          playSn={playSn}
          playCh={playCh}
          playOh={playOh}
          playCy={playCy}
        />
      </div>
    </>
  );
}

export default App;

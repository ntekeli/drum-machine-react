import "./App.css";
import Header from "./components/Header";
import Modal from "./UI/Modal";
import Seq from "./components/Seq";
import * as Tone from "tone";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

import bd01A from "./assets/6bd_a.wav";
import sn01A from "./assets/6sn_a.wav";
import oh01A from "./assets/6oh_a.wav";
import ch01A from "./assets/6ch_a.wav";
import cy01A from "./assets/6cy_a.wav";
import bd02A from "./assets/8bd_a.wav";
import sn02A from "./assets/8sn_a.wav";
import ch02A from "./assets/8ch_a.wav";
import oh02A from "./assets/8oh_a.wav";
import cy02A from "./assets/8cy_a.wav";
import bd03A from "./assets/9bd_a.wav";
import sn03A from "./assets/9sn_a.wav";
import ch03A from "./assets/9ch_a.wav";
import oh03A from "./assets/9oh_a.wav";
import cy03A from "./assets/9cy_a.wav";
import bd01 from "./assets/6bd.wav";
import sn01 from "./assets/6sn.wav";
import ch01 from "./assets/6ch.wav";
import oh01 from "./assets/6oh.wav";
import cy01 from "./assets/6cy.wav";
import bd02 from "./assets/8bd.wav";
import sn02 from "./assets/8sn.wav";
import ch02 from "./assets/8ch.wav";
import oh02 from "./assets/8oh.wav";
import cy02 from "./assets/8cy.wav";
import bd03 from "./assets/9bd.wav";
import sn03 from "./assets/9sn.wav";
import ch03 from "./assets/9ch.wav";
import oh03 from "./assets/9oh.wav";
import cy03 from "./assets/9cy.wav";

import VolumeContext from "./store/VolumeContext";

const reverbSend = new Tone.Reverb(1);
const gainNode = new Tone.Gain(0.5);
const distNode = new Tone.Distortion(0);
const filter = new Tone.Filter(20000, "lowpass");

const kit1 = new Tone.Players({
  bd: bd01,
  bdA: bd01A,
  sn: sn01,
  snA: sn01A,
  ch: ch01,
  chA: ch01A,
  oh: oh01,
  ohA: oh01A,
  cy: cy01,
  cyA: cy01A
}).connect(distNode);

const kit2 = new Tone.Players({
  bd: bd02,
  bdA: bd02A,
  sn: sn02,
  snA: sn02A,
  ch: ch02,
  chA: ch02A,
  oh: oh02,
  ohA: oh02A,
  cy: cy02,
  cyA: cy02A
}).connect(distNode);

const kit3 = new Tone.Players({
  bd: bd03,
  bdA: bd03A,
  sn: sn03,
  snA: sn03A,
  ch: ch03,
  chA: ch03A,
  oh: oh03,
  ohA: oh03A,
  cy: cy03,
  cyA: cy03A
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
    activeKit.player("bdA").volume.value = instrumentLevels[0];
    activeKit.player("snA").volume.value = instrumentLevels[1];
    activeKit.player("chA").volume.value = instrumentLevels[2];
    activeKit.player("ohA").volume.value = instrumentLevels[3];
    activeKit.player("cyA").volume.value = instrumentLevels[4];
  }, [controlCtx, instrumentLevels, activeKit]);
  useEffect(() => {
    activeKit.player("bd").mute = instrumentMute[0];
    activeKit.player("sn").mute = instrumentMute[1];
    activeKit.player("ch").mute = instrumentMute[2];
    activeKit.player("oh").mute = instrumentMute[3];
    activeKit.player("cy").mute = instrumentMute[4];
    activeKit.player("bdA").mute = instrumentMute[0];
    activeKit.player("snA").mute = instrumentMute[1];
    activeKit.player("chA").mute = instrumentMute[2];
    activeKit.player("ohA").mute = instrumentMute[3];
    activeKit.player("cyA").mute = instrumentMute[4];
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
    activeKit.player("bdA").playbackRate = pitches[0];
    activeKit.player("snA").playbackRate = pitches[1];
    activeKit.player("chA").playbackRate = pitches[2];
    activeKit.player("ohA").playbackRate = pitches[3];
    activeKit.player("cyA").playbackRate = pitches[4];
  }, [controlCtx, instrumentPitch, activeKit]);

  const start = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      Tone.Transport.cancel();
      Tone.Transport.scheduleRepeat((time) => {
        if (gridState.bPat[beat] === 1) {
          activeKit.player("bd").start(time, 0, time);
        }
        if (gridState.bPat[beat] === 2) {
          activeKit.player("bdA").start(time, 0, time);
        }
        if (gridState.sPat[beat] === 1) {
          activeKit.player("sn").start(time, 0, time);
        }
        if (gridState.sPat[beat] === 2) {
          activeKit.player("snA").start(time, 0, time);
        }
        if (gridState.hPat[beat] === 1) {
          activeKit.player("ch").start(time, 0, time);
        }
        if (gridState.hPat[beat] === 2) {
          activeKit.player("chA").start(time, 0, time);
        }
        if (gridState.oPat[beat] === 1) {
          activeKit.player("oh").start(time, 0, time);
        }
        if (gridState.oPat[beat] === 2) {
          activeKit.player("ohA").start(time, 0, time);
        }
        if (gridState.cPat[beat] === 1) {
          activeKit.player("cy").start(time, 0, time);
        }
        if (gridState.cPat[beat] === 2) {
          activeKit.player("cyA").start(time, 0, time);
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
      bPat[id] = (bPat[id] + 1) % 3;
      setGridState({ bPat, sPat, hPat, oPat, cPat });
    }
    if (id < 32 && id >= 16) {
      sPat[id - 16] = (sPat[id - 16] + 1) % 3;
      setGridState({ bPat, sPat, hPat, oPat, cPat });
    }
    if (id < 48 && id >= 32) {
      hPat[id - 32] = (hPat[id - 32] + 1) % 3;
      setGridState({ bPat, sPat, hPat, oPat, cPat });
    }
    if (id < 64 && id >= 48) {
      oPat[id - 48] = (oPat[id - 48] + 1) % 3;
      setGridState({ bPat, sPat, hPat, oPat, cPat });
    }
    if (id < 80 && id >= 64) {
      cPat[id - 64] = (cPat[id - 64] + 1) % 3;
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

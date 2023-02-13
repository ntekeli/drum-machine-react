import "../App.css";
import Dropdown from "./Dropdown";

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div>
        <h1>Simple Drum Sequencer</h1>
        <button className="init" onClick={props.initialization}>Press to start</button>
        <Dropdown
          onChange={(value) => props.setKitState(value)}
          placeHolder="Select..."
          isMulti={false}
        />
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      <Backdrop />
      <ModalOverlay initialization={props.initialization} setKitState={props.setKitState}>
        {props.children}
      </ModalOverlay>
    </>
  );
};

export default Modal;

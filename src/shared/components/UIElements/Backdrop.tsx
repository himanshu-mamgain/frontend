import ReactDOM from "react-dom";
import type { BackDropProps } from "../../../interface";

import "./Backdrop.css";

const Backdrop = (props: BackDropProps) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")!
  );
};

export default Backdrop;

import ReactDOM from "react-dom";

import "./Backdrop.css";
import type { BackDropProps } from "./elements.types";

const Backdrop = (props: BackDropProps) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")!
  );
};

export default Backdrop;

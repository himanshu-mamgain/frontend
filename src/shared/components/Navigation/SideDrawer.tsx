import { useRef } from "react";
import ReactDOM from "react-dom";
import type { SideDrawerProps } from "../../../interface";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = (props: SideDrawerProps) => {
  const nodeRef = useRef(null);

  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <aside ref={nodeRef} className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("drawer-hook")!
  );
};

export default SideDrawer;

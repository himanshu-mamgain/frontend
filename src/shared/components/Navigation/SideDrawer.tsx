import ReactDOM from "react-dom";
import type { SideDrawerProps } from "./navigation.types";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";
import { useRef } from "react";

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

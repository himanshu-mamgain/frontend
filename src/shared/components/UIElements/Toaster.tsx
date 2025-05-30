import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./Toaster.css";
import type { ToasterProps } from "../../../interface";

const Toaster = (props: ToasterProps) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (props.show) {
      const timer = setTimeout(() => {
        props.onCancel();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [props.show]);

  const content = (
    <>
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="toaster"
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className={`toaster ${props.type}`}>
          {props.message}
        </div>
      </CSSTransition>
    </>
  );

  return ReactDOM.createPortal(content, document.getElementById("toaster")!);
};

export default Toaster;

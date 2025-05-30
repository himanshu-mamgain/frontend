import ReactDOM from "react-dom";
import React, { useRef } from "react";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";
import type { ModalOverlayProps, ModalProps } from "../../../interface";

const ModalOverlay = (props: ModalOverlayProps) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal_content ${props.contentClass}`}>
          {props.children}
        </div>
      </form>
      <footer className={`modal__footer ${props.footerClass}`}>
        {props.footer}
      </footer>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook")!);
};

const Modal = (props: ModalProps) => {
  const nodeRef = useRef(null);

  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;

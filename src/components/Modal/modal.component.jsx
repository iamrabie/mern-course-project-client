import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Backdrop from '../Backdrop/backdrop.component';
import './modal.css';

const ModalOverlay = props => {
  return (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
};

const Modal = props => {
  const nodeRef = useRef(null); // Create a ref for CSSTransition

  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef}  // Pass the nodeRef to CSSTransition
      >
        {/* Wrap ModalOverlay in a single element */}
        <div ref={nodeRef}>
          <ModalOverlay {...props} />
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;

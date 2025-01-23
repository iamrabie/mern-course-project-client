import "./sideDrawer.css";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

const SideDrawer = ({ children, onClick , show }) => {

  const nodeRef = useRef(null);  // Create a ref for the side drawer element

  let content = (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <aside ref={nodeRef} onClick={onClick} className="side-drawer">
        {children}
      </aside>
    </CSSTransition>
  );

  return (
    <>
      {ReactDOM.createPortal(
        content,
        document.getElementById("side-drawer-hook")
      )}
    </>
  );
};

export default SideDrawer;

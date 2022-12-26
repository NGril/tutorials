import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      // redirect to the list view when we click outside the modal
      onClick={props.onDismiss}
      className="ui dimmer modals visible active"
    >
      <div
        // we need to stop event propagation so that the click on somewhere inside the modal doesn't redirect us
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;

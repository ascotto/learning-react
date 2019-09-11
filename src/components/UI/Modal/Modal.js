import React, { useEffect } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Modal = props => {
  // When using shouldComponentUpdate we ask ourself: should the component update?
  /*shouldComponentUpdate(nextProps, nextState) {
    // checking if the children change (spinner loader lecture 209)
    if (nextProps.show !== props.show || nextProps.children !== props.children
    ) {
      return true;
    } else {
      return false;
    }
  }*/

  useEffect(() => {
    console.log("[Modal.js]..");
  }, []);

  return (
    <Aux>
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        {props.children}
      </div>
      <Backdrop show={props.show} clicked={props.modalClosed} />
    </Aux>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    // When using memo we ask ourself: should the component be "cached"?
    // If properties are equal cache the compoennt
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);

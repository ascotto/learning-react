import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = props => (
  <div className={classes.BuildControl}>
    <p className={classes.Label}>{props.label}</p>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      Remove
    </button>
    <button className={classes.More} onClick={props.added}>
      Add
    </button>
  </div>
);

export default buildControl;

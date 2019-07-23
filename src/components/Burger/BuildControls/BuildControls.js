import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current Price: {props.price.toFixed(2)} €</p>
    {controls.map(el => (
      <BuildControl
        added={() => props.ingredientAdded(el.type)}
        removed={() => props.ingredientRemoved(el.type)}
        disabled={props.disabled[el.type]}
        key={el.label}
        label={el.label}
      />
    ))}
  </div>
);

export default buildControls;

import React from "react";
import classes from "./Order.module.css";

const order = props => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientHtml = ingredients.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 10px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={ig.name}
      >
        {ig.name} - Cost ({ig.amount})
      </span>
    );
  });

  console.log(ingredients);

  return (
    <div className={classes.Order}>
      <p>Ingredients{ingredientHtml}</p>
      <p>
        Prices: <strong>{Number.parseFloat(props.price).toFixed(2)} EUR</strong>
      </p>
    </div>
  );
};

export default order;

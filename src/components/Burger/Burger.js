import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  const transformIngredients = Object.keys(props.ingredients).map(igKey => {
    console.log(igKey);

    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredients key={igKey + i} type={igKey} />;
    });
  });

  console.log(transformIngredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default burger;

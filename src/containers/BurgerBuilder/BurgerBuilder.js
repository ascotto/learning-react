import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

// Redux
import { connect } from "react-redux";
//import * as actonTypes from "../../store/actions/actionTypes";
import * as burgerBuilderActions from "../../store/actions/index";

/* Moved to the reducer
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.2,
  bacon: 0.7,
  onion: 0.2
};
*/

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
    console.log(props.ingredients);
  }, []);

  const purchaseHadler = () => {
    if (props.isAuthenticated) {
      //setState({ purchasing: true });
      setPurchasing(true);
    } else {
      props.onSetRedirectPath("/checkout");
      props.history.push("/login");
    }
  };

  const purchaseHandlerCancel = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  // Local UI state
  const updatePurchaseState = ingredients => {
    // don't update
    //const ingredients = {...state.ingredients};

    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    //setState({ purchasable: sum > 0 });
    return sum > 0;
  };

  const disabledInfo = { ...props.ings };

  // this will replace numbers with true or false
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummaryHTML = null;

  /*  if (this.state.loading) {
    orderSummaryHTML = <Spinner />;
  }*/

  let burgerHTML = props.error ? <p>Application error</p> : <Spinner />;

  if (props.ings) {
    burgerHTML = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          price={props.price}
          ingredientAdded={props.onIngredentAdded}
          ingredientRemoved={props.onIngredentRemove}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHadler}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    );

    orderSummaryHTML = (
      <OrderSummary
        finalPrice={props.price}
        ingredients={props.ings}
        purchaseCancel={purchaseHandlerCancel}
        purchaseContinue={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal modalClosed={purchaseHandlerCancel} show={purchasing}>
        {orderSummaryHTML}
      </Modal>
      {burgerHTML}
    </Aux>
  );
};

const mapsStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredentAdded: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredentRemove: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngridients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetRedirectPath: path =>
      dispatch(burgerBuilderActions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

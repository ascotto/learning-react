import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.2,
  bacon: 0.7,
  onion: 0.2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 5,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // https://react-burger-lover.firebaseio.com

    axios
      .get("/ingredients.json")
      .then(r => {
        this.setState({ ingredients: r.data });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  purchaseHadler = () => {
    this.setState({ purchasing: true });
  };

  purchaseHandlerCancel = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //alert("Continue");

    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Mauro Rossi",
        street: "Street address 1",
        zipCode: "6000",
        country: "Slovenia",
        email: "mauro@rossi.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(r => {
        console.log(r);
        this.setState({ loading: false, purchasing: false });
      })
      .catch(r => {
        this.setState({ loading: false, purchasing: false });
        console.log(r);
      });
    console.log("post orderds to firebase");
  };

  updatePurchaseState = ingredients => {
    // don't update
    //const ingredients = {...this.state.ingredients};

    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updateIngredients = { ...this.state.ingredients };

    updateIngredients[type] = updatedCounted;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice
    });

    this.updatePurchaseState(updateIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCounted = oldCount - 1;
    const updateIngredients = { ...this.state.ingredients };

    updateIngredients[type] = updatedCounted;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice
    });

    this.updatePurchaseState(updateIngredients);
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    // this will replace numbers with true or false
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummaryHTML = null;

    if (this.state.loading) {
      orderSummaryHTML = <Spinner />;
    }

    let burgerHTML = this.state.error ? <p>Application error</p> : <Spinner />;

    if (this.state.ingredients) {
      burgerHTML = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHadler}
          />
        </Aux>
      );

      orderSummaryHTML = (
        <OrderSummary
          finalPrice={this.state.totalPrice}
          ingredients={this.state.ingredients}
          purchaseCancel={this.purchaseHandlerCancel}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummaryHTML = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          modalClosed={this.purchaseHandlerCancel}
          show={this.state.purchasing}
        >
          {orderSummaryHTML}
        </Modal>
        {burgerHTML}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

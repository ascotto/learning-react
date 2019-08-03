import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummray";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 2,
      meat: 1,
      bacon: 2,
      onion: 1
    }
  };

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}

export default Checkout;

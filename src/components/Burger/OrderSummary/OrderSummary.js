import React, {Component} from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
 componentWillUpdate(){
     console.log('[OrderSummary]')
 }

render(){

    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      });


    return (
        <Aux>
          <h3>Your order summary</h3>
          <p>All ingredients</p>
          <ul>{ingredientSummary}</ul>
          <p>
            <strong>Final price: </strong> {this.props.finalPrice.toFixed(2)}
          </p>
          <p>Continue to checkout?</p>
          <Button btnType="Danger" clicked={this.props.purchaseCancel}>
            Cancel
          </Button>
          <Button btnType="Success" clicked={this.props.purchaseContinue}>
            Continue
          </Button>
        </Aux>
      );
}
};

export default OrderSummary;

import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    console.log(this.props.ingredients);

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
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(r => {
        this.setState({ loading: false });
        console.log(r);
      });
    console.log("post orderds to firebase");
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="name" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div>
        <h4>Enter data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;

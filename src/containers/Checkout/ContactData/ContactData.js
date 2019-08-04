import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayName: "DHL Express" },
            { value: "cheapest", displayName: "Normal Delivery" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    console.log("[ContactData.js]", this.props.ingredients);
    this.setState({ loading: true });

    const formData = {};

    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
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

  inputValidation = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChangeHandler = (event, inputIdentifier) => {
    console.log(event.target.value);

    // clone all form elements
    const updatedOrderForm = { ...this.state.orderForm };

    // clone single input element
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    // get form input
    updatedFormElement.value = event.target.value;

    // update elemet of form in the state
    updatedFormElement.valid = this.inputValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;

    console.log(updatedOrderForm[inputIdentifier]);

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    // Check if the whole form is valid before submitting
    let formIsValid = true;

    for (let inputIdentifier in updatedFormElement) {
      formIsValid = updatedFormElement[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(el => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            invalid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
            changed={event => this.inputChangeHandler(event, el.id)}
          />
        ))}

        <Button btnType="Success" disabled={!this.state.formIsValid}>
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

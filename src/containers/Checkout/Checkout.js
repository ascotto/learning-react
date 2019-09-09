import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummray";
import { Route, Redirect } from "react-router-dom";
import CheckoutData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";

const Checkout = props => {
  const checkoutCancelHandler = () => {
    props.history.goBack();
  };

  const checkoutContinueHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  let purchaseRedirect = null;

  if (props.ings) {
    purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;
  }

  console.log("Purchase state", props.purchased);
  console.log("Purchase state", purchaseRedirect);

  if (props.ings) {
    summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancel={checkoutCancelHandler}
          checkoutContinue={checkoutContinueHandler}
        />

        <Route
          path={props.match.path + "/contact-data"}
          component={CheckoutData}
        />
      </div>
    );
  }

  return (
    <div>
      {summary}
      Contact Data
    </div>
  );
};

const mapsStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};

export default connect(mapsStateToProps)(Checkout);

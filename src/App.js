import React, { useEffect, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
//import Checkout from "./containers/Checkout/Checkout";
//import Orders from "./containers/Orders/Orders";
//import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

// Lazy Components
//import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

const Orders = React.lazy(() => import("./containers/Orders/Orders"));

const Auth = React.lazy(() => import("./containers/Auth/Auth"));

const App = props => {
  const { onTryAutoSingup } = props;

  useEffect(() => {
    onTryAutoSingup();
  }, [onTryAutoSingup]);

  let routes = (
    <Switch>
      <Route path="/login" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading..</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onTryAutoSingup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchtoProps
  )(App)
);

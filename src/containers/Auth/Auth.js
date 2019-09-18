import React, { useState, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject, inputValidation } from "../../shared/utility";

const Auth = props => {
  const [isSignup, setIsSignUp] = useState(false);
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your email address"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: inputValidation(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true
      })
    });

    setControls(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignup);
  };

  const formElements = [];
  for (let key in controls) {
    formElements.push({
      id: key,
      config: controls[key]
    });
  }

  let form = formElements.map(el => (
    <Input
      key={el.id}
      elementType={el.config.elementType}
      elementConfig={el.config.elementConfig}
      value={el.config.value}
      invalid={!el.config.valid}
      shouldValidate={el.config.validation}
      touched={el.config.touched}
      changed={event => inputChangeHandler(event, el.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  //alert(JSON.stringify(props));
  console.log(props);

  let errorMessage = null;

  if (props.error) {
    errorMessage = props.error.message;
    //alert(JSON.stringify(props.error.message));
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success"> Login</Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        Switch to {isSignup ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.authAsync(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

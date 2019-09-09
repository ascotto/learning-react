import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });

    const resInterceptor = axios.interceptors.response.use(
      res => res,
      errorMsg => {
        setError(errorMsg);
      }
    );

    // useEffect written with a return statement
    // will act as componentWillUnmount
    // in hooks it's a "cleanup function"
    // when we want to cleanup, we have to add the arguments that are going to change
    useEffect(() => {
      return () => {
        // cancelling ajax multiple calls
        console.log("Will unmount", reqInterceptor, resInterceptor);
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;

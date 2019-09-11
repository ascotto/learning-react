import { useState, useEffect } from "react";

export default httpClient => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
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
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};

import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isAuthenticated } from '../Validators/AuthValidator'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated()) {
        return <Component {...props} />
      } else {
        return <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
      }
    }}
  />
);

export default PrivateRoute;

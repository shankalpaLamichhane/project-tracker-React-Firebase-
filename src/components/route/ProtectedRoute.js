import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProtectedRoute = ({
    component: Component,
    auth,
    ...rest
  }) => {

      let isAuth = auth.uid ? true : false;
      return <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
}

ProtectedRoute.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.firebase.auth
  });
  
  export default connect(mapStateToProps,null)(ProtectedRoute);
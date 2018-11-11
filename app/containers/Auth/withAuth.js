import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Loader from 'components/Loader';

import { makeSelectUserData } from './selectors';

/* eslint-disable react/prefer-stateless-function */
const withAuth = ChildrenView => {
  class Auth extends React.Component {
    static propTypes = {
      userData: PropTypes.object.isRequired,
    };

    render() {
      const { userData } = this.props;
      if (userData.status === 'PENDING') {
        return <Loader />;
      }
      return (
        <ChildrenView
          {...this.props}
          isAuthenticated={userData.status === 'AUTHORIZED'}
        />
      );
    }
  }

  const mapStateToProps = createStructuredSelector({
    userData: makeSelectUserData(),
  });

  return connect(mapStateToProps)(Auth);
};

export default withAuth;

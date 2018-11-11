import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Redux
import { logout } from './actions';

class Logout extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    this.props.logout();
  };

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(
  null,
  mapDispatchToProps,
)(Logout);

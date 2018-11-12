import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Loader from 'components/Loader';

// Redux
import { logout } from './actions';

class Logout extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    this.logout();
  };

  logout = async () => {
    await this.props.logout();
    setTimeout(() => {
      this.props.history.push('/');
    }, 2000);
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Cerrando sesión... | Rutas por Colombia</title>
        </Helmet>
        <Loader text="Cerrando sesión..." />
      </div>
    );
  }
}

const mapDispatchToProps = {
  logout,
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(Logout),
);

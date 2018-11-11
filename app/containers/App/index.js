/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

import { LoginPage, Logout } from 'containers/Auth/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Redux
import { checkSession } from '../Auth/actions';

class App extends React.Component {
  static propTypes = {
    checkSession: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    this.props.checkSession();
  };

  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <Switch location={location}>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/logout" component={Logout} />
                <Route component={NotFoundPage} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

const mapDispatchToProps = {
  checkSession,
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(App),
);

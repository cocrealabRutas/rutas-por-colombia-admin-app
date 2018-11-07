/**
 *
 * ComponentLoader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

// Custom Loader
import Loader from 'components/Loader';

const ComponentLoader = ({ Component, loading, ownProps }) => (
  <div>
    <CSSTransition
      in={loading}
      timeout={300}
      classNames="fade"
      mountOnEnter
      unmountOnExit
    >
      <Loader />
    </CSSTransition>
    {!loading && <Component {...ownProps} />}
  </div>
);

ComponentLoader.defaultProps = {
  Component: null,
};

ComponentLoader.propTypes = {
  Component: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  ownProps: PropTypes.object.isRequired,
};

export default ComponentLoader;

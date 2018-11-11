/**
 *
 * Asynchronously loads the component for Auth
 *
 */

import React from 'react';
import loadable from 'loadable-components';

// Custom Loader
import ComponentLoader from 'components/ComponentLoader';

export const LoginPage = loadable(() => import('./LoginPage'), {
  render: props => <ComponentLoader {...props} />,
});

export const Logout = loadable(() => import('./Logout'), {
  render: props => <ComponentLoader {...props} />,
});

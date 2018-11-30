/**
 *
 * Asynchronously loads the component for TouristAttractionsEntity
 *
 */

import React from 'react';
import loadable from 'loadable-components';

// Custom Loader
import ComponentLoader from 'components/ComponentLoader';

export const TouristAttractionsList = loadable(
  () => import('./TouristAttractionsList'),
  {
    render: props => <ComponentLoader {...props} />,
  },
);

export const TouristAttractionForm = loadable(
  () => import('./TouristAttractionForm'),
  {
    render: props => <ComponentLoader {...props} />,
  },
);

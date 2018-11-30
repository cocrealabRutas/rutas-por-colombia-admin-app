/**
 *
 * TouristAttractionsList
 *
 */

import React from 'react';

// Semantic
import { Segment, Header } from 'semantic-ui-react';

// Components
import EntityTable from 'components/EntityTable';

/* eslint-disable react/prefer-stateless-function */
class TouristAttractionsList extends React.PureComponent {
  render() {
    const columns = [
      {
        title: 'Initials',
        dataIndex: 'initials',
        render: initials => <span>{initials}</span>,
      },
      {
        title: 'City',
        dataIndex: 'city',
        render: city => <span>{city}</span>,
      },
    ];
    return (
      <div>
        <Segment basic textAlign="center">
          <Header as="h2">Tourist Attractions list</Header>
        </Segment>
        <EntityTable
          columns={columns}
          entityType="touristAttraction"
          entityPath="touristAttraction"
        />
      </div>
    );
  }
}

export default TouristAttractionsList;

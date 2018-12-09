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
        title: 'Nombre',
        dataIndex: 'name',
        render: name => <span>{name}</span>,
      },
      {
        title: 'Descripción',
        dataIndex: 'description',
        render: description => <span>{description}</span>,
      },
    ];
    return (
      <div>
        <Segment basic textAlign="center">
          <Header as="h2">Listado de sitios turísticos</Header>
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

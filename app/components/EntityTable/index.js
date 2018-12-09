/**
 *
 * EntityTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Antd
import Spin from 'antd/lib/spin';
import Button from 'antd/lib/button';

// Semantic
import { Segment, Dimmer } from 'semantic-ui-react';

// Components
import withEntityCollectionBasicOperations from 'components/EntityCollectionBasicOperations';
import TableWithActions from './TableWithActions';

/* eslint-disable react/prefer-stateless-function */
class EntityTable extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    entityType: PropTypes.string.isRequired,
    rowLoading: PropTypes.object.isRequired,
    deleteRow: PropTypes.func.isRequired,
  };

  render() {
    const { loading, data, rowLoading, entityType, columns } = this.props;
    return (
      <Dimmer.Dimmable dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Spin size="large" />
        </Dimmer>
        <Segment basic textAlign="right">
          <Button type="primary" size="large">
            <Link to={`/${entityType}/new`}>Add New</Link>
          </Button>
        </Segment>
        <TableWithActions
          data={data}
          columns={columns}
          rowLoading={rowLoading}
          deleteRow={this.props.deleteRow}
          entityType={entityType}
        />
      </Dimmer.Dimmable>
    );
  }
}

export default withEntityCollectionBasicOperations(EntityTable);

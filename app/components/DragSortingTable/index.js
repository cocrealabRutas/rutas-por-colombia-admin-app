/**
 *
 * DragSortingTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import memoize from 'memoizee';

// Antd
import Spin from 'antd/lib/spin';
import Popconfirm from 'antd/lib/popconfirm';
import AntdIcon from 'antd/lib/icon';
import Divider from 'antd/lib/divider';

// Semantic
import { Icon } from 'semantic-ui-react';

// Components
import DragableBodyRowComponent from './DragableBodyRow';

const DragableBodyRow = styled(DragableBodyRowComponent)`
  &.drop-over-downward td {
    border-bottom: 2px dashed ${props => props.theme.primaryColor};
  }

  &.drop-over-upward td {
    border-top: 2px dashed ${props => props.theme.primaryColor};
  }
`;

const antIcon = <AntdIcon type="loading" spin />;

class DragSortingTable extends React.Component {
  static defaultProps = {
    onMoveRow: () => {},
    deleteRow: () => {},
  };

  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onMoveRow: PropTypes.func,
    deleteRow: PropTypes.func,
    rowLoading: PropTypes.object.isRequired,
    entityType: PropTypes.string.isRequired,
  };

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.props;
    const dragRow = data[dragIndex];
    const newState = update(this.props, {
      data: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
      },
    });
    this.props.onMoveRow(newState.data);
  };

  actionsColumn = memoize((columns, rowLoading, entityType) => {
    const counterColumn = {
      title: 'Order',
      key: 'order',
      render: (text, record, index) => <span>{index + 1}</span>,
    };
    const columsWithCounter = update(columns, {
      $splice: [[0, 0, counterColumn]],
    });
    const actionsColumn = {
      title: '',
      align: 'right',
      dataIndex: 'id',
      render: id => {
        if (rowLoading.loading && rowLoading.id === id) {
          return <Spin indicator={antIcon} />;
        }
        return (
          <span>
            <Link to={`/${entityType}/edit/${id}`}>
              <Icon name="edit outline" />
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              title="¿Estás seguro que deseas eliminar esta fila?"
              onConfirm={() => this.props.deleteRow(id)}
              onCancel={() => {}}
              okText="Sí"
              cancelText="No"
            >
              <Icon
                name="trash alternate outline"
                className="pointer"
                color="red"
              />
            </Popconfirm>
          </span>
        );
      },
    };
    return update(columsWithCounter, { $push: [actionsColumn] });
  });

  render() {
    const { data, columns, rowLoading, entityType } = this.props;
    const derivedColumns = this.actionsColumn(columns, rowLoading, entityType);
    return (
      <Table
        rowKey="id"
        columns={derivedColumns}
        dataSource={data}
        components={this.components}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow,
        })}
        pagination={false}
      />
    );
  }
}

export default DragDropContext(HTML5Backend)(DragSortingTable);

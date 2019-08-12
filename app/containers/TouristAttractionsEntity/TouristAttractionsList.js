/**
 *
 * TouristAttractionsList
 *
 */

import React from 'react';
import Highlighter from 'react-highlight-words';

import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';

// Semantic
import { Segment, Header } from 'semantic-ui-react';

// Components
import EntityTable from 'components/EntityTable';

/* eslint-disable react/prefer-stateless-function */
class TouristAttractionsList extends React.PureComponent {
  state = {
    searchText: '',
  };

  getColumnSearchProps = (dataIndex, fieldName) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Buscar ${fieldName}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Buscar
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Borrar
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'name',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        },
        sortDirections: ['ascend', 'descend'],
        ...this.getColumnSearchProps('name', 'Nombre'),
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

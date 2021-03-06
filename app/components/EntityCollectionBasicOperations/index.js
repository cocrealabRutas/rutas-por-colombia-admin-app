/**
 *
 * EntityCollectionBasicOperations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import api from 'config/axiosInstance';
import axios from 'axios';

// Antd
import message from 'antd/lib/message';

// Components
import { withAuth } from 'containers/Auth';

const withEntityCollectionBasicOperations = WrappedComponent => {
  class EntityCollectionBasicOperations extends React.Component {
    constructor(props) {
      super(props);
      this.cancelTokenSource = axios.CancelToken.source();
    }

    state = {
      loading: true,
      data: [],
      rowLoading: {
        id: '',
        loading: false,
      },
    };

    componentDidMount = () => {
      this.fetchData();
    };

    componentWillUnmount() {
      this.cancelTokenSource.cancel();
    }

    fetchData = async () => {
      this.setState({ loading: true });
      try {
        const response = await api.get(`/entity/${this.props.entityPath}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          cancelToken: this.cancelTokenSource.token,
        });
        const data = response.data.map(item => ({
          ...item,
          // eslint-disable-next-line no-underscore-dangle
          id: item._id,
        }));
        this.setState({ data, loading: false });
      } catch (error) {
        if (!axios.isCancel(error)) {
          this.setState({ loading: false });
          message.error('Error loading de data. Please reload the page', 5);
          throw error;
        }
      }
    };

    deleteRow = async id => {
      const { data } = this.state;
      this.setState({
        rowLoading: {
          id,
          loading: true,
        },
      });
      try {
        await api.delete(`/entity/${this.props.entityPath}/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.userData.session.token}`,
          },
        });
        const newState = data.filter(record => record.id !== id);
        this.setState({ data: newState });
        message.success('Data deleted successfully');
      } catch (error) {
        message.error(error.response.data.message, 4);
        throw error;
      } finally {
        this.setState({
          rowLoading: {
            id,
            loading: false,
          },
        });
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          updateCollection={this.updateCollection}
          deleteRow={this.deleteRow}
        />
      );
    }
  }

  EntityCollectionBasicOperations.propTypes = {
    entityPath: PropTypes.string.isRequired,
    userData: PropTypes.object.isRequired,
  };

  return withAuth(EntityCollectionBasicOperations);
};

withEntityCollectionBasicOperations.propTypes = {
  entityPath: PropTypes.string.isRequired,
};

export default withEntityCollectionBasicOperations;

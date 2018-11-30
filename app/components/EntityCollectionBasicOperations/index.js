/**
 *
 * EntityCollectionBasicOperations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Antd
import message from 'antd/lib/message';

// Components
import { Auth } from 'containers/Auth';

// Constants
import { API_URL } from '../../constants';

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
        const { data } = await axios.get(
          `${API_URL}entity/${this.props.entityPath}/collection`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            cancelToken: this.cancelTokenSource.token,
          },
        );
        this.setState({ data, loading: false });
      } catch (error) {
        if (!axios.isCancel(error)) {
          this.setState({ loading: false });
          message.error('Error loading de data. Please reload the page', 5);
          throw error;
        }
      }
    };

    updateCollection = async data => {
      this.setState({ loading: true });
      try {
        await axios.put(
          `${API_URL}entity/${this.props.entityPath}/collection`,
          {
            data,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${
                this.props.userData.session.token.idToken.jwtToken
              }`,
            },
            cancelToken: this.cancelTokenSource.token,
          },
        );
        message.success('Data saved successfully');
        this.setState({ data, loading: false });
      } catch (error) {
        if (!axios.isCancel(error)) {
          this.setState({ loading: false });
          message.error(error.response.data.message, 4);
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
        await axios.delete(
          `${API_URL}entity/${this.props.entityPath}/collection/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${
                this.props.userData.session.token.idToken.jwtToken
              }`,
            },
          },
        );
        const newState = data.filter(record => record.id !== id);
        this.setState({ data: newState });
        message.success('Data deleted successfully');
      } catch (error) {
        console.log(error.response);
        message.error(error.response.data.message, 4);
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

  return Auth(EntityCollectionBasicOperations);
};

withEntityCollectionBasicOperations.propTypes = {
  entityPath: PropTypes.string.isRequired,
};

export default withEntityCollectionBasicOperations;

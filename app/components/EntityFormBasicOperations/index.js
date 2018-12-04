/**
 *
 * EntityFormBasicOperations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import isEmpty from 'lodash/isEmpty';
import api from 'config/axiosInstance';
import axios from 'axios';

// Antd
import message from 'antd/lib/message';
import Skeleton from 'antd/lib/skeleton';

// Components
import { withAuth } from 'containers/Auth';

const withEntityFormBasicOperations = WrappedComponent => {
  class EntityFormBasicOperations extends React.Component {
    static propTypes = {
      entityPath: PropTypes.string.isRequired,
      match: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      const { entityPath, match } = props;
      this.entityPath = entityPath;
      this.cancelTokenSource = axios.CancelToken.source();
      if (!isEmpty(match.params.action) && match.params.action === 'edit') {
        this.entityPath = `${entityPath}/${match.params.id}`;
      }
    }

    state = {
      loading: true,
      status: 'PENDING',
      data: {},
    };

    componentDidMount = () => {
      const { match } = this.props;
      if (isEmpty(match.params.action) || match.params.action === 'edit') {
        this.fetchData();
      } else {
        this.setState({ loading: false, status: 'SUCCESS' });
      }
    };

    componentWillUnmount() {
      this.cancelTokenSource.cancel();
    }

    fetchData = async () => {
      this.setState({ loading: true });
      try {
        const { data } = await api.get(`/entity/${this.entityPath}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          cancelToken: this.cancelTokenSource.token,
        });
        this.setState({ data });
        setTimeout(() => {
          this.setState({ loading: false, status: 'SUCCESS' });
        }, 1000);
      } catch (error) {
        if (!api.isCancel(error)) {
          message.error('Error loading de data. Please reload the page', 5);
          this.setState({ loading: false, status: 'FAIL' });
          throw error;
        }
      }
    };

    submitData = async data => {
      this.setState({ loading: true });
      const { match } = this.props;
      try {
        let method = 'put';
        if (!isEmpty(match.params.action) && match.params.action === 'new') {
          method = 'post';
        }
        await api[method](
          `/entity/${this.entityPath}`,
          {
            ...data,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.props.userData.session.token}`,
            },
            cancelToken: this.cancelTokenSource.token,
          },
        );
        this.setState({ loading: false });
        message.success('Data saved successfully');
        this.props.history.push(`/${this.entityPath.split('/')[0]}`);
      } catch (error) {
        if (!api.isCancel(error)) {
          message.error(error.response.data.message, 4);
          this.setState({ loading: false });
          throw error;
        }
      }
    };

    render() {
      const { match } = this.props;
      const { status } = this.state;
      if (status === 'PENDING') {
        return (
          <div>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        );
      }
      if (status === 'SUCCESS') {
        return (
          <WrappedComponent
            {...this.props}
            {...this.state}
            submitData={this.submitData}
            action={
              !isEmpty(match.params.action)
                ? match.params.action.charAt(0).toUpperCase() +
                  match.params.action.slice(1)
                : 'Edit'
            }
          />
        );
      }
      return [];
    }
  }

  const enhance = compose(
    withRouter,
    withAuth,
  );

  return enhance(EntityFormBasicOperations);
};

export default withEntityFormBasicOperations;

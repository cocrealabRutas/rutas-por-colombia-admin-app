/**
 *
 * ImagesUploader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import memoize from 'memoizee';
import api from 'config/axiosInstance';
import axios from 'axios';

// Antd
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';

// Semantic
import { Segment } from 'semantic-ui-react';

// Components
import { withAuth } from 'containers/Auth';

/* eslint-disable react/prefer-stateless-function */
class MultipleImageUploader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cancelTokenSource = axios.CancelToken.source();
  }

  state = {
    loading: false,
    previewVisible: false,
    previewImage: '',
  };

  handlePreview = value => {
    this.setState({
      previewImage: value.url,
      previewVisible: true,
    });
  };

  derivedData = memoize(value => {
    if (!isEmpty(value) && Array.isArray(value)) {
      return value.map(item => ({
        ...item,
        url: item.path,
        uid: item.key,
      }));
    }
    return [];
  });

  onChange = async info => {
    const { file } = info;
    if (file.status === 'removed') {
      return null;
    }
    const data = new FormData();
    data.append('image', file);
    this.setState({ loading: true });
    try {
      const {
        data: { key, url: path },
      } = await api.put('/files/image', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.props.userData.session.token}`,
        },
        cancelToken: this.cancelTokenSource.token,
      });
      const newValue = [
        ...this.props.value,
        {
          key,
          path,
        },
      ];
      this.props.onChange(newValue);
    } catch (error) {
      message.error(
        'Error al intentar subir la imagen. Por favor intenta nuevamente.',
        4,
      );
      throw error;
    } finally {
      this.setState({ loading: false });
    }

    return null;
  };

  onRemove = async ({ key }) => {
    this.setState({ loading: true });
    try {
      await api.delete(`/files/image/delete?id=${key}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.userData.session.token}`,
        },
        cancelToken: this.cancelTokenSource.token,
      });
      const newValue = this.props.value.filter(item => item.key !== key);
      this.props.onChange(newValue);
    } catch (error) {
      if (error.response.status && error.response.status === 404) {
        const newValue = this.props.value.filter(item => item.key !== key);
        this.props.onChange(newValue);
      } else {
        message.error(
          'Error borrando la imagen. Por favor intenta nuevamente.',
          4,
        );
        throw error;
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const { loading, previewVisible, previewImage } = this.state;
    const { value } = this.props;
    const derivedData = this.derivedData(value);
    const avatar = () => {
      if (!loading) {
        return (
          <div>
            <Icon type="upload" />
            <div className="ant-upload-text">Subir</div>
          </div>
        );
      }
      return <Icon type="loading" />;
    };
    return (
      <Segment basic>
        <Upload
          name="avatar"
          listType="picture-card"
          fileList={derivedData}
          action={null}
          beforeUpload={() => false}
          onChange={this.onChange}
          onRemove={this.onRemove}
          onPreview={this.handlePreview}
          accept="image/gif,image/jpeg,image/png"
        >
          {avatar()}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          width="80%"
          style={{ maxWidth: '1200px' }}
        >
          <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Segment>
    );
  }
}
MultipleImageUploader.defaultProps = {
  onChange: () => {},
};

MultipleImageUploader.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  userData: PropTypes.object.isRequired,
};

export default withAuth(MultipleImageUploader);

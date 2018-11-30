/**
 *
 * ImagesUploader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';
import isEmpty from 'lodash/isEmpty';
import memoize from 'memoizee';

// Antd
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';

// Semantic
import { Segment } from 'semantic-ui-react';

// Constants
import { S3_URL } from 'constants.js';

/* eslint-disable react/prefer-stateless-function */
class MultipleImageUploader extends React.PureComponent {
  static defaultProps = {
    onChange: () => {},
  };

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
  };

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
      return value.map(item => ({ ...item, uid: item.key }));
    }
    return [];
  });

  onChange = async info => {
    const { file } = info;
    this.setState({ loading: true });
    try {
      const { key } = await Storage.put(`${Date.now()}.${file.name}`, file, {
        contentType: file.type,
      });
      const newValue = [
        ...this.props.value,
        {
          key,
          url: `${S3_URL}public/${key}`,
        },
      ];
      this.props.onChange(newValue);
    } catch (error) {
      message.error('Error trying to upload the image. Please, try again', 4);
      throw error;
    } finally {
      this.setState({ loading: false });
    }
  };

  onRemove = async ({ key }) => {
    this.setState({ loading: true });
    try {
      await Storage.remove(key);
      const newValue = this.props.value.filter(item => item.key !== key);
      this.props.onChange(newValue);
    } catch (error) {
      message.error('Error deleting image. Try again', 4);
      throw error;
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
            <div className="ant-upload-text">Upload</div>
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
          className="avatar-uploader"
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

export default MultipleImageUploader;

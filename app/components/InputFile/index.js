/**
 *
 * InputFile
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Ant
import Icon from 'antd/lib/icon';
import Upload from 'antd/lib/upload';
import Spin from 'antd/lib/spin';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';

const { Dragger } = Upload;

class InputFile extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    format: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    draggerZoneText: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onUpload: PropTypes.func,
    size: PropTypes.number.isRequired,
  };

  state = {
    file: null,
    fileList: [],
  };

  onChange = ({ file }) => {
    if (file) {
      if (file.size > this.props.size * 1024 * 1024) {
        message.error('El archivo excede el límite de peso');
      } else {
        this.setState({ file, fileList: [file] });
      }
    }
  };

  onUploadButtonPressed = e => {
    e.preventDefault();
    const { file } = this.state;
    this.props.onUpload(file);
  };

  render() {
    const { text, buttonText, draggerZoneText, loading } = this.props;
    const { file, fileList } = this.state;

    const inputProps = {
      name: 'file',
      action: null,
      beforeUpload() {
        return false;
      },
      multiple: false,
      onChange: this.onChange,
      accept: this.props.format,
      fileList,
      onRemove: null,
    };
    return (
      <div>
        {!loading ? (
          <Dragger {...inputProps}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">{draggerZoneText}</p>
            <p className="ant-upload-hint">{text}</p>
          </Dragger>
        ) : (
          <div
            style={{
              textAlign: 'center',
              width: '100%',
              height: '100%',
              position: 'relative',
              padding: '16px 0',
              display: 'table',
            }}
          >
            <Spin
              size="large"
              style={{
                display: 'table-cell',
                verticalAlign: 'middle',
              }}
            />
          </div>
        )}
        {file && (
          <div>
            <div style={{ width: '100%', textAlign: 'center', padding: '1em' }}>
              <Button
                size="large"
                type="primary"
                onClick={this.onUploadButtonPressed}
                style={{ marginRight: 10 }}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default InputFile;

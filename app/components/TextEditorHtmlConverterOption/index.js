/**
 *
 * TextEditorHtmlConverterOption
 *
 */

import React, { Component } from 'react';

// Ant
import Modal from 'antd/lib/modal';
import { TextArea } from 'antd/lib/input';

// Components
import HtmlConverter from './HtmlConverter';

const withTextEditorHtmlConverterOption = WrappedComponent =>
  class extEditorHtmlConverterOption extends Component {
    constructor(props) {
      super(props);
      this.hrmlConverter = null;
    }

    state = {
      visible: false,
      value: '',
    };

    onChange = e => {
      this.setState({ value: e.target.value });
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    handleOk = () => {
      this.htmlConverter.AddHtmlCode();
    };

    closeModal = () => {
      this.setState({
        visible: false,
      });
    };

    render() {
      const { value, visible } = this.state;
      return (
        <div>
          <WrappedComponent
            {...this.props}
            htmlConverter={
              <HtmlConverter
                ref={element => {
                  this.htmlConverter = element;
                }}
                showModal={this.showModal}
                closeModal={this.closeModal}
                htmlValue={value}
              />
            }
          />
          <Modal
            title="Insert your HTML Code"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.closeModal}
            width="80%"
          >
            <TextArea rows={16} value={value} onChange={this.onChange} />
          </Modal>
        </div>
      );
    }
  };

export default withTextEditorHtmlConverterOption;

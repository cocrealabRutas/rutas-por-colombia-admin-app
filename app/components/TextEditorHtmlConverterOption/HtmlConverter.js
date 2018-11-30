/**
 *
 * HtmlConverter
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

// Ant
import Button from 'antd/lib/button';

class HtmlConverter extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
    htmlValue: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  AddHtmlCode = () => {
    const { editorState, onChange, htmlValue } = this.props;
    const blocksFromHtml = htmlToDraft(htmlValue);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentStateWithHtml = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap,
    );
    const contentState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      contentStateWithHtml.getBlockMap(),
    );

    onChange(EditorState.push(editorState, contentState, 'insert-fragment'));
    this.props.closeModal();
  };

  render() {
    return <Button shape="circle" icon="code" onClick={this.props.showModal} />;
  }
}

export default HtmlConverter;

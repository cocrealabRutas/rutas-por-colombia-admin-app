/**
 *
 * TextEditor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import memoize from 'memoizee';
// import styled from 'styled-components';

// Draft
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// Semantic
import { Segment } from 'semantic-ui-react';

// Components
import Editor from 'components/TextEditorWithHtmlConverter';

/* eslint-disable react/prefer-stateless-function */
class TextEditor extends React.PureComponent {
  static defaultProps = {
    onChange: () => {},
  };

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const { value } = this.props;
    const editorState = this.derivedData(value);
    this.state = {
      editorState,
    };
  }

  onEditorStateChange = editorState => {
    this.setState({ editorState });
    this.props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    );
  };

  prepareData = memoize(
    data => {
      if (typeof data === 'string') {
        const blocksFromHtml = htmlToDraft(data);
        const { contentBlocks } = blocksFromHtml;
        const { entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap,
        );
        return EditorState.createWithContent(contentState);
      }
      return data;
    },
    { profileName: 'Transform data' },
  );

  derivedData = memoize(value => {
    let stateValue = {};
    if (isEmpty(value)) {
      stateValue = EditorState.createEmpty();
    } else {
      stateValue = this.prepareData(value);
    }
    return stateValue;
  });

  renderInputs = () => {
    const { editorState } = this.state;
    return (
      <Segment basic>
        <Editor
          editorState={editorState}
          wrapperClassName="text-editor-wrapper"
          editorClassName="text-editor"
          onEditorStateChange={editorSubState => {
            this.onEditorStateChange(editorSubState);
          }}
        />
      </Segment>
    );
  };

  render() {
    return <div>{this.renderInputs()}</div>;
  }
}

export default TextEditor;

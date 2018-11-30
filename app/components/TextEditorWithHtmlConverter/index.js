/**
 *
 * TextEditorWithHtmlConverter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';

// Components
import withTextEditorHtmlConverterOption from 'components/TextEditorHtmlConverterOption';

const TextEditorWithHtmlConverter = props => (
  <Editor {...props} toolbarCustomButtons={[props.htmlConverter]} />
);

TextEditorWithHtmlConverter.propTypes = {
  htmlConverter: PropTypes.any.isRequired,
};

export default withTextEditorHtmlConverterOption(TextEditorWithHtmlConverter);

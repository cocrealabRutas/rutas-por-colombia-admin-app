/**
 *
 * Loader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Semantic
import { Header } from 'semantic-ui-react';

// Ant
import Spin from 'antd/lib/spin';
import Icon from 'antd/lib/icon';

const Container = styled.div`
  position: fixed !important;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background-color: white;
`;

const SpinIcon = styled(Icon)`
  font-size: 64px;
  width: 64px;
  height: 64px;
`;

const antIcon = <SpinIcon type="loading" spin />;

const Loader = ({ text }) => (
  <Container>
    <Spin indicator={antIcon} />
    {text && <Header as="h4">{text}</Header>}
  </Container>
);

Loader.defaultProps = {
  text: null,
};

Loader.propTypes = {
  text: PropTypes.string,
};

export default Loader;

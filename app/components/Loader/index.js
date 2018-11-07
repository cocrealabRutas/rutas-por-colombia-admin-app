/**
 *
 * Loader
 *
 */

import React from 'react';
import styled from 'styled-components';

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

const antIcon = <Icon type="loading" style={{ fontSize: 64 }} spin />;

const Loader = () => (
  <Container>
    <Spin indicator={antIcon} />
  </Container>
);

export default Loader;

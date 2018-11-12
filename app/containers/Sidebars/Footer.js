import React from 'react';

// Semantic
import { Header } from 'semantic-ui-react';

// Antd
import Layout from 'antd/lib/layout';

const { Footer } = Layout;

const FooterComponent = () => (
  <Footer style={{ textAlign: 'center' }}>
    <Header as="h6">©2018 MinTIC. Todos los derechos reservados.</Header>
  </Footer>
);

export default FooterComponent;

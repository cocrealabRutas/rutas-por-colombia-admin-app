import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

// Antd
import Layout from 'antd/lib/layout';

// Pages
import HomePage from '../HomePage/Loadable';

// Components
import { Header, Sidebar, Footer } from '../Sidebars';

const { Content: ContentLayout } = Layout;

const Content = styled(ContentLayout)`
  background: #fff;
  padding: 24px;
  margin: 24px 16px;
  min-height: 280px;
`;

const Dashboard = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sidebar />
    <Layout>
      <Header />
      <Content>
        <Route exact path="/" component={HomePage} />
      </Content>
      <Footer />
    </Layout>
  </Layout>
);

export default Dashboard;

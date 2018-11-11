import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

// Antd
import AntdLayout from 'antd/lib/layout';

// Pages
import HomePage from '../HomePage/Loadable';

const { Content: ContentLayout } = AntdLayout;

const Layout = styled(AntdLayout)`
  background-color: ${props => props.theme.grey};
`;

const Content = styled(ContentLayout)`
  background: #fff;
  padding: 24px;
  margin: 24px 16px;
  min-height: 280px;
`;

const Dashboard = () => (
  <AntdLayout style={{ minHeight: '100vh', backgroundColor: '#FFF' }}>
    <Layout>
      <Content>
        <Route exact path="/" component={HomePage} />
      </Content>
    </Layout>
  </AntdLayout>
);

export default Dashboard;

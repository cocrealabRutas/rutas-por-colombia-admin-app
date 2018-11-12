import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
  <div>
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content>
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames="fade-page"
                  timeout={300}
                >
                  <Switch location={location}>
                    <Route exact path="/" component={HomePage} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  </div>
);

export default Dashboard;

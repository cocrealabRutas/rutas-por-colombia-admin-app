import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

// Antd
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

// Images
import logo from 'images/logo-inverted.svg';

// Styles
import { LogoContainer, Logo } from './styles';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends Component {
  state = { collapsed: false };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { location } = this.props;
    const selectedKeys = [location.pathname.split('/')[1]];
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
      >
        <LogoContainer>
          <Logo src={logo} />
        </LogoContainer>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          mode="inline"
          style={{ padding: '2em 0' }}
        >
          <SubMenu
            title={
              <span>
                <Icon type="upload" />
                <span>Carga masiva</span>
              </span>
            }
          >
            <Menu.Item key="tolls-upload">
              <span>
                <NavLink to="/tolls-upload" className="item">
                  Cargar peajes
                </NavLink>
              </span>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="touristAttraction">
            <NavLink to="/touristAttraction" className="item">
              <span>
                <Icon type="flag" />
                <span>Sitios turísticos</span>
              </span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

SideBar.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(SideBar);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

// Antd
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

// Images
import logo from 'images/logo-inverted.svg';
import icon from 'images/icon.svg';

// Styles
import theme from 'themes/Project/abstracts/theme.variables';
import { LogoContainer, Logo, MobileLogo } from './styles';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends Component {
  state = { collapsed: false };

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    );
    if (vw < theme.breakpoints.medium) {
      this.setState({ collapsed: true });
    } else {
      this.setState({ collapsed: false });
    }
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { location } = this.props;
    const selectedKeys = [location.pathname.split('/')[1]];
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <LogoContainer>
          {collapsed ? <MobileLogo src={icon} /> : <Logo src={logo} />}
        </LogoContainer>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          mode="inline"
          style={{ padding: '2em 0' }}
        >
          <SubMenu
            key="bulk-upload"
            title={
              <span>
                <Icon type="upload" />
                <span>Carga masiva</span>
              </span>
            }
          >
            <Menu.Item key="tolls-upload">
              <NavLink to="/tolls-upload" className="item">
                <span>Cargar peajes</span>
              </NavLink>
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

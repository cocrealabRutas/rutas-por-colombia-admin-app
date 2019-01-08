import React from 'react';
import { Link } from 'react-router-dom';

// Antd
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';

// Styles
import {
  Header,
  Avatar,
  MenuItemHeader as MenuItem,
  HeaderMenu,
} from './styles';

const MainHeader = () => (
  <Header>
    <HeaderMenu mode="horizontal" theme="dark">
      <MenuItem>
        <Dropdown
          placement="bottomRight"
          overlay={
            <HeaderMenu>
              <HeaderMenu.Item>
                <Icon type="logout" />
                <span>
                  <Link to="/logout">Cerrar Sesión</Link>
                </span>
              </HeaderMenu.Item>
            </HeaderMenu>
          }
          trigger={['click']}
        >
          <Avatar shape="square" size="large" icon="user" />
        </Dropdown>
      </MenuItem>
    </HeaderMenu>
  </Header>
);

export default MainHeader;

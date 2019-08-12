import React, { useState, useEffect, useRef } from 'react';
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

const MainHeader = () => {
  const menuRef = useRef(null);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = event => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setSelectedKeys([]);
    }
  };

  const onClickMenu = ({ key }) => {
    setSelectedKeys([key]);
  };

  return (
    <Header>
      <HeaderMenu
        mode="horizontal"
        theme="dark"
        selectedKeys={selectedKeys}
        onClick={onClickMenu}
      >
        <MenuItem key="logout">
          <span ref={menuRef}>
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
          </span>
        </MenuItem>
      </HeaderMenu>
    </Header>
  );
};

export default MainHeader;

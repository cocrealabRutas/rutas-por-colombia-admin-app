import styled from 'styled-components';

// Antd
import Layout from 'antd/lib/layout';
import AntdAvatar from 'antd/lib/avatar';
import Menu from 'antd/lib/menu';

const { Header: AntdHeader } = Layout;

const LogoContainer = styled.div`
  height: 64px;
  position: relative;
  line-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  overflow: hidden;
`;

const Logo = styled.img`
  display: inline-block;
  vertical-align: middle;
  width: 120px;
`;

const Header = styled(AntdHeader)`
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Avatar = styled(AntdAvatar)`
  & .anticon {
    margin: 0;
    font-size: 100% !important;
    margin: auto;
    color: white;
  }
  border-radius: 0;
  position: relative;
  height: 100% !important;
  width: 100% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const MenuItemHeader = styled(Menu.Item)`
  width: 64px;
  padding: 0 !important;
  margin: 2px 0 !important;
  height: 64px !important;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
`;

const HeaderMenu = styled(Menu)`
  line-height: 64px;
`;

export { LogoContainer, Logo, Header, Avatar, HeaderMenu, MenuItemHeader };

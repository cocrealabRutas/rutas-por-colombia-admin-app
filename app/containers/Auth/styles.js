import styled from 'styled-components';

// Antd
import Form from 'antd/lib/form';

// Semamtic
import { Image } from 'semantic-ui-react';

// Images
import background from 'images/login-background.jpg';

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
  align-items: stretch;
  background: #f2f2f2;
`;

export const WrapperLogin = styled.div`
  width: 100%;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  align-items: stretch;
  flex-direction: row;
`;

export const WrapperLoginForm = styled.div`
  width: 50%;
  display: block;
  background-color: #f7f7f7;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 992px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const LoginForm = styled(Form)`
  width: 100%;
  max-width: 400px;
  .ant-input-affix-wrapper {
    height: 60px;
    margin-bottom: 1em;
    input {
      font-weight: 700;
      font-size: 1.2em;
    }
  }
  .login-form-forgot {
    display: inline-block;
    width: 100%;
    text-align: right;
  }
  .login-form-button {
    margin: auto;
    margin-top: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    max-width: 150px;
    height: 60px;
    border-radius: 10px;
    background: $purple;
    font-size: 12px;
    color: white;
    line-height: 1.2;
    text-transform: uppercase;
    letter-spacing: 1px;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }
`;

export const Logo = styled(Image)`
  margin: 3em;
`;

export const LoginImage = styled.div`
  width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
  background-image: url(${background});
  @media (max-width: 992px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

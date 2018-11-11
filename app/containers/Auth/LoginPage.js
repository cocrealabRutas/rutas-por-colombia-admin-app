import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Images
import logo from 'images/logo.svg';

// Antd
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';

// Redux
import { loginUser } from './actions';

// Components
import AuthHOC from './Auth';

// Styles
import {
  MainContainer,
  WrapperLogin,
  WrapperLoginForm,
  LoginForm,
  Logo,
  LoginImage,
} from './styles';

const FormItem = Form.Item;

class LoginPage extends Component {
  static propTypes = {
    form: PropTypes.object,
    getFieldDecorator: PropTypes.func,
    isAuthenticated: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
  };

  state = { loading: false };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, { email, password }) => {
      if (!err) {
        this.loginUser(email, password);
      }
    });
  };

  loginUser = async (email, password) => {
    const loading = message.loading('Sign in...', 0);
    this.setState({ loading: true });
    try {
      await this.props.loginUser(email, password);
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
      message.error('Incorrect user or password. Please try again.', 4);
      this.setState({ loading: false });
    } finally {
      loading();
    }
  };

  render() {
    const { isAuthenticated } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <MainContainer>
        <WrapperLogin>
          <LoginImage />
          <WrapperLoginForm>
            <Logo src={logo} fluid className="logo" />
            <LoginForm onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: 'Please introduce your e-mail',
                    },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="E-mail"
                  />,
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please introduce your password',
                    },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="login-form-button"
                  block
                >
                  Log In
                </Button>
              </FormItem>
            </LoginForm>
          </WrapperLoginForm>
        </WrapperLogin>
      </MainContainer>
    );
  }
}

const mapDispatchToProps = {
  loginUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(AuthHOC(Form.create()(LoginPage)));

/*
 *
 * Auth actions
 *
 */

import Cache from '@aws-amplify/cache';
import api from 'config/axiosInstance';

import { SET_USER_DATA, LOADING_USER_DATA, USER_LOGOUT } from './constants';

export const loginUser = (email, password) => async dispatch => {
  dispatch(authStart());
  try {
    const { data } = api.post('/user/login/admin', {
      email,
      password,
    });
    dispatch(authSuccess(data));
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};

export const authStart = () => ({
  type: LOADING_USER_DATA,
});

export const authSuccess = session => {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 1);
  Cache.setItem('token', session.token, {
    expires: expiration.getTime(),
    priority: 1,
  });
  return {
    type: SET_USER_DATA,
    payload: {
      ...session,
    },
  };
};

export const authFail = () => ({
  type: USER_LOGOUT,
});

export const logout = () => async dispatch => {
  const token = Cache.getItem('token');
  try {
    await api.delete('/user/me/token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: USER_LOGOUT,
    });
  } catch (error) {
    console.log(error.response);
    throw new Error(
      'Access Token missing or Not authorized to perform this action',
    );
  }
};

export const checkSession = () => async dispatch => {
  dispatch(authStart());
  const token = Cache.getItem('token');
  if (token) {
    try {
      const { data } = await api.get('/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(authSuccess(data));
    } catch (error) {
      console.log(error.response);
      dispatch(authFail());
      throw new Error(
        'Access Token missing or Not authorized to perform this action',
      );
    }
  } else {
    dispatch(authFail());
    throw new Error('Access Token missing');
  }
};

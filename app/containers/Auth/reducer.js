/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_USER_DATA, LOADING_USER_DATA, USER_LOGOUT } from './constants';

export const initialUserDataState = fromJS({
  session: {},
  status: 'PENDING',
  isLoading: false,
});

export const userDataReducer = (state = initialUserDataState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return state.merge({
        session: action.payload,
        status: 'AUTHORIZED',
        isLoading: false,
      });
    case LOADING_USER_DATA:
      return state.set('isLoading', true);
    case USER_LOGOUT:
      return initialUserDataState.merge({
        status: 'UNAUTHORIZED',
        isLoading: false,
      });
    default:
      return state;
  }
};

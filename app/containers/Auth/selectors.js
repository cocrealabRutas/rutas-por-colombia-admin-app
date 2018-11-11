import { createSelector } from 'reselect';
import { initialUserDataState } from './reducer';

/**
 * Direct selector to the auth state domain
 */

const selectUserDataDomain = state =>
  state.get('userData', initialUserDataState);

const makeSelectUserData = () =>
  createSelector(selectUserDataDomain, substate => substate.toJS());

export { selectUserDataDomain, makeSelectUserData };

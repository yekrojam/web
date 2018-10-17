// @flow

import { combineReducers } from 'redux';

import org from './orgsReducer';
import session from './sessionReducer';
import users from './usersReducer';

import { reducer as pendingRequests } from '../../utils/actionTypes';
import ActionTypes from '../../constants/ActionTypes';

export default combineReducers({
  org,
  pendingRequests: pendingRequests(ActionTypes),
  session,
  users,
});

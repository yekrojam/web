// @flow

import { combineReducers } from 'redux';

import org from './orgsReducer';
import session from './sessionReducer';
import users from './usersReducer';

import { errorsReducer, requestsReducer } from '../../utils/actionTypes';
import ActionTypes from '../../constants/ActionTypes';

export default combineReducers({
  errors: errorsReducer(ActionTypes),
  org,
  requests: requestsReducer(ActionTypes),
  session,
  users,
});

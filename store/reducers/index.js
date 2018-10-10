import { combineReducers } from 'redux';

import orgs from './orgsReducer';
import pendingRequests from './pendingRequestsReducer';
import session from './sessionReducer';
import users from './usersReducer';

export default combineReducers({
  orgs,
  pendingRequests,
  session,
  users,
});

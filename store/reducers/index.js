import { combineReducers } from 'redux';

import pendingRequests from './pendingRequestsReducer';
import session from './sessionReducer';
import users from './usersReducer';

export default combineReducers({
  pendingRequests,
  session,
  users,
});

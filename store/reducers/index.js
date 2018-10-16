import { combineReducers } from 'redux';

import org from './orgsReducer';
import pendingRequests from './pendingRequestsReducer';
import session from './sessionReducer';
import users from './usersReducer';

export default combineReducers({
  org,
  pendingRequests,
  session,
  users,
});

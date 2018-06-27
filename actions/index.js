import { find } from 'lodash';
import fetch from 'isomorphic-fetch';

import { getErrorType, getSuccessType } from '../utils/actionTypes';
import ActionTypes from '../constants/ActionTypes';

export const fetchUsers = () => (dispatch, getState) => {
  // Check whether we already have users.
  const { users } = getState();
  if (users && users.length) {
    return;
  }

  const type = ActionTypes.USERS_FETCH;

  dispatch({ type });

  fetch('https://randomuser.me/api?format=pretty&seed=majorkey&results=50')
    .then(res => res.json())
    .then((data) => {
      dispatch({
        data,
        type: getSuccessType(type),
      });
    })
    .catch((error) => {
      dispatch({
        error,
        type: getErrorType(type),
      });
    });
};

export const fetchUser = userId => (dispatch, getState) => {
  // Check if we already have the user.
  const user = find(getState().users, u => u.id === userId);

  if (user) {
    dispatch({
      data: { user },
      type: getSuccessType(ActionTypes.USER_FETCH),
    });
    return;
  }

  // We need to fetch the users.
  dispatch(fetchUsers());
};

export const initializeSession = session => ({
  type: ActionTypes.SESSION_INITIALIZE_SUCCESS,
  session,
});

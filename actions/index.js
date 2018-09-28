import { find } from 'lodash';

import ActionTypes from '../constants/ActionTypes';
import { getSuccessType } from '../utils/actionTypes';
import request from '../utils/request';

export const createMembership = data => dispatch => (
  dispatch(request('/membership', ActionTypes.MEMBERSHIP_CREATE, {
    body: JSON.stringify(data),
    method: 'POST',
  }))
);

export const createOrg = data => dispatch => (
  dispatch(request('/org', ActionTypes.ORG_CREATE, {
    body: JSON.stringify(data),
    method: 'POST',
  }))
);

export const createUser = data => dispatch => (
  dispatch(request('/user', ActionTypes.USER_CREATE, {
    body: JSON.stringify(data),
    method: 'POST',
  }))
);

export const deleteUser = userId => dispatch => (
  dispatch(request(`/user/${userId}`, ActionTypes.USER_DELETE, {
    method: 'DELETE',
  }))
);

export const fetchUser = userId => (dispatch, getState) => {
  const type = ActionTypes.USER_FETCH;

  // Check if we already have the user.
  const user = find(getState().users, u => u.id === userId);

  if (user) {
    dispatch({
      data: user,
      type: getSuccessType(type),
    });
    return;
  }

  dispatch(request(`/user/${userId}`, type));
};

export const updateUser = data => dispatch => (
  dispatch(request(`/user/${data.id}`, ActionTypes.USER_UPDATE, {
    body: JSON.stringify(data),
    method: 'PATCH',
  }))
);

export const fetchUsers = () => dispatch => (
  dispatch(request('/user', ActionTypes.USERS_FETCH))
);

export const initializeSession = session => ({
  type: ActionTypes.SESSION_INITIALIZE_SUCCESS,
  session,
});

import { find } from 'lodash';
import fetch from 'isomorphic-fetch';

import { getErrorType, getSuccessType } from '../utils/actionTypes';
import ActionTypes from '../constants/ActionTypes';

const request = (url, type, options = {}) => (dispatch) => {
  dispatch({ type });

  // Normalize url string.
  const urlString = url.indexOf('/') === 0 ? url.replace('/', '') : url;

  fetch(`${process.env.API_URL}/${urlString}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
  })
    .then(res => res.json())
    .then((data) => {
      // TODO: Handle 400 errors.
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

export const createUser = data => dispatch => (
  dispatch(request('/user', ActionTypes.USER_CREATE, {
    body: JSON.stringify(data),
    method: 'POST',
  }))
);

export const deleteUser = userId => dispatch => (
  dispatch(request(`/user/${userId}`, ActionTypes.USER_DELETE, { method: 'DELETE' }))
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
    method: 'PUT',
  }))
);

export const fetchUsers = () => dispatch => (
  dispatch(request('/user', ActionTypes.USERS_FETCH))
);

export const initializeSession = session => ({
  type: ActionTypes.SESSION_INITIALIZE_SUCCESS,
  session,
});

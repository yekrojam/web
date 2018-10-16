import { find } from 'lodash';
import { stringify } from 'qs';

import ActionTypes from '../constants/ActionTypes';
import { getSuccessType } from '../utils/actionTypes';
import membershipToUser from '../utils/membershipToUser';
import request from '../utils/request';

function getUserQuery(orgId, userId = null) {
  const query = { org: orgId };

  if (userId) {
    query.user = userId;
  }

  return stringify({
    populate: 'user',
    query: JSON.stringify(query),
    select: ['user', 'roles'].join(','),
  });
}

export const createMembership = data => dispatch => (
  dispatch(request('/membership', ActionTypes.MEMBERSHIP_CREATE, {
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
  const { org, users } = getState();

  // Check if we already have the user.
  const user = find(users, u => u.id === userId);

  if (user) {
    dispatch({
      data: user,
      type: getSuccessType(type),
    });
    return;
  }

  dispatch(request(
    `/membership?${getUserQuery(org.id, userId)}`,
    type,
    {},
    data => membershipToUser(data.length ? data[0] : data),
  ));
};

export const updateUser = data => dispatch => (
  dispatch(request(`/user/${data.id}`, ActionTypes.USER_UPDATE, {
    body: JSON.stringify(data),
    method: 'PATCH',
  }))
);

export const fetchUsers = () => (dispatch, getState) => {
  const { org } = getState();

  dispatch(request(
    `/membership?${getUserQuery(org.id)}`,
    ActionTypes.USERS_FETCH,
    {},
    data => data.map(membershipToUser),
  ));
};

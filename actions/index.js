// @flow

import { find } from 'lodash';
import { stringify } from 'qs';

import ActionTypes from '../constants/ActionTypes';
import { getSuccessType } from '../utils/actionTypes';
import membershipToUser from '../utils/membershipToUser';
import request from '../utils/request';

function getUserQuery(orgId: string, userId: ?string = null): string {
  let query = { org: orgId };
  if (userId) {
    query = { ...query, user: userId };
  }

  return stringify({
    populate: 'user',
    query: JSON.stringify(query),
    select: ['user', 'roles'].join(','),
  });
}

export const createMembership =
  (data: Object) => (dispatch: Function): void => (
    dispatch(request('/membership', ActionTypes.MEMBERSHIP_CREATE, {
      body: JSON.stringify(data),
      method: 'POST',
    }))
  );

export const updateOrg = (data: Object) => (dispatch: Function): void => (
  dispatch(request(`/org/${data.id}`, ActionTypes.ORG_UPDATE, {
    body: JSON.stringify(data),
    method: 'PATCH',
  }))
);

export const createUser = (data: Object) => (dispatch: Function): void => (
  dispatch(request('/user', ActionTypes.USER_CREATE, {
    body: JSON.stringify(data),
    method: 'POST',
  }))
);

export const deleteUser = (userId: string) => (dispatch: Function): void => (
  dispatch(request(`/user/${userId}`, ActionTypes.USER_DELETE, {
    method: 'DELETE',
  }))
);

export const fetchUser =
  (userId: string) => (dispatch: Function, getState: Function): void => {
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

export const updateUser = (data: Object) => (dispatch: Function): void => (
  dispatch(request(`/user/${data.id}`, ActionTypes.USER_UPDATE, {
    body: JSON.stringify(data),
    method: 'PATCH',
  }))
);

export const fetchUsers =
  () => (dispatch: Function, getState: Function): void => {
    const { org } = getState();

    dispatch(request(
      `/membership?${getUserQuery(org.id)}`,
      ActionTypes.USERS_FETCH,
      {},
      data => data.map(membershipToUser),
    ));
  };

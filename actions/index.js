// @flow

import { find } from 'lodash';
import { stringify } from 'qs';

import ActionTypes from '../constants/ActionTypes';
import { getErrorType, getSuccessType } from '../utils/actionTypes';
import api from '../utils/api';
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

// TODO: Improve the `api` util so we're not replicating logic here.
export const createMember =
  (data: Object) => (dispatch: Function, getState: Function): void => {
    const type = ActionTypes.MEMBER_CREATE;

    dispatch({ type });

    const { org, session: { authToken } } = getState();
    const { roles, ...user } = data;

    // First create the user...
    api('/user', {
      authToken,
      body: JSON.stringify(user),
      method: 'POST',
    })
      .then((userData) => {
        const query = stringify({
          populate: 'user',
        });

        // We have the user, now create the membership.
        api(`/membership?${query}`, {
          authToken,
          body: JSON.stringify({
            org: org.id,
            roles,
            user: userData.id,
          }),
          method: 'POST',
        })
          .then((membershipData) => {
            // Success, the user is now a member.
            dispatch({
              data: membershipToUser(membershipData),
              type: getSuccessType(type),
            });
          });
      })
      .catch((error) => {
        dispatch({
          error,
          type: getErrorType(type),
        });
      });
  };

export const updateOrg = (data: Object) => (dispatch: Function): void => (
  dispatch(request(`/org/${data.id}`, ActionTypes.ORG_UPDATE, {
    body: JSON.stringify(data),
    method: 'PATCH',
  }))
);

export const deleteUser = (userId: string) => (dispatch: Function): void => (
  dispatch(request(`/user/${userId}`, ActionTypes.USER_DELETE, {
    method: 'DELETE',
  }))
);

export const fetchMember =
  (userId: string) => (dispatch: Function, getState: Function): void => {
    const type = ActionTypes.MEMBER_FETCH;
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

export const fetchMembers =
  () => (dispatch: Function, getState: Function): void => {
    const { org } = getState();

    dispatch(request(
      `/membership?${getUserQuery(org.id)}`,
      ActionTypes.MEMBERS_FETCH,
      {},
      data => data.map(membershipToUser),
    ));
  };

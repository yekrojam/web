// @flow

import { find } from 'lodash';

import { getSuccessType } from '../../utils/actionTypes';

import ActionTypes from '../../constants/ActionTypes';
import { Action, User } from '../../constants/types';

const userReducer = (state: User = {}, action: Action): User => {
  let user;

  switch (action.type) {
    case getSuccessType(ActionTypes.MEMBER_FETCH):
    case getSuccessType(ActionTypes.USER_UPDATE):
      // When fetching or updating a user that already exists in state,
      // merge the retrieved data.
      user = action.data;
      return state.id === user.id ? { ...state, ...user } : state;
    default:
      return state;
  }
};

export default (state: Array<User> = [], action: Action): Array<User> => {
  let user;

  switch (action.type) {
    case getSuccessType(ActionTypes.MEMBERS_FETCH):
      return action.data;
    case getSuccessType(ActionTypes.MEMBER_CREATE):
      return [...state, action.data];
    case getSuccessType(ActionTypes.USER_DELETE):
      return state.filter(u => u.id !== action.data);
    case getSuccessType(ActionTypes.MEMBER_FETCH):
      user = action.data;
      if (find(state, { id: user.id })) {
        return state.map(u => userReducer(u, action));
      }
      return [...state, user];
    case getSuccessType(ActionTypes.USER_UPDATE):
      return state.map(u => userReducer(u, action));
    default:
      return state;
  }
};

import { find } from 'lodash';

import ActionTypes from '../../constants/ActionTypes';
import { getSuccessType } from '../../utils/actionTypes';

const userReducer = (state = {}, action) => {
  let user;

  switch (action.type) {
    case getSuccessType(ActionTypes.USER_FETCH):
    case getSuccessType(ActionTypes.USER_UPDATE):
      // When fetching or updating a user that already exists in state,
      // merge the retrieved data.
      user = action.data;
      return state.id === user.id ? { ...state, ...user } : state;
    default:
      return state;
  }
};

export default (state = [], action) => {
  let user;

  switch (action.type) {
    case getSuccessType(ActionTypes.USERS_FETCH):
      return action.data;
    case getSuccessType(ActionTypes.USER_CREATE):
      return [...state, action.data];
    case getSuccessType(ActionTypes.USER_DELETE):
      return state.filter(u => u.id !== action.data);
    case getSuccessType(ActionTypes.USER_FETCH):
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

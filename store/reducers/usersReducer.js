import { find } from 'lodash';

import ActionTypes from '../../constants/ActionTypes';
import { getSuccessType } from '../../utils/actionTypes';

const userReducer = (state = {}, action) => {
  let user;

  switch (action.type) {
    case getSuccessType(ActionTypes.USER_DELETE):
      return state.id !== action.data;
    case getSuccessType(ActionTypes.USER_FETCH):
    case getSuccessType(ActionTypes.USER_UPDATE):
      user = action.data;
      return state.id === user.id ? user : state;
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
      return state.filter(u => userReducer(u, action));
    case getSuccessType(ActionTypes.USER_FETCH):
    case getSuccessType(ActionTypes.USER_UPDATE):
      user = action.data;
      if (find(state, { id: user.id })) {
        return state.map(u => userReducer(u, action));
      }
      return [...state, user];
    default:
      return state;
  }
};

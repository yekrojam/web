import ActionTypes from '../../constants/ActionTypes';
import { getSuccessType } from '../../utils/actionTypes';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    /* eslint-disable-next-line no-case-declarations */
    case getSuccessType(ActionTypes.USER_FETCH):
      const { user } = action.data;
      return state.id === user.id ? user : state;
    default:
      return state;
  }
};

export default (state = [], action) => {
  switch (action.type) {
    case getSuccessType(ActionTypes.USERS_FETCH):
      return action.data;
    case getSuccessType(ActionTypes.USER_FETCH):
      return state.map(user => userReducer(user, action));
    default:
      return state;
  }
};

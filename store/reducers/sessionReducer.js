import ActionTypes from '../../constants/ActionTypes';
import { getSuccessType } from '../../utils/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case getSuccessType(ActionTypes.SESSION_INITIALIZE):
      return action.session;
    default:
      return state;
  }
};

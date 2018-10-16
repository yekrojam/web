import ActionTypes from '../../constants/ActionTypes';
import { getSuccessType } from '../../utils/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case getSuccessType(ActionTypes.ORG_UPDATE):
      return action.data;
    default:
      return state;
  }
};

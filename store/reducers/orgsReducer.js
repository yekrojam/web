import ActionTypes from '../../constants/ActionTypes';
import { getSuccessType } from '../../utils/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case getSuccessType(ActionTypes.ORGS_FETCH):
      return action.data;
    default:
      return state;
  }
};

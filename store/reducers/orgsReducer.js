// @flow

import ActionTypes from '../../constants/ActionTypes';
import { Action } from '../../constants/types';
import { getSuccessType } from '../../utils/actionTypes';

export default (state: Object = {}, action: Action): Object => {
  switch (action.type) {
    case getSuccessType(ActionTypes.ORG_UPDATE):
      return action.data;
    default:
      return state;
  }
};

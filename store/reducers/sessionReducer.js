// @flow

import { Action } from '../../constants/types';

/**
 * Basic session reducer.
 * Not used on client since data always comes from the server.
 */
export default (state: Object = {}, action: Action): Object => {
  switch (action.type) {
    default:
      return state;
  }
};

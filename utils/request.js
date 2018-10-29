// @flow

import { getErrorType, getSuccessType } from './actionTypes';
import api from './api';

export default function request(
  url: string,
  type: string,
  options: ?Object = {},
  beforeSuccess: ?Function = null,
): Function {
  return (dispatch: Function, getState: Function): void => {
    dispatch({ type });

    const { authToken } = getState().session;

    api(url, { ...options, authToken })
      /* eslint-disable-next-line no-confusing-arrow */
      .then(data => beforeSuccess ? beforeSuccess(data) : data)
      .then((data) => {
        dispatch({
          data,
          type: getSuccessType(type),
        });
      })
      .catch((error) => {
        dispatch({
          error,
          type: getErrorType(type),
        });
      });
  };
}

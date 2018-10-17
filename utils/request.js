// @flow

import { getErrorType, getSuccessType } from './actionTypes';
import api from './api';

export default function request(
  url: string,
  type: string,
  options: ?Object = {},
  transformData: ?Function = null,
): Function {
  return (dispatch: Function, getState: Function): void => {
    dispatch({ type });

    const { authToken } = getState().session;

    api(url, { ...options, authToken })
      .then((data) => {
        // TODO: Handle 400 errors.
        dispatch({
          data: transformData ? transformData(data) : data,
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

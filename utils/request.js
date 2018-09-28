import { getErrorType, getSuccessType } from './actionTypes';
import api from './api';

export default (url, type, options = {}) => (dispatch, getState) => {
  dispatch({ type });

  const { authToken } = getState().session;

  api(url, { ...options, authToken })
    .then((data) => {
      // TODO: Handle 400 errors.
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

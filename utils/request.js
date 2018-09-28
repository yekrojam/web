import fetch from 'isomorphic-fetch';

import { getErrorType, getSuccessType } from './actionTypes';

export default (url, type, options = {}) => (dispatch) => {
  dispatch({ type });

  // Normalize url string.
  const urlString = url.indexOf('/') === 0 ? url.replace('/', '') : url;

  fetch(`${process.env.API_URL}/${urlString}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
  })
    .then(res => res.json())
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

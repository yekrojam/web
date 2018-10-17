// @flow

import fetch from 'isomorphic-fetch';

const API_URL = process.env.API_URL || '';

type Options = {
  authToken: string,
};

export default function api(url: string, opts: Options): Promise<Object> {
  const { authToken, ...options } = opts;

  // Normalize url string.
  const urlString = url.indexOf('/') === 0 ? url.replace('/', '') : url;

  return fetch(`${API_URL}/${urlString}`, {
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip',
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...options,
  })
    .then(res => res.json());
}

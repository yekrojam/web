// @flow

import fetch from 'isomorphic-fetch';

const API_URL = process.env.API_URL || '';

type Options = {
  authToken: string,
};

/**
 * Normalize responses to include status, since 200 and 400 errors are both
 * valid but handled differently.
 */
function normalizeResponse(res) {
  return new Promise(resolve => res.json()
    .then(json => resolve({
      status: res.status,
      ok: res.ok,
      json,
    })));
}

export default function api(url: string, opts: Options): Promise<Object> {
  const { authToken, ...options } = opts;

  // Normalize url string by removing leading slash.
  const urlString = url.indexOf('/') === 0 ? url.replace('/', '') : url;

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/${urlString}`, {
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip',
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      ...options,
    })
      .then(normalizeResponse)
      .then(({ json, ok, status }) => {
        if (ok) {
          return resolve(json);
        }
        /* eslint-disable-next-line prefer-promise-reject-errors */
        return reject({ ...json, status });
      })
      .catch(error => reject(error));
  });
}

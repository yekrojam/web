import fetch from 'isomorphic-fetch';

export default (url, { authToken, ...options }) => {
  // Normalize url string.
  const urlString = url.indexOf('/') === 0 ? url.replace('/', '') : url;

  return fetch(`${process.env.API_URL}/${urlString}`, {
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip',
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...options,
  })
    .then(res => res.json());
};

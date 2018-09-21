/**
 * Serializes an object into a URI-encoded query string.
 */
export default o => Object
  .keys(o)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(o[k])}`)
  .join('&');

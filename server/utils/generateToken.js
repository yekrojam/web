import jwt from 'jsonwebtoken';

const { JWT_SECRET, ORG_ID } = process.env;

/**
 * Create a json web token to be passed in all API requests.
 */
export default (payload = {}, options = {}) => (
  jwt.sign({ ...payload, org: ORG_ID }, JWT_SECRET, {
    expiresIn: '1h',
    ...options,
  })
);

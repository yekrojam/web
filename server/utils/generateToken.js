import jwt from 'jsonwebtoken';

/**
 * Create a json web token to be passed in all API requests.
 */
export default (payload = {}, options = {}) => (
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
    ...options,
  })
);

import { getErrorType, getSuccessType } from '../utils/actionTypes';

// Add base types here.
const TYPES = [
  'SESSION_INITIALIZE',
  'USER_FETCH',
  'USERS_FETCH',
];

// TODO: Generate once on app initialization.
export default TYPES.reduce((obj, type) => ({
  ...obj,
  [type]: type,
  [getErrorType(type)]: getErrorType(type),
  [getSuccessType(type)]: getSuccessType(type),
}), {});

import { getErrorType, getSuccessType } from '../utils/actionTypes';

// Add base types here.
const TYPES = [
  'MEMBERSHIP_CREATE',

  'ORG_UPDATE',

  'USER_CREATE',
  'USER_DELETE',
  'USER_FETCH',
  'USER_UPDATE',

  'USERS_FETCH',
];

// TODO: Generate once on app initialization.
export default TYPES.reduce((obj, type) => ({
  ...obj,
  [type]: type,
  [getErrorType(type)]: getErrorType(type),
  [getSuccessType(type)]: getSuccessType(type),
}), {});

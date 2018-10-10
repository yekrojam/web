import { getErrorType, getSuccessType } from '../utils/actionTypes';

// Add base types here.
const TYPES = [
  'SESSION_INITIALIZE',

  'MEMBERSHIP_CREATE',

  'ORG_CREATE',

  'USER_CREATE',
  'USER_DELETE',
  'USER_FETCH',
  'USER_UPDATE',

  'ORGS_FETCH',
  'USERS_FETCH',
];

// TODO: Generate once on app initialization.
export default TYPES.reduce((obj, type) => ({
  ...obj,
  [type]: type,
  [getErrorType(type)]: getErrorType(type),
  [getSuccessType(type)]: getSuccessType(type),
}), {});

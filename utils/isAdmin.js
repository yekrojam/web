// @flow

import { User } from '../constants/types';

/**
 * Checks a user object to see if that user has admin privileges.
 */
export default function isAdmin(user: ?User) {
  return user && user.roles && user.roles.indexOf('ADMIN') > -1;
}

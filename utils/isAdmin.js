// @flow

import { Member } from '../constants/types';

/**
 * Checks a user object to see if that user has admin privileges.
 */
export default function isAdmin(member: ?Member) {
  return member && member.roles && member.roles.indexOf('ADMIN') > -1;
}

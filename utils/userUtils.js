// @flow

import { Member } from '../constants/types';

export function getUserImage(user: ?Member): string {
  if (!user) {
    return '';
  }

  return user.imageURL || user.defaultedImageURL || '';
}

export function getUserName(user: ?Member): string {
  return (user && user.name) || '';
}

/**
 * Checks a user object to see if that user has admin privileges.
 */
export function isAdmin(member: ?Member) {
  return member && member.roles && member.roles.indexOf('ADMIN') > -1;
}

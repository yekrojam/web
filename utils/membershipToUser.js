// @flow

import { Member, Membership } from '../constants/types';

/**
 * Convert a populated membership object to a user object with roles.
 */
export default (membership: Membership): Member => {
  const { roles, user } = membership;
  if (typeof user === 'string') {
    // The user object wasn't correctly populated.
    throw Error('Expected `user` to be an object, but got an id.');
  }
  return { ...user, roles };
};

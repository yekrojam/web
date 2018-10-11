/**
 * Convert a populated membership object to a user object with roles.
 */
export default ({ roles, user }) => {
  if (typeof user === 'string') {
    // The user object wasn't correctly populated.
    throw Error('Expected `user` to be an object, but got an id.');
  }
  return { ...user, roles };
};

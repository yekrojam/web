import { expect } from 'chai';

import isAdmin from '../isAdmin';

const ADMIN = {
  roles: ['ADMIN'],
};

const NON_ADMIN = {
  roles: ['MEMBER'],
};

describe('isAdmin', () => {
  it('checks whether a user is an admin or not', () => {
    expect(isAdmin(ADMIN)).to.equal(true);
    expect(isAdmin(NON_ADMIN)).to.equal(false);
  });
});

import { expect } from 'chai';

import membershipToUser from '../membershipToUser';

const USER = {
  id: '123-abc',
  email: 'testy@tester.com',
  name: 'Testy Tester',
};

const ROLES = ['ADMIN', 'MEMBER'];

const MEMBERSHIP = {
  roles: ROLES,
  user: USER,
};

describe('membershipToUser', () => {
  it('converts a membership object to a user object with roles', () => {
    expect(membershipToUser(MEMBERSHIP)).to.deep.equal({
      ...USER,
      roles: ROLES,
    });
  });

  it('throws when the user object is not populated', () => {
    const membership = {
      user: USER.id,
    };
    const willThrow = () => membershipToUser(membership);
    expect(willThrow).to.throw();
  });
});

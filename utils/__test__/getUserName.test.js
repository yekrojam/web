import { expect } from 'chai';

import getUserName from '../getUserName';

describe('getUserName', () => {
  it('returns a name from the `user` object', () => {
    const name = 'Roger Federer';
    expect(getUserName({ name })).to.equal(name);
  });

  it('returns an empty string when the user has no name', () => {
    expect(getUserName({})).to.equal('');
  });

  it('returns an empty string when there is no user object', () => {
    expect(getUserName(null)).to.equal('');
  });
});

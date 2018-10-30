import { expect } from 'chai';

import { getUserImage, getUserName, isAdmin } from '../userUtils';

const imageURL = 'http://www.example.com/user.jpg';
const defaultedImageURL = 'https://s.gravatar.com/avatar/0db53901eca1472a8997a38a24b38d06?d=identicon&s=480';

const ADMIN = {
  roles: ['ADMIN'],
};

const NON_ADMIN = {
  roles: ['MEMBER'],
};

describe('getUserImage', () => {
  it('returns the url string from the `user` object', () => {
    expect(getUserImage({ defaultedImageURL, imageURL })).to.equal(imageURL);
  });

  it('returns the default url string from the `user` object', () => {
    expect(getUserImage({ defaultedImageURL })).to.equal(defaultedImageURL);
  });

  it('returns an empty string from an empty user object', () => {
    expect(getUserImage({})).to.equal('');
  });

  it('returns an empty string when there is no user object', () => {
    expect(getUserImage(null)).to.equal('');
  });
});


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

describe('isAdmin', () => {
  it('checks whether a user is an admin or not', () => {
    expect(isAdmin(ADMIN)).to.equal(true);
    expect(isAdmin(NON_ADMIN)).to.equal(false);
  });
});

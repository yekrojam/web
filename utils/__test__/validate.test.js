import { expect } from 'chai';
import { isEmpty } from 'lodash';

import validate from '../validate';

const notBlank = str => !!(str && str.trim());

const FIELDS = {
  name: {
    error: 'Please enter a name.',
    isValid: notBlank,
  },
  email: {
    error: 'Please enter a valid email address.',
    isValid: value => notBlank(value) && value.indexOf('@') > -1,
  },
};

describe('validate', () => {
  let obj;

  beforeEach(() => {
    obj = {
      name: 'Eric',
      email: 'test@test.com',
    };
  });

  it('does not return any errors', () => {
    expect(isEmpty(validate(obj, FIELDS))).to.equal(true);
  });

  it('returns errors', () => {
    obj.email = 'test.com';
    expect(isEmpty(validate(obj, FIELDS))).to.equal(false);
  });
});

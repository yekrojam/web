import { expect } from 'chai';
import { isEmpty } from 'lodash';

import { notBlank, validate } from '../forms';

const FIELDS = [
  {
    error: 'Please enter a name.',
    isValid: notBlank,
    name: 'name',
  },
  {
    error: 'Please enter a valid email address.',
    isValid: value => notBlank(value) && value.indexOf('@') > -1,
    name: 'email',
  },
];

describe('notBlank', () => {
  it('tests whether a string is blank or not', () => {
    expect(notBlank('foo')).to.equal(true);
    expect(notBlank('')).to.equal(false);
    expect(notBlank('      ')).to.equal(false);
  });
});

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

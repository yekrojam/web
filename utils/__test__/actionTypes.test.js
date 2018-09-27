import { expect } from 'chai';

import { getBaseType, getErrorType, getSuccessType, isBaseType } from '../actionTypes';

const BASE_TYPE = 'BASE_TYPE';
const ERROR_TYPE = 'BASE_TYPE_ERROR';
const SUCCESS_TYPE = 'BASE_TYPE_SUCCESS';

describe('actionTypes', () => {
  it('returns the base action type', () => {
    expect(getBaseType(ERROR_TYPE)).to.equal(BASE_TYPE);
    expect(getBaseType(SUCCESS_TYPE)).to.equal(BASE_TYPE);
    expect(getBaseType(BASE_TYPE)).to.equal(BASE_TYPE);
  });

  it('returns the error type', () => {
    expect(getErrorType(BASE_TYPE)).to.equal(ERROR_TYPE);
  });

  it('returns the success type', () => {
    expect(getSuccessType(BASE_TYPE)).to.equal(SUCCESS_TYPE);
  });

  it('determines whether a type is a base type', () => {
    expect(isBaseType(BASE_TYPE)).to.equal(true);
    expect(isBaseType(ERROR_TYPE)).to.equal(false);
    expect(isBaseType(SUCCESS_TYPE)).to.equal(false);
  });
});

import { expect } from 'chai';

import { createActionTypes, getBaseType, getErrorType, getSuccessType, isBaseType, isComplete, isPending } from '../actionTypes';

const BASE_TYPE = 'BASE_TYPE';
const ERROR_TYPE = 'BASE_TYPE_ERROR';
const SUCCESS_TYPE = 'BASE_TYPE_SUCCESS';

const pending = { [BASE_TYPE]: true };
const completed = { [BASE_TYPE]: false };

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

  it('determines whether a request is complete', () => {
    expect(isComplete(completed, BASE_TYPE)).to.equal(true);
    expect(isComplete(pending, BASE_TYPE)).to.equal(false);
  });

  it('determines whether a request is pending', () => {
    expect(isPending(pending, BASE_TYPE)).to.equal(true);
    expect(isPending(completed, BASE_TYPE)).to.equal(false);
  });

  it('generates success and error types for an array of base types', () => {
    expect(createActionTypes([BASE_TYPE])).to.deep.equal({
      [BASE_TYPE]: BASE_TYPE,
      [ERROR_TYPE]: ERROR_TYPE,
      [SUCCESS_TYPE]: SUCCESS_TYPE,
    });
  });
});

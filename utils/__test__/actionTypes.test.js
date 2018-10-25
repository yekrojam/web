import { expect } from 'chai';

import {
  createActionTypes,
  getBaseType,
  getErrorType,
  getSuccessType,
  isBaseType,
  isComplete,
  isErrorType,
  isPending,
  errorsReducer,
  requestsReducer,
} from '../actionTypes';

const BASE_TYPE = 'BASE_TYPE';
const ERROR_TYPE = 'BASE_TYPE_ERROR';
const SUCCESS_TYPE = 'BASE_TYPE_SUCCESS';

const TYPES = createActionTypes([BASE_TYPE]);

const pending = { [BASE_TYPE]: true };
const completed = { [BASE_TYPE]: false };

describe('actionTypes utils', () => {
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

  it('determines whether a type is an error type', () => {
    expect(isErrorType(BASE_TYPE)).to.equal(false);
    expect(isErrorType(ERROR_TYPE)).to.equal(true);
    expect(isErrorType(SUCCESS_TYPE)).to.equal(false);
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
    expect(TYPES).to.deep.equal({
      [BASE_TYPE]: BASE_TYPE,
      [ERROR_TYPE]: ERROR_TYPE,
      [SUCCESS_TYPE]: SUCCESS_TYPE,
    });
  });
});

describe('errorsReducer', () => {
  let reducer;
  let state;

  beforeEach(() => {
    reducer = errorsReducer(TYPES);
    state = {
      [BASE_TYPE]: { message: 'This is an error.' },
    };
  });

  it('clears all errors', () => {
    const action = { type: 'CLEAR_ERRORS' };
    expect(reducer(state, action)).to.deep.equal({});
  });

  it('returns the existing state', () => {
    expect(reducer(state, { type: 'FOO' })).to.deep.equal(state);
    expect(reducer(state, { type: BASE_TYPE })).to.deep.equal(state);
  });

  it('updates the state with a new error', () => {
    const action = {
      error: { message: 'This is an error.' },
      type: ERROR_TYPE,
    };

    expect(reducer({}, action)).to.deep.equal({
      [BASE_TYPE]: action.error,
    });
  });
});

describe('requestsReducer', () => {
  let reducer;

  beforeEach(() => {
    reducer = requestsReducer(TYPES);
  });

  it('returns the existing state', () => {
    expect(reducer(pending, { type: 'FOO' })).to.deep.equal(pending);
  });

  it('updates the request state', () => {
    expect(reducer({}, { type: BASE_TYPE })).to.deep.equal(pending);
    expect(reducer({}, { type: ERROR_TYPE })).to.deep.equal(completed);
  });
});

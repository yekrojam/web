// @flow

import { Action } from '../constants/types';

type Types = string | Array<string>;

const CLEAR_ERRORS = 'CLEAR_ERRORS';

// Util Functions
export function getBaseType(type: string): string {
  return type.replace('_ERROR', '').replace('_SUCCESS', '');
}

export function getErrorType(type: string): string {
  return `${type}_ERROR`;
}

export function getSuccessType(type: string): string {
  return `${type}_SUCCESS`;
}

export function isBaseType(type: string): bool {
  return type.indexOf('ERROR') === -1 && type.indexOf('SUCCESS') === -1;
}

export function isErrorType(type: string): bool {
  return type.indexOf('ERROR') > -1;
}

export function isComplete(requests: Object, types: Types): bool {
  const requestTypes = typeof types === 'string' ? [types] : types;
  return requestTypes.every(type => !requests[type]);
}

export function isPending(requests: Object, types: Types): bool {
  return !isComplete(requests, types);
}

export function createActionTypes(types: Array<string>): Object {
  if (!Array.isArray(types)) {
    throw Error('The argument for `createActionTypes` must be an array.');
  }

  return types.reduce((obj: Object, type: string): Object => ({
    ...obj,
    [type]: type,
    [getErrorType(type)]: getErrorType(type),
    [getSuccessType(type)]: getSuccessType(type),
  }), {});
}

// Actions
export const clearErrors = () => (dispatch: Function): void => dispatch({
  type: CLEAR_ERRORS,
});

// Reducers
export function errorsReducer(types: Object = {}): Function {
  return (state: Object = {}, action: Action): Object => {
    const { error, type } = action;

    // Reset state.
    if (type === CLEAR_ERRORS) {
      return {};
    }

    // Ignore any actions that are not whitelisted or are not errors.
    if (!(types[type] && isErrorType(type))) {
      return state;
    }

    return {
      ...state,
      [getBaseType(type)]: error,
    };
  };
}

export function requestsReducer(types: Object = {}): Function {
  return (state: Object = {}, action: Action): Object => {
    const { type } = action;

    // Filter out any actions that are not whitelisted.
    if (!types[type]) {
      return state;
    }

    if (isBaseType(type)) {
      return {
        ...state,
        [type]: true,
      };
    }

    return {
      ...state,
      [getBaseType(type)]: false,
    };
  };
}

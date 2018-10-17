export const getBaseType = type => (
  type.replace('_ERROR', '').replace('_SUCCESS', '')
);

export const getErrorType = type => `${type}_ERROR`;

export const getSuccessType = type => `${type}_SUCCESS`;

export const isBaseType = type => (
  type.indexOf('ERROR') === -1 && type.indexOf('SUCCESS') === -1
);

export const isComplete = (requests, types) => {
  const requestTypes = typeof types === 'string' ? [types] : types;
  return requestTypes.every(type => !requests[type]);
};

export const isPending = (requests, types) => !isComplete(requests, types);

export const createActionTypes = (types) => {
  if (!Array.isArray(types)) {
    throw Error('The argument for `createActionTypes` must be an array.');
  }

  return types.reduce((obj, type) => ({
    ...obj,
    [type]: type,
    [getErrorType(type)]: getErrorType(type),
    [getSuccessType(type)]: getSuccessType(type),
  }), {});
};

export const reducer = (types = {}) => (state = {}, { type }) => {
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

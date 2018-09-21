import { some } from 'lodash';

function requestCompleted({ pendingRequests }, nextProps, types) {
  const requestTypes = typeof types === 'string' ? [types] : types;

  return some(requestTypes, type => (
    pendingRequests[type] && !nextProps.pendingRequests[type]
  ));
}

export default requestCompleted;

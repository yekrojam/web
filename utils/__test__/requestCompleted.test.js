import { expect } from 'chai';

import requestCompleted from '../requestCompleted';

const TYPES = ['FOO', 'BAR'];

describe('requestCompleted', () => {
  let props;
  let nextProps;

  beforeEach(() => {
    const pendingRequests = {
      FOO: false,
      BAR: false,
    };

    props = { pendingRequests: { ...pendingRequests } };
    nextProps = { pendingRequests: { ...pendingRequests } };
  });

  it('indicates whether or not requests have been completed', () => {
    expect(requestCompleted(props, nextProps, TYPES)).to.equal(false);

    props.pendingRequests.FOO = true;

    expect(requestCompleted(props, nextProps, TYPES)).to.equal(true);
  });

  it('accepts a string value as the type', () => {
    props.pendingRequests.FOO = true;

    expect(requestCompleted(props, nextProps, 'FOO')).to.equal(true);
  });
});

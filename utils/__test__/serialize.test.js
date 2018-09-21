import { expect } from 'chai';

import serialize from '../serialize';

describe('serialize', () => {
  it('serializes an object into a uri-encoded string', () => {
    const params = {
      foo: 'bar',
      baz: 1,
      email: 'me@example.com',
      sentence: 'This is a sentence',
      url: 'https://www.google.com',
    };
    // eslint-disable-next-line max-len
    expect(serialize(params)).to.equal('foo=bar&baz=1&email=me%40example.com&sentence=This%20is%20a%20sentence&url=https%3A%2F%2Fwww.google.com');
  });
});

import { expect } from 'chai';

import usersReducer from '../reducers/usersReducer';
import { getSuccessType } from '../../utils/actionTypes';

import ActionTypes from '../../constants/ActionTypes';

const TEST_ACTION = 'TEST_ACTION';
const USER = {
  id: '123-abc',
  email: 'testy@tester.com',
  name: 'Testy Tester',
};
const USER2 = {
  id: '456-efg',
  email: 'testy2@tester.com',
  name: 'Testy2 Tester',
};

describe('usersReducer', () => {
  it('returns the default state', () => {
    expect(usersReducer([], TEST_ACTION)).to.deep.equal([]);
  });

  it('adds a newly created member to the state', () => {
    const action = {
      data: USER,
      type: getSuccessType(ActionTypes.MEMBER_CREATE),
    };

    expect(usersReducer([], action)).to.deep.equal([USER]);
  });

  it('returns all the members for an org', () => {
    const action = {
      data: [USER, USER2],
      type: getSuccessType(ActionTypes.MEMBERS_FETCH),
    };

    expect(usersReducer([], action)).to.deep.equal([USER, USER2]);
  });

  it('adds a fetched user to the state', () => {
    const action = {
      data: USER,
      type: getSuccessType(ActionTypes.MEMBER_FETCH),
    };

    expect(usersReducer([], action)).to.deep.equal([USER]);
  });

  it('returns an updated user object', () => {
    const updatedUser = {
      ...USER,
      name: 'Jimmy Tester',
    };

    const action = {
      data: updatedUser,
      type: getSuccessType(ActionTypes.USER_UPDATE),
    };

    expect(usersReducer([USER], action)).to.deep.equal([updatedUser]);
  });

  it('removes a deleted user from state', () => {
    const action = {
      data: USER.id,
      type: getSuccessType(ActionTypes.USER_DELETE),
    };

    expect(usersReducer([USER], action)).to.deep.equal([]);
  });
});

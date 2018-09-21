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

describe('usersReducer', () => {
  it('returns the default state', () => {
    expect(usersReducer([], TEST_ACTION)).to.deep.equal([]);
  });

  it('adds a newly created user to the state', () => {
    const action = {
      data: USER,
      type: getSuccessType(ActionTypes.USER_CREATE),
    };

    expect(usersReducer([], action)).to.deep.equal([USER]);
  });

  it('returns the user object', () => {
    const action = {
      data: USER,
      type: getSuccessType(ActionTypes.USER_FETCH),
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

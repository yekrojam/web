/* eslint-disable import/prefer-default-export */

import PropTypes from 'prop-types';

export const UserType = PropTypes.shape({
  email: PropTypes.string,
  id: PropTypes.string,
  imageURL: PropTypes.string,
  name: PropTypes.string,
});

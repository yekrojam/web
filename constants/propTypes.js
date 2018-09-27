/* eslint-disable import/prefer-default-export */

import PropTypes from 'prop-types';

export const UserType = PropTypes.shape({
  email: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

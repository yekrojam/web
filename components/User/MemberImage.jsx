// @flow

import cx from 'classnames';
import React from 'react';

import { getUserImage, getUserName } from '../../utils/userUtils';
import { User } from '../../constants/types';

type Size = 'small' | 'medium' | 'large';

type Props = {
  className?: string,
  size?: Size,
  user: User,
};

function getDimension(size?: Size) {
  switch (size) {
    case 'small':
      return 48;
    case 'large':
      return 144;
    case 'medium':
    default:
      return 96;
  }
}

const MemberImage = (props: Props) => {
  const { className, size, user } = props;
  const dimension = getDimension(size);

  return (
    <img
      alt={getUserName(user)}
      className={cx('member-image', className)}
      height={dimension}
      src={getUserImage(user)}
      width={dimension}
    />
  );
};

MemberImage.defaultProps = {
  size: 'medium',
};

export default MemberImage;

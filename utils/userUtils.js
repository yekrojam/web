// @flow

import { User } from '../constants/types';

export function getUserImage(user: User): string {
  if (!user) {
    return '';
  }

  return user.imageURL || user.defaultedImageURL || '';
}

export function getUserName(user: User): string {
  return (user && user.name) || '';
}

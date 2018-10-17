// @flow

export default function getUserName(user: Object): string {
  return (user && user.name) || '';
}

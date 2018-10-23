export type Action = {
  data: ?any,
  type: string,
};

export type Role = 'ADMIN' | 'MEMBER';

export type User = {
  id: string,
  roles: Array<Role>,
};

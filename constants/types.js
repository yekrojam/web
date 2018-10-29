export type Action = {
  data: ?any,
  type: string,
};

export type Field = {
  error?: string,
  isValid?: Function,
  name: string,
};

export type Role = 'ADMIN' | 'MEMBER';

export type User = {
  defaultedImageURL: string,
  id: string,
  imageURL?: string,
  name: string,
  roles: Array<Role>,
};

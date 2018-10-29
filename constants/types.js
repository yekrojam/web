/* Redux */
export type Action = {
  data: ?any,
  type: string,
};

export type ActionType = string;


export type Field = {
  error?: string,
  isValid?: Function,
  name: string,
};

export type Id = string;


/* Schema */
export type Org = {
  id: Id,
  name: string,
};

export type Role = 'ADMIN' | 'MEMBER';

export type Roles = Array<Role>;

/**
 * Flow type representation of the User schema.
 */
export type User = {
  defaultedImageURL: string,
  id: Id,
  imageURL?: string,
  name: string,
};

/**
 * Flow type representation of the Membership schema.
 */
export type Membership = {
  org: string,
  roles: Roles,
  user: User,
};

/**
 * Flattened representation of User and Membership schema.
 */
export type Member = {
  ...User,
  roles: Roles,
};

export type Session = {
  authToken: string,
  user: User | {},
};

/* Server */
export type Request = {

};

export type Response = {

};

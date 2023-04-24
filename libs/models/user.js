/**
 * Author : Ryan
 * Date : 2023-04-25
 * Desc : user
 */

import Adapters from 'next-auth/adapters';

export default class User extends Adapters.TypeORM.Models.User.model {
  constructor(name, email, image, emailVerified) {
    super(name, email, image, emailVerified);
  }
}

export const UserSchema = {
  name: 'User',
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
  },
};

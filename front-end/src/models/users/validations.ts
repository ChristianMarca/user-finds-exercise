import type { User } from '../../api/users/types';
import { isEmail } from '../shared/email-validation';
import { isString } from '../shared/string-validation';

export function isUser(object: unknown): object is User {
  if (typeof object !== 'object' || object === null) {
    return false;
  }

  const value = object as User;
  const requiredKeys = ['email', 'name'];
  const objectKeys = Object.keys(value);

  if (!requiredKeys.every((key) => objectKeys.includes(key))) {
    return false;
  }

  return isString(value['name']) && isEmail(value['email']);
}

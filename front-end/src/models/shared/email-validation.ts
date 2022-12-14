import { isString } from "./string-validation";
import type { Email } from "./util-types";

const MAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export function isEmail(object: unknown): object is Email {
  if (!isString(object)) {
    return false;
  }
  return MAIL_REGEX.test(object);
}

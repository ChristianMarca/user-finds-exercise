import { User } from "../../components/api.types";
import { isEmail } from "../shared/email-validation";
import { isString } from "../shared/string-validation";

export function isUser(object: any): object is User {
  if (!(object instanceof Object)) {
    return false;
  }
  const requiredKeys = ["email", "name"];
  const objectKeys = Object.keys(object);

  if (!requiredKeys.every((key) => objectKeys.includes(key))) {
    return false;
  }

  return isString(object["name"]) && isEmail(object["email"]);
}

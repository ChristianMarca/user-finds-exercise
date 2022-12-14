import type { User } from "../api.types";

export interface AddUserFormProps {
  onSubmit: (ev: User) => void;
}

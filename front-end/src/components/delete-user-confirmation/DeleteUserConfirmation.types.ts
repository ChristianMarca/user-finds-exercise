import { User } from "../../api/users/types";

export interface DeleteUserConfirmationProps {
  user: User;
  onConfirm: (u: User) => void;
  onCancel: () => void;
}

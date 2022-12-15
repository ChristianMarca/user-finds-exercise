import { User } from '../../api/users/types';

export interface AddUserFormProps {
  onSubmit: (ev: User) => void;
}

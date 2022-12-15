import { DeleteButton, DeleteUserConfirmationMessage } from './DeleteUserConfimration.styles';
import { Button } from '../button/Button.component';
import type { DeleteUserConfirmationProps } from './DeleteUserConfirmation.types';

export const DeleteUserConfirmation = (props: DeleteUserConfirmationProps) => {
  function handleDelete() {
    props.onConfirm(props.user);
  }
  function handleCancel() {
    props.onCancel();
  }
  return (
    <div>
      <DeleteUserConfirmationMessage>
        Are you sure you want to delete user <b>{props.user.name}</b> with email&nbsp;
        <b>{props.user.email}</b>
      </DeleteUserConfirmationMessage>
      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  );
};

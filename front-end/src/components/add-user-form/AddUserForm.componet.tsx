import { formToJSON } from 'axios';
import { FormEvent } from 'react';
import { isUser } from '../../models/users/validations';
import { Button } from '../button/Button.component';
import { FormInput } from '../form-input/FormInput.component';
import type { AddUserFormProps } from './AddUserForm.types';

export const AddUserForm = (props: AddUserFormProps) => {
  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = formToJSON(ev.target as HTMLFormElement);
    if (isUser(formData)) {
      props.onSubmit(formData);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormInput placeholder="name" type="text" name="name" id="name" />
      <FormInput placeholder="email" type="email" name="email" id="email" />
      <Button type="submit">Save User</Button>
    </form>
  );
};

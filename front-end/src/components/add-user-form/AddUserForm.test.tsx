import { cleanup, fireEvent, render } from '@testing-library/react';
import { AddUserForm } from './AddUserForm.component';
import type { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('AddUserForm', () => {
  let tree: RenderResult;
  let nameInput: HTMLElement;
  let emailInput: HTMLElement;
  let mockedOnSubmit: jest.Mock;
  beforeEach(async () => {
    cleanup();
    mockedOnSubmit = jest.fn();
    tree = render(<AddUserForm onSubmit={mockedOnSubmit} />);
    nameInput = await tree.findByPlaceholderText('name');
    emailInput = await tree.findByPlaceholderText('email');
  });
  it('should render name text input', async () => {
    expect(nameInput).toBeVisible();
  });
  it('should render email text input', async () => {
    expect(emailInput).toBeVisible();
  });
  it('should not call prop `onSubmit` function on clicking `Save User` without a filled form', async () => {
    const submitButton = await tree.findByText('Save User');
    await fireEvent.change(nameInput, { target: { value: 'test name' } });
    await userEvent.click(submitButton);
    expect(mockedOnSubmit).not.toBeCalled();
  });
  it('should not call prop `onSubmit` function on clicking `Save User` with an incorrect email format', async () => {
    const submitButton = await tree.findByText('Save User');
    await fireEvent.change(nameInput, { target: { value: 'test name' } });
    await fireEvent.change(emailInput, { target: { value: 'test.com' } });
    await userEvent.click(submitButton);
    expect(mockedOnSubmit).not.toBeCalled();
  });
  it('should call prop `onSubmit` function on clicking `Save User` while data is filled', async () => {
    const submitButton = await tree.findByText('Save User');
    await fireEvent.change(nameInput, { target: { value: 'test name' } });
    await fireEvent.change(emailInput, { target: { value: 'email@test.test' } });
    await userEvent.click(submitButton);
    expect(mockedOnSubmit).toBeCalled();
  });
});

import styled from 'styled-components';
import { Button } from '../button/Button.component';

export const DeleteUserConfirmationMessage = styled.p`
  font-size: 1.25rem;
  color: rgb(55 65 81);
  line-height: 1.5rem;
  margin-bottom: 4rem;
`;

export const DeleteButton = styled(Button)`
  color: #f3f4f6;
  margin-right: 1rem;
  background-color: #ef4444;
  &:hover {
    background-color: #f87171;
  }
`;

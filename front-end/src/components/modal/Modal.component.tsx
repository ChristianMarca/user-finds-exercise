import { useState } from 'react';
import styled from 'styled-components';
import { ModalProps } from './Modal.types';

interface WrapperProps {
  open: boolean;
}

interface ButtonProps {
  color: string;
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.85);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: ${(props) => (props.open ? 'block' : 'none')};
`;

const Content = styled.div`
  width: 400px;
  height: 400px;
  margin: 30px auto;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

const Header = styled.div`
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

const Body = styled.div`
  padding: 20px;
  box-sizing: border-box;
`;

const FormControl = styled.div`
  display: block;
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button<ButtonProps>`
  background: ${(props) => props.color || 'blue'};
  color: #fff;
  padding: 8px 20px;
  border-radius: 6px;
  margin-bottom: 20px;
  margin-right: 20px;
  box-shadow: none;
  border: none;
`;

const Modal = ({ open, onClose, onSave }: ModalProps) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    role: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(values);
  };

  return (
    <Wrapper open={open}>
      <Content>
        <Header>Add User</Header>
        <Body>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Label>Name</Label>
              <Input type="text" name="name" value={values.name} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <Label>Email</Label>
              <Input type="email" name="email" value={values.email} onChange={handleChange} />
            </FormControl>

            <Button color="#ccc" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button color="blue" type="submit">
              Submit
            </Button>
          </form>
        </Body>
      </Content>
    </Wrapper>
  );
};

export default Modal;

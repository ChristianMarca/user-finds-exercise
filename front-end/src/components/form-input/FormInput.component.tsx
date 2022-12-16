import type { ForwardRefRenderFunction, HTMLProps } from 'react';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Arial';
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid;
  border-radius: 5px;
  margin-bottom: 20px;
  &:hover {
    box-shadow: 1px 1px 1px thistle;
  }
  > input {
    flex: 1 0;
    min-width: 50px;
    min-height: 25px;
    font-size: inherit;
    background-color: transparent;
    padding-left: 8px;
    border: 0;
    &:focus {
      outline: none;
    }
  }
`;

const _FormInput: ForwardRefRenderFunction<HTMLInputElement, HTMLProps<HTMLInputElement>> = (
  props,
  ref
) => {
  return (
    <Container>
      <input ref={ref} {...props}></input>
    </Container>
  );
};
export const FormInput = React.forwardRef(_FormInput);

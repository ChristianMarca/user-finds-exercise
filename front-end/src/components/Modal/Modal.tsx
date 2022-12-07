import React, { useState } from 'react'
import { IFormUser } from '../../context';
import { StyledBodyModal, StyledButtonClose, StyledClose, StyledContainerModal, StyledContentModal, StyledFooterModal, StyledFormModal, StyledHeaderModal, StyledInputForm, StyledLabelForm, StyledModal, StyledSendButton, StyledTextButtonClose, StyledTitle } from './component';

interface IModal {
  open: boolean
  setClose: () => void
  onSubmit: (body: IFormUser) => void
}

const Modal: React.FC<IModal> = ({ open, setClose, onSubmit }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }


  return (
    <>
      <StyledContainerModal>
        <StyledContentModal>
          <StyledModal>
            <StyledHeaderModal>
              <StyledTitle>Add user</StyledTitle>
              <StyledClose onClick={setClose}>
                <StyledTextButtonClose >
                  x
                </StyledTextButtonClose>
              </StyledClose>
            </StyledHeaderModal>
            <StyledBodyModal>
              <StyledFormModal>
                <StyledLabelForm>
                  Name
                </StyledLabelForm>
                <StyledInputForm name='name' onChange={handleChangeName} />
                <StyledLabelForm>
                  Email
                </StyledLabelForm>
                <StyledInputForm name='email' onChange={handleChangeEmail} />
              </StyledFormModal>
            </StyledBodyModal>
            <StyledFooterModal>
              <StyledButtonClose
                type="button"
                onClick={setClose}
              >
                Close
              </StyledButtonClose>
              <StyledSendButton
                type="button"
                onClick={() => {
                  const body = {
                    name,
                    email
                  }
                  onSubmit(body)
                }}
              >
                Send
              </StyledSendButton>
            </StyledFooterModal>
          </StyledModal>
        </StyledContentModal>
      </StyledContainerModal>
    </>
  );
};

export { Modal }
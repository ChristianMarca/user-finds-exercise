import { ModalBox, ModalCLoseButton, ModalHeader, ModalOverlay, ModalTitle } from './Modal.styles';
import { CloseIcon } from '../close-icon/CloseIcon.component';
import type { ModalProps } from './Modal.types';
import { ReactPortal } from '../portal/portal.component';

export const Modal = (props: ModalProps) => {
  function closeModal(ev: React.MouseEvent) {
    props.onClose(ev);
  }

  /**
   * Prevents click events from closing the modal as normally
   * the mouse event would bubble up to the overlay and would
   * activate closeModal function.
   *
   */
  function handleContentClick(ev: React.MouseEvent) {
    ev.stopPropagation();
  }

  return (
    <ReactPortal id="modal-portal">
      <ModalOverlay open={props.open} onClick={closeModal}>
        <ModalBox onClick={handleContentClick}>
          <ModalHeader>
            {props.title && <ModalTitle>{props.title}</ModalTitle>}
            <ModalCLoseButton onClick={closeModal}>
              <CloseIcon />
            </ModalCLoseButton>
          </ModalHeader>
          {props.children}
        </ModalBox>
      </ModalOverlay>
    </ReactPortal>
  );
};

import { useState } from 'react';

export function useModal(defaultIsOpenValue = false) {
  const [isOpen, setIsOpen] = useState(defaultIsOpenValue);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return { isOpen, openModal, closeModal };
}

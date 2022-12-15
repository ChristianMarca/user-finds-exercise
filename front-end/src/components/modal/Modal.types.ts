import { ReactNode } from 'react';

export interface ModalProps {
  title?: string;
  onClose: (ev: React.MouseEvent) => void;
  children: ReactNode;
  open: boolean;
}

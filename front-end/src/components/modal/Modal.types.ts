export type ModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (values: object) => void;
};

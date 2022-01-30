import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import VisuallyHidden from "@reach/visually-hidden";
import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | ReactNode[];
}

function Modal({ onClose, isOpen, children }: ModalProps) {
  return (
    <Dialog isOpen={isOpen} onDismiss={onClose}>
      <button className="close-button" onClick={onClose}>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </button>
      {children}
    </Dialog>
  );
}

export default Modal;

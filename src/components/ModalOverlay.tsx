import { ReactNode } from "react";

interface ModalOverlayProps {
  onClose: () => void;
  children: ReactNode;
}

export const ModalOverlay = ({ onClose, children }: ModalOverlayProps) => {
  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-w-[90vw] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

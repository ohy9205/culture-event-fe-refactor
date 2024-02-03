import { useEffect } from "react";
import ReactDOM from "react-dom";

type Props = {
  onClick: () => void;
  modalContent: React.ReactNode;
  onClose?: () => void;
};

const ModalBack = ({ onClick }: Pick<Props, "onClick">) => {
  return (
    <div
      className="w-full h-[100vh] bg-black opacity-50 z-[999] fixed top-0 left-0"
      onClick={onClick}
    ></div>
  );
};

const ModalOverlay = ({ modalContent }: Pick<Props, "modalContent">) => {
  return (
    <div className="w-4/5 max-w-[1100px] h-[80vh] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] overflow-scroll">
      {modalContent}
    </div>
  );
};

const Modal = ({ onClick, modalContent, onClose }: Props) => {
  useEffect(() => {
    return () => {
      if (onClose) {
        onClose();
      }
    };
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay modalContent={modalContent} />,
        document.getElementById("modal")!
      )}
      {ReactDOM.createPortal(
        <ModalBack onClick={onClick} />,
        document.getElementById("modal")!
      )}
    </>
  );
};

export default Modal;

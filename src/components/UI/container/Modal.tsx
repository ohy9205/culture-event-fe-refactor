"use client";

import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
  return ReactDOM.createPortal(children, document.getElementById("modal")!);
};

const ModalBackground = ({ onEvent }: { onEvent: () => void }) => {
  return (
    <div
      className="w-full h-[100vh] bg-black opacity-70 z-[999] fixed top-0 left-0"
      onClick={() => {
        onEvent();
      }}></div>
  );
};

const ModalTrigger = ({ children, onEvent }: Props & { onEvent: any }) => {
  return (
    <div onClick={onEvent} className="cursor-pointer">
      {children}
    </div>
  );
};

const ModalContent = ({ children }: Props) => {
  return (
    <div className="w-4/5 max-w-[1100px] h-[80vh] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] overflow-scroll">
      {children}
    </div>
  );
};

export default Modal;
Modal.Trigger = ModalTrigger;
Modal.Background = ModalBackground;
Modal.Content = ModalContent;

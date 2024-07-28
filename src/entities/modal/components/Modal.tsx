"use client";

import useModal from "../hook/useModal";

const Modal = () => {
  const {
    data: { isOpen, content },
    close,
  } = useModal();

  return (
    isOpen && (
      <>
        <div
          className="w-full h-[100vh] bg-black opacity-70 z-[999] fixed top-0 left-0"
          onClick={close}
          data-testid="modal-background"></div>
        <div className="w-4/5 max-w-[1100px] h-[80vh] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] overflow-scroll">
          {content}
        </div>
      </>
    )
  );
};

export default Modal;

"use client";

import { useState } from "react";
import Modal from "./Modal";

type Props = {
  children: React.ReactNode | ((isShowModal: boolean) => React.ReactNode);
  modalContent: React.ReactNode;
};

const ModalToggleCard = ({ children, modalContent }: Props) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const onToggleShowModal = () => {
    setIsShowModal((prev) => !prev);
  };

  const toRender =
    typeof children === "function" ? children(isShowModal) : children;

  return (
    <>
      <div onClick={onToggleShowModal}>{toRender}</div>
      {isShowModal && (
        <Modal onClick={onToggleShowModal} modalContent={modalContent} />
      )}
    </>
  );
};

export default ModalToggleCard;

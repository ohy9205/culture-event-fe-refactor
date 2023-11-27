"use client";

import { useState } from "react";
import Modal from "./Modal";

type Props = {
  children: React.ReactNode;
  modalContent: React.ReactNode;
};

const ModalToggleCard = ({ children, modalContent }: Props) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const onToggleShowModal = () => {
    setIsShowModal((prev) => !prev);
  };

  return (
    <>
      <div onClick={onToggleShowModal}>{children}</div>
      {isShowModal && (
        <Modal onClick={onToggleShowModal} modalContent={modalContent} />
      )}
    </>
  );
};

export default ModalToggleCard;

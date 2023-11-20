"use client";

import { useState } from "react";
import EventDetail from "./EventDetail";
import Modal from "./Modal";

type Props = {
  children: React.ReactNode;
  id: number;
};

const ModalToggleCard = ({ children, id }: Props) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const onToggleShowModal = () => {
    setIsShowModal((prev) => !prev);
  };

  return (
    <>
      <div onClick={onToggleShowModal}>{children}</div>
      {isShowModal && (
        <Modal
          onClick={onToggleShowModal}
          modalContent={<EventDetail id={id} />}
        />
      )}
    </>
  );
};

export default ModalToggleCard;

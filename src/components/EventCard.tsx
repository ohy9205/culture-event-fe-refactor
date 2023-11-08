"use client";

import { useState } from "react";
import DetailModal from "./DetailModal";

type Props = {
  children: React.ReactNode;
  id: number;
};

const EventCard = ({ children, id }: Props) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const onToggleShowModal = () => {
    setIsShowModal((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col" onClick={onToggleShowModal}>
        {children}
      </div>

      {isShowModal && <DetailModal id={id} onClick={onToggleShowModal} />}
    </>
  );
};

export default EventCard;

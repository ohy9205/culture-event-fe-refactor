"use client";

import { useState } from "react";
import Image from "next/image";
import DetailModal from "./DetailModal";
import { Event } from "../types/events";

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
      <div onClick={onToggleShowModal}>{children}</div>
      {isShowModal && <DetailModal id={id} onClick={onToggleShowModal} />}
    </>
  );
};

export default EventCard;

"use client";

import { useState, useEffect } from "react";
import DetailModal from "./DetailModal";
import { Event } from "../types/events";

type Props = {
  children: React.ReactNode;
  event: Event;
  className?: string;
};

const ToggleModalCard = ({ children, event, className }: Props) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const onToggleShowModal = () => {
    setIsShowModal((prev) => !prev);
  };

  useEffect(() => {
    console.log(isShowModal);
  }, [isShowModal]);

  return (
    <div onClick={onToggleShowModal} className={className}>
      {children}
      {isShowModal && <DetailModal event={event} onClick={onToggleShowModal} />}
    </div>
  );
};

export default ToggleModalCard;

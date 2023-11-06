"use client";

import { useState, useEffect } from "react";
import DetailModal from "./DetailModal";

type Props = {
  children: React.ReactNode;
  id: string;
  className?: string;
};

const ToggleModalCard = ({ children, id, className }: Props) => {
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
      {isShowModal && <DetailModal id={id} onClick={onToggleShowModal} />}
    </div>
  );
};

export default ToggleModalCard;

import React from "react";
import ReactDOM from "react-dom";
import EventDetail from "./EventDetail";

type Props = {
  onClick: () => void;
  id: string;
};

const DetailModalBack = ({ onClick }: Pick<Props, "onClick">) => {
  return (
    <div
      className="w-full h-[100vh] bg-black opacity-50 z-[999] fixed top-0 left-0"
      onClick={onClick}
    />
  );
};

const DetailModalOverlay = ({ id }: Pick<Props, "id">) => {
  return (
    <div className="w-4/5 max-w-[1100px] h-[80vh] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] overflow-scroll">
      <EventDetail id={id} />
    </div>
  );
};

const DetailModal = ({ onClick, id }: Props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <DetailModalBack onClick={onClick} />,
        document.getElementById("modal")!
      )}
      {ReactDOM.createPortal(
        <DetailModalOverlay id={id} />,
        // document.getElementById("modal-overlay")!
        document.getElementById("modal")!
      )}
    </>
  );
};

export default DetailModal;

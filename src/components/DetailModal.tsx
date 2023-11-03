import React from "react";
import ReactDOM from "react-dom";
import { Event } from "../types/events";
import EventDetail from "./EventDetail";

type Props = {
  onClick: () => void;
  event: Event;
};

const DetailModalBack = ({ onClick }: Pick<Props, "onClick">) => {
  return (
    <div
      className="w-full h-[100vh] bg-black opacity-50 z-[999] fixed top-0 left-0"
      onClick={onClick}
    />
  );
};

const DetailModalOverlay = ({ event }: Pick<Props, "event">) => {
  return (
    <div className="w-4/5 max-w-[1100px] h-[80vh] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] overflow-scroll">
      <EventDetail event={event} />
    </div>
  );
};

const DetailModal = ({ onClick, event }: Props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <DetailModalBack onClick={onClick} />,
        document.getElementById("modal")!
      )}
      {ReactDOM.createPortal(
        <DetailModalOverlay event={event} />,
        // document.getElementById("modal-overlay")!
        document.getElementById("modal")!
      )}
    </>
  );
};

export default DetailModal;

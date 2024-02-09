"use client";

import { ModalContextProvider } from "@/src/context/ModalContext";
import { ReactNode } from "react";
import Modal from "../UI/container/Modal";
import EventDetail from "./EventDetail";

type Props = {
  trigger: ReactNode;
  eventId: number;
};

const EventDetailModal = ({ trigger, eventId }: Props) => {
  return (
    <ModalContextProvider>
      <Modal.Trigger>{trigger}</Modal.Trigger>
      <Modal>
        <Modal.Background />
        <Modal.Content>
          <EventDetail id={eventId} />
        </Modal.Content>
      </Modal>
    </ModalContextProvider>
  );
};

export default EventDetailModal;

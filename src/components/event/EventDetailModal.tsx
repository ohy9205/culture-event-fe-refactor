"use client";

import { ReactNode } from "react";
import Modal from "../UI/container/Modal";
import EventDetail from "./EventDetail";

type Props = {
  trigger: ReactNode;
  eventId: number;
};

const EventDetailModal = ({ trigger, eventId }: Props) => {
  return (
    <Modal.Provider>
      <Modal.Trigger>{trigger}</Modal.Trigger>
      <Modal>
        <Modal.Background />
        <Modal.Content>
          <EventDetail id={eventId} />
        </Modal.Content>
      </Modal>
    </Modal.Provider>
  );
};

export default EventDetailModal;

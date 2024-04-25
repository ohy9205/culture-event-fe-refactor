"use client";

import { useModal } from "@/src/hooks/useModal";
import ModalProvider from "@/src/provider/ModalProvider";
import { ReactNode } from "react";
import Modal from "../UI/container/Modal";
import EventDetail from "./EventDetail";

type Props = {
  trigger: ReactNode;
  eventId: number;
};

const EventDetailModal = ({ trigger, eventId }: Props) => {
  return (
    <ModalProvider>
      <ModalInner eventId={eventId} trigger={trigger} />
    </ModalProvider>
  );
};

const ModalInner = ({
  eventId,
  trigger,
}: {
  eventId: number;
  trigger: React.ReactNode;
}) => {
  const {
    open,
    close,
    data: { isOpen, id },
  } = useModal();

  return (
    <>
      <Modal.Trigger onEvent={() => open(eventId)}>{trigger}</Modal.Trigger>
      {isOpen && id === eventId && (
        <Modal>
          <Modal.Background onEvent={() => close()} />
          <Modal.Content>
            <EventDetail id={eventId} />
          </Modal.Content>
        </Modal>
      )}
    </>
  );
};

export default EventDetailModal;

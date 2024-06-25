"use client";

import { ModalProvider } from "@/src/app/provider";
import { Modal } from "@/src/shared/components";
import { useModal } from "@/src/shared/hooks";
import { ReactNode } from "react";
import EventDetail from "./EventDetail";

type Props = {
  trigger: ReactNode;
  eventId: number;
};

type InnerProps = {
  eventId: number;
  trigger: React.ReactNode;
};

type EventDetailProps = {
  id: number;
};

const EventDetailModal = ({ trigger, eventId }: Props) => {
  return (
    <ModalProvider>
      <ModalInner eventId={eventId} trigger={trigger} />
    </ModalProvider>
  );
};

const ModalInner = ({ eventId, trigger }: InnerProps) => {
  const {
    open,
    close,
    data: { isOpen, modalId, activeModalId },
  } = useModal();

  return (
    <>
      <Modal.Trigger onEvent={() => open(modalId)}>{trigger}</Modal.Trigger>
      {isOpen && activeModalId === modalId && (
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

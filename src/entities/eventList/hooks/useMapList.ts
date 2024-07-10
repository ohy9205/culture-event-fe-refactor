"use client";

import { useState } from "react";
import { useModal } from "../../modal";
import { SimpleEvent } from "../types";

const useMapList = (initCurEvent: SimpleEvent) => {
  const [curEvent, setCurEvent] = useState<SimpleEvent>(initCurEvent);
  const { open } = useModal();

  return {
    data: {
      curEvent,
    },
    changeCurrentEvent: (event: SimpleEvent) => setCurEvent(event),
    openEventDetail: open,
  };
};

export default useMapList;
